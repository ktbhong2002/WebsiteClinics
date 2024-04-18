import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import { deleteUserService } from 'src/Services/userService';

import { toast } from 'react-toastify';
import EditUser from './view/EditUser';

export default function UserTableRow({
  userId,
  selected,
  lastName,
  firstName,
  avatarUrl,
  phoneNumber,
  email,
  address,
  gender,
  roleId,
  handleClick,
  onDeleteUser,
}) {
  const [open, setOpen] = useState(null);
  const [openEditPopup, setOpenEditPopup] = useState(false);

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const mapRoleIdToRole = (roleIdValue) => {
    switch (roleId) {
      case 'R1':
        return 'Quản trị viên';
      case 'R2':
        return 'Bác sĩ';
      case 'R3':
        return 'Bệnh nhân';
      default:
        return roleId; // Trả về roleId gốc nếu không có ánh xạ
    }
  };

  const mapGenderIdToGender = (genderId) => {
    switch (gender) {
      case 'F':
        return 'Nữ';
      case 'M':
        return 'Nam';
      default:
        return 'Bí mật'; // Trả về roleId gốc nếu không có ánh xạ
    }
  };

  const handleDeleteUser = async () => {
    try {
      // Gọi API hoặc hàm xóa người dùng ở đây
      const res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.info('Xóa tài khoản thành công');
        // Ẩn dòng người dùng sau khi xóa thành công
        handleCloseDeleteConfirmation();
        onDeleteUser(userId);
      }
    } catch (error) {
      toast.error('Xóa tài khoản thất bại');
      console.error('Lỗi khi xóa người dùng:', error);
    }
  };

  const handleEditButtonClick = () => {
    setOpenEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
  };

  const handleCloseDeleteConfirmation = () => {
    setConfirmDialogOpen(false);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={firstName} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {lastName} {firstName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{phoneNumber}</TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{mapGenderIdToGender(gender)}</TableCell>

        <TableCell>{address}</TableCell>

        <TableCell>
          <Label
            color={(roleId === 'R1' && 'error') || (roleId === 'R2' && 'warning') || 'success'}
          >
            {mapRoleIdToRole(roleId)}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>

        {/* Confirmation Dialog */}
        <Dialog open={confirmDialogOpen} onClose={handleCloseDeleteConfirmation}>
          <DialogTitle>Xác nhận xóa tài khoản {email}</DialogTitle>
          <DialogContent>
            <DialogContentText>Bạn có chắc chắn muốn xóa tài khoản này không?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteConfirmation} color="error">
              Hủy
            </Button>
            <Button onClick={handleDeleteUser} color="primary" autoFocus>
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleEditButtonClick}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Sửa
        </MenuItem>
        <EditUser
          open={openEditPopup}
          handleClose={handleCloseEditPopup}
          userId={userId.toString()}
        />

        <MenuItem onClick={() => setConfirmDialogOpen(true)}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  selected: PropTypes.bool.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  roleId: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
};
