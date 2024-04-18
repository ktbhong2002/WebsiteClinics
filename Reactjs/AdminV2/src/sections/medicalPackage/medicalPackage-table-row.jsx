import { useState } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@mui/material';
import Iconify from 'src/components/iconify';
import { toast } from 'react-toastify';
import { deleteMedicalPackageService } from 'src/Services/userService';
import EditMedicalPackage from './view/EditMedicalPackage';

export default function MedicalPackageTableRow({
  medicalPackageId,
  selected,
  name,
  sapo,
  clinic,
  specialty,
  price,
  avatarUrl,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false); // State để điều khiển dialog xác nhận xóa
  const [isHidden, setIsHidden] = useState(false); // State để kiểm soát việc ẩn dòng

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEditButtonClick = () => {
    setOpenEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
  };

  const handleDeleteMedicalPackage = async () => {
    try {
      const res = await deleteMedicalPackageService(medicalPackageId);
      if (res && res.errCode === 0) {
        toast.success('Xóa gói khám thành công');
        setIsHidden(true); // Ẩn dòng sau khi xóa thành công
      }
    } catch (error) {
      toast.error('Xóa gói khám thất bại');
      console.error(error);
    }
  };

  const handleConfirmDelete = () => {
    setConfirmDeleteDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteDialogOpen(false);
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
          <Stack>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <img alt={name} src={avatarUrl} style={{ minHeight: '100px', minWidth: '100px' }} />
        </TableCell>
        <TableCell>{sapo}</TableCell>
        <TableCell>{specialty}</TableCell>
        <TableCell>{clinic}</TableCell>
        <TableCell>{price}</TableCell>
        <TableCell>
          <MenuItem onClick={handleEditButtonClick}>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Sửa
          </MenuItem>
          <EditMedicalPackage
            open={openEditPopup}
            handleClose={handleCloseEditPopup}
            medicalPackageId={medicalPackageId}
          />
          <MenuItem onClick={handleConfirmDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Xóa
          </MenuItem>
        </TableCell>
      </TableRow>
      {/* Dialog xác nhận xóa */}
      <Dialog open={confirmDeleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Xác nhận xóa gói khám</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa gói khám này không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDeleteMedicalPackage} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

MedicalPackageTableRow.propTypes = {
  medicalPackageId: PropTypes.string.isRequired,
  avatarUrl: PropTypes.any,
  handleClick: PropTypes.func,
  name: PropTypes.any,
  sapo: PropTypes.any,
  clinic: PropTypes.any,
  specialty: PropTypes.any,
  price: PropTypes.any,
  selected: PropTypes.any,
};
