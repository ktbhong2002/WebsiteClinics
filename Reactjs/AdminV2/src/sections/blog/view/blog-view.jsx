import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { getAllHandbooks, crawlNewHandbook } from 'src/Services/userService';

import Iconify from 'src/components/iconify';

import PostCard from '../post-card';
import PostSort from '../post-sort';
import PostSearch from '../post-search';

import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

// ----------------------------------------------------------------------

export default function BlogView() {
  const [handbooks, setHandbooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const crawlHandbook = async () => {
    // set Loading(true);
    const res = await crawlNewHandbook();
    // if (res) {
    toast.success('Thu thập thành công bài viết'); // Hiển thị thông báo toast khi dữ liệu đã được cập nhật thành công
    fetchHandbooks(); // Gọi fetchHandbooks() sau khi dữ liệu đã được cập nhật để đảm bảo hiển thị thông báo chính xác
  };

  const fetchHandbooks = async () => {
    const res = await getAllHandbooks();
    if (res && res.errCode === 0) {
      const arrHandbooks = res.data;
      setHandbooks(arrHandbooks);
    }
  };

  useEffect(() => {
    fetchHandbooks();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredHandbooks = handbooks.filter((handbook) =>
    handbook.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce
      />{' '}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Quản lý cẩm nang</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={crawlHandbook}
        >
          Thu thập bài viết
        </Button>
        {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
      </Stack>
      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch handbooks={handbooks} onSearch={handleSearch} />
        <PostSort
          options={[
            { value: 'latest', label: 'Mới nhất' },
            { value: 'popular', label: 'Phổ biến' },
            { value: 'oldest', label: 'Cũ nhất' },
          ]}
        />
      </Stack>
      <Grid container spacing={3}>
        {filteredHandbooks.map((handbook, index) => (
          <PostCard key={handbook.id} post={handbook} index={index} />
        ))}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
          Dữ liệu đã được thu thập thành công!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}
