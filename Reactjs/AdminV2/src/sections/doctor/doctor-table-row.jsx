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

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import { toast } from 'react-toastify';
import { Button } from '@mui/material';

import EditDoctor from './view/EditDoctor';

export default function DoctorTableRow({
  doctorId, // Thêm userId vào props
  selected,
  lastName,
  firstName,
  avatarUrl,
  phoneNumber,
  email,
  address,
  gender,
  roleId,
  position,
  specialty,
  clinic,
  handleClick,
  fetchDoctorData, // Thêm hàm fetchDoctorData nhận từ thành phần cha
}) {
  const [openEditPopup, setOpenEditPopup] = useState(false); // Thêm state cho openEditPopup và khởi tạo là false

  const [open, setOpen] = useState(null);

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

  const handleEditButtonClick = () => {
    setOpenEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
    fetchDoctorData();
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
        {/* <TableCell>{email}</TableCell> */}
        <TableCell>{position}</TableCell>
        <TableCell>{specialty}</TableCell>
        <TableCell>{clinic}</TableCell>
        <TableCell>
          <MenuItem onClick={handleEditButtonClick}>
            {' '}
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Sửa
          </MenuItem>
          <EditDoctor
            open={openEditPopup}
            handleClose={handleCloseEditPopup}
            doctorId={doctorId}
            updateDoctorData={fetchDoctorData}
          />
        </TableCell>
      </TableRow>

      {/* </Popover> */}
    </>
  );
}

DoctorTableRow.propTypes = {
  doctorId: PropTypes.string, // Định nghĩa userId là string hoặc có thể sửa thành kiểu dữ liệu phù hợp
  avatarUrl: PropTypes.any,
  phoneNumber: PropTypes.any,
  handleClick: PropTypes.func,
  firstName: PropTypes.any,
  lastName: PropTypes.any,
  roleId: PropTypes.any,
  email: PropTypes.any,
  address: PropTypes.any,
  gender: PropTypes.any,
  selected: PropTypes.any,
  specialty: PropTypes.string,
  clinic: PropTypes.string,
  position: PropTypes.string,
};
