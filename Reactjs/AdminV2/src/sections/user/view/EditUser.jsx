import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { TextField, Grid, InputLabel, Select, MenuItem } from '@mui/material';
import { getDetailInforDoctor, editUserService, getAllCodeService } from 'src/Services/userService';

import { toast, ToastContainer } from 'react-toastify';

const EditUser = ({ open, handleClose, userId, onEditSuccess }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [genderArr, setGenderArr] = useState([]);
  const [positionArr, setPositionArr] = useState([]);
  const [roleArr, setRoleArr] = useState([]);
  const [gender, setGender] = useState('');
  const [positionId, setPositionId] = useState('');
  const [roleId, setRoleId] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  useEffect(() => {
    const fetchCodes = async () => {
      const fetchCode = async (codeName, setter) => {
        const res = await getAllCodeService(codeName);
        if (res && res.errCode === 0) {
          setter(res.data);
        }
      };
      await Promise.all([
        fetchCode('GENDER', setGenderArr),
        fetchCode('POSITION', setPositionArr),
        fetchCode('ROLE', setRoleArr),
      ]);
    };
    fetchCodes();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (open && !userInfo) {
        try {
          const res = await getDetailInforDoctor(userId);
          if (res && res.errCode === 0) {
            const { firstName, lastName, phoneNumber, address, gender, positionId, roleId, image } =
              res.data;
            setUserInfo(res.data);
            setFirstName(firstName || '');
            setLastName(lastName || '');
            setPhoneNumber(phoneNumber || '');
            setAddress(address || '');
            setGender(gender || '');
            setPositionId(positionId || '');
            setRoleId(roleId || '');
            if (image && image.startsWith('data:image')) {
              setImagePreviewUrl(image);
            }
          } else {
            console.error('Error fetching user info:', res.errMessage);
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };
    fetchUserInfo();
  }, [open, userId, userInfo]);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleImageChange = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const payload = {
        id: userId,
        firstName,
        lastName,
        phoneNumber,
        address,
        gender,
        positionId,
        roleId,
        password: 'HARDCODE',
      };
      const res = await editUserService(payload);
      if (res && res.errCode === 0) {
        toast.success('Thông tin người dùng đã được cập nhật');
        handleClose();
      } else {
        console.error('Lỗi khi cập nhật người dùng:', res.errMessage);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật người dùng:', error);
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Chỉnh sửa thông tin tài khoản {userInfo?.email}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Họ và tên đệm"
              name="firstName"
              fullWidth
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Tên"
              name="lastName"
              fullWidth
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Số điện thoại"
              name="phoneNumber"
              fullWidth
              margin="normal"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="Địa chỉ"
              name="address"
              fullWidth
              margin="normal"
              value={address}
              onChange={handleAddressChange}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={4}>
            <InputLabel id="gender-label">Giới tính</InputLabel>
            <Select
              name="gender"
              fullWidth
              margin="normal"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="">--- Chọn giới tính ---</MenuItem>
              {genderArr.map((item, index) => (
                <MenuItem key={index} value={item.keyMap}>
                  {item.valueVi}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={4}>
            <InputLabel id="positon-label">Chức danh</InputLabel>
            <Select
              name="position"
              fullWidth
              margin="normal"
              value={positionId || ''}
              onChange={(e) => setPositionId(e.target.value)}
            >
              <MenuItem value="">--- Chọn chức danh ---</MenuItem>
              {positionArr.map((item, index) => (
                <MenuItem key={index} value={item.keyMap}>
                  {item.valueVi}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={4}>
            <InputLabel id="gender-label">Vai trò</InputLabel>
            <Select
              name="role"
              fullWidth
              margin="normal"
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
            >
              <MenuItem value="">--- Chọn vai trò ---</MenuItem>
              {roleArr.map((item, index) => (
                <MenuItem key={index} value={item.keyMap}>
                  {item.valueVi}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel id="avatar-label" htmlFor="previewImg">
              Chọn ảnh đại diện
            </InputLabel>
            <input id="previewImg" type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreviewUrl && (
              <img
                src={imagePreviewUrl}
                alt="Preview"
                style={{ width: '100%', marginTop: '10px' }}
              />
            )}
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>

        {/* Add other fields here */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Đóng
        </Button>
        <Button onClick={handleSave} color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditUser.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  userId: PropTypes.string,
  onEditSuccess: PropTypes.func.isRequired,
};

export default EditUser;
