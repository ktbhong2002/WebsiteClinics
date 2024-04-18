import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SvgColor from 'src/components/svg-color';
import { alpha } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { fShortenNumber } from 'src/utils/format-number';
import Iconify from 'src/components/iconify';
import { Link as LinkUrl } from 'react-router-dom';
import { deleteHandbookService } from 'src/Services/userService';
import { Box, MenuItem } from '@mui/material';

export default function PostCard({ post, index, handbookId }) {
  const { title, category, image, author, link, createdAt, id } = post;

  const view = 0; // You can set your actual view number here
  const comment = 0; // You can set your actual comment number here
  const share = 0; // You can set your actual share number here
  const favorite = 0; // You can set your actual favorite number here

  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const [openDialog, setOpenDialog] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteHandbook = async () => {
    try {
      const res = await deleteHandbookService(id);
      if (res && res.errCode === 0) {
        toast.info('Xóa bài viết thành công');
        setDeleted(true); // Đánh dấu bài viết đã bị xóa
        handleCloseDialog();
      }
    } catch (e) {
      toast.error('Xóa bài viết thất bại');
      console.log(e);
    }
  };

  if (deleted) {
    return null; // Ẩn bài viết nếu đã bị xóa
  }

  return (
    <>
      <Grid xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
        <Card>
          <Box
            sx={{
              position: 'relative',
              pt: 'calc(100% * 3 / 4)',
              ...((latestPostLarge || latestPost) && {
                pt: 'calc(100% * 4 / 3)',
                '&:after': {
                  top: 0,
                  content: "''",
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                },
              }),
              ...(latestPostLarge && {
                pt: {
                  xs: 'calc(100% * 4 / 3)',
                  sm: 'calc(100% * 3 / 4.66)',
                },
              }),
            }}
          >
            <SvgColor
              color="paper"
              src="/assets/icons/shape-avatar.svg"
              sx={{
                width: 80,
                height: 36,
                zIndex: 9,
                bottom: -15,
                position: 'absolute',
                color: 'background.paper',
                ...((latestPostLarge || latestPost) && { display: 'none' }),
              }}
            />

            <Avatar
              alt={title}
              src={`/assets/images/covers/cover_${index + 1}.jpg`}
              sx={{
                zIndex: 9,
                width: 32,
                height: 32,
                position: 'absolute',
                left: (theme) => theme.spacing(3),
                bottom: (theme) => theme.spacing(-2),
                ...((latestPostLarge || latestPost) && {
                  zIndex: 9,
                  top: 24,
                  left: 24,
                  width: 40,
                  height: 40,
                }),
              }}
            />

            <Box
              component="img"
              alt={title}
              src={image}
              sx={{
                top: 0,
                width: 1,
                height: 1,
                objectFit: 'cover',
                position: 'absolute',
              }}
            />
          </Box>

          <Box
            sx={{
              p: (theme) => theme.spacing(4, 3, 3, 3),
              ...((latestPostLarge || latestPost) && {
                width: 1,
                bottom: 0,
                position: 'absolute',
              }),
            }}
          >
            <Typography
              variant="caption"
              component="div"
              sx={{
                mb: 2,
                color: 'text.disabled',
                ...((latestPostLarge || latestPost) && {
                  opacity: 0.48,
                  color: 'common.white',
                }),
              }}
            >
              {createdAt}
            </Typography>

            <LinkUrl to={link} target="_blank" rel="noopener noreferrer">
              <Link
                color="inherit"
                variant="subtitle2"
                underline="hover"
                sx={{
                  height: 44,
                  overflow: 'hidden',
                  WebkitLineClamp: 2,
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  ...(latestPostLarge && { typography: 'h5', height: 60 }),
                  ...((latestPostLarge || latestPost) && {
                    color: 'common.white',
                  }),
                }}
              >
                {title}
              </Link>
            </LinkUrl>

            <MenuItem onClick={handleOpenDialog} sx={{ color: 'error.main' }}>
              <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
              Xóa
            </MenuItem>

            <Stack
              direction="row"
              flexWrap="wrap"
              spacing={1.5}
              justifyContent="flex-end"
              sx={{
                mt: 3,
                color: 'text.disabled',
              }}
            >
              {[
                { number: comment, icon: 'eva:message-circle-fill' },
                { number: view, icon: 'eva:eye-fill' },
                { number: share, icon: 'eva:share-fill' },
              ].map((info, _index) => (
                <Stack
                  key={_index}
                  direction="row"
                  sx={{
                    ...((latestPostLarge || latestPost) && {
                      opacity: 0.48,
                      color: 'common.white',
                    }),
                  }}
                >
                  <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
                  <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Card>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa bài viết này không? Thao tác này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy bỏ
          </Button>
          <Button onClick={handleDeleteHandbook} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

PostCard.propTypes = {
  handbookId: PropTypes.string,
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};
