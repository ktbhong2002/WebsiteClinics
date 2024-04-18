import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { deleteClinicService } from 'src/Services/userService';

import Iconify from 'src/components/iconify';

import EditClinic from './view/EditClinic';

export default function ClinicTableRow({
  clinicId,
  selected,
  name,
  address,
  avatarUrl,
  handleClick,
}) {
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [isHidden, setIsHidden] = useState(false); // State để kiểm soát việc ẩn dòng
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // State để kiểm soát việc hiển thị dialog xác nhận

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDeleteClinic = async () => {
    try {
      const res = await deleteClinicService(clinicId);
      if (res && res.errCode === 0) {
        // setIsHidden(true); // Ẩn dòng sau khi xóa thành công
        toast.success('Xóa cơ sở y tế thành công');
      }
    } catch (e) {
      toast.error('Xóa tài khoản thất bại');
      console.log(e);
    }
  };

  const handleEditButtonClick = () => {
    setOpenEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  // Kiểm tra nếu dòng đã được ẩn thì không render
  if (isHidden) {
    return null;
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <img alt={name} src={avatarUrl} style={{ maxHeight: '100px' }} />
        </TableCell>

        <TableCell>{address}</TableCell>

        <TableCell>
          <MenuItem onClick={handleEditButtonClick}>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Sửa
          </MenuItem>
          <EditClinic open={openEditPopup} handleClose={handleCloseEditPopup} clinicId={clinicId} />
          <MenuItem onClick={handleConfirmDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Xóa
          </MenuItem>
        </TableCell>
      </TableRow>

      {/* Dialog xác nhận xóa */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xác nhận xóa {name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa cơ sở y tế này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Hủy</Button>
          <Button
            onClick={() => {
              handleDeleteClinic();
              setOpenConfirmDialog(false);
            }}
            sx={{ color: 'error.main' }}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
ClinicTableRow.propTypes = {
  clinicId: PropTypes.string,
  avatarUrl: PropTypes.any,
  handleClick: PropTypes.func,
  name: PropTypes.any,
  selected: PropTypes.any,
  address: PropTypes.any,
};
