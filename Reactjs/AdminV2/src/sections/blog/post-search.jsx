import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import { MenuItem } from '@mui/material';
import Iconify from 'src/components/iconify';

import { deleteHandbookService } from 'src/Services/userService';

// ----------------------------------------------------------------------

handbookSearch.propTypes = {
  handbooks: PropTypes.array.isRequired,
};

export default function handbookSearch({ handbooks }) {
  const handleDeleteHandbook = async () => {
    try {
      // Hiển thị hộp thoại xác nhận trước khi xóa người dùng
      const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?');
      if (confirmDelete) {
        const res = await deleteHandbookService(handbooks.id);
        if (res && res.errCode === 0) {
          toast.info('Xóa bài viết thành công');
          setTimeout(() => {
            window.location.href = '/manage-handbook';
          }, 300);
        }
      }
    } catch (e) {
      toast.info('Xóa bài viết thất bại');
      console.log(e);
    }
  };

  const renderDeleteButton = (
    <MenuItem
      onClick={() => {
        handleDeleteHandbook(handbooks.id);
      }}
      sx={{ color: 'error.main' }}
    >
      <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
      Xóa
    </MenuItem>
  );

  return (
    <Autocomplete
      sx={{ width: 280 }}
      autoHighlight
      popupIcon={null}
      slotProps={{
        paper: {
          sx: {
            width: 320,
            [`& .${autocompleteClasses.option}`]: {
              typography: 'body2',
            },
          },
        },
      }}
      options={handbooks}
      getOptionLabel={(post) => post.title}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Tìm kiếm bài viết..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
