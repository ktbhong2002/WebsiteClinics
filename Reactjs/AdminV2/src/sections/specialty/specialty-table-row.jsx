import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import { toast } from 'react-toastify';
import { deleteSpecialtyService } from 'src/Services/userService';
import EditSpecialty from './view/EditSpecialty';

export default function SpecialtyTableRow({
  specialtyId,
  selected,
  name,
  descriptionMarkdown,
  avatarUrl,
  handleClick,
}) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteSpecialty = async () => {
    try {
      const res = await deleteSpecialtyService(specialtyId);
      if (res && res.errCode === 0) {
        toast.success('Xóa chuyên khoa thành công');
      }
    } catch (e) {
      toast.error('Xóa chuyên khoa thất bại');
      console.log(e);
    }
  };

  const [openEditPopup, setOpenEditPopup] = useState(false);

  const handleEditButtonClick = () => {
    setOpenEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
  };

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
          <img alt={name} src={avatarUrl} style={{ minHeight: '100px', minWidth: '100px' }} />
        </TableCell>

        <TableCell>{descriptionMarkdown}</TableCell>

        <TableCell>
          <IconButton onClick={handleEditButtonClick}>
            <Iconify icon="eva:edit-fill" />
          </IconButton>
          <EditSpecialty
            open={openEditPopup}
            handleClose={handleCloseEditPopup}
            specialtyId={specialtyId}
          />
          <IconButton onClick={handleOpenDeleteDialog}>
            <Iconify icon="eva:trash-2-outline" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có chắc chắn muốn xóa chuyên khoa này không?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Hủy bỏ
          </Button>
          <Button
            onClick={() => {
              handleCloseDeleteDialog();
              handleDeleteSpecialty();
            }}
            color="error"
            autoFocus
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

SpecialtyTableRow.propTypes = {
  specialtyId: PropTypes.string,
  avatarUrl: PropTypes.any,
  handleClick: PropTypes.func,
  name: PropTypes.any,
  descriptionMarkdown: PropTypes.any,
  selected: PropTypes.any,
};
