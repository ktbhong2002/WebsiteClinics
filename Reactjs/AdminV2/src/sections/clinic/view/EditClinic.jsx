import PropTypes from 'prop-types';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import React, { useState, useEffect } from 'react';

import {
  Grid,
  Dialog,
  Button,
  TextField,
  InputLabel,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { editClinicService, getAllDetailClinicById } from 'src/Services/userService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditClinic = ({ open, handleClose, clinicId }) => {
  const [clinicInfo, setClinicInfo] = useState(null);
  const [descriptionMarkdown, setDescriptionMarkdown] = useState('');
  const [address, setAddress] = useState('');
  const [descriptionHTML, setDescriptionHTML] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  useEffect(() => {
    const fetchInfoClinic = async () => {
      try {
        const res = await getAllDetailClinicById({ id: clinicId });
        if (res && res.errCode === 0) {
          setClinicInfo(res.data);
          setDescriptionMarkdown(res.data.descriptionMarkdown || '');
          setAddress(res.data.address || '');

          // Kiểm tra xem clinicInfo.image có dạng base64 không
          if (res.data.image.startsWith('data:image')) {
            setImagePreviewUrl(res.data.image);
          }
        } else {
          console.error('Error fetching clinic info:', res.errMessage);
        }
      } catch (error) {
        console.error('Error fetching clinic info:', error);
      }
    };

    if (open && !clinicInfo) {
      fetchInfoClinic();
    }
  }, [open, clinicId, clinicInfo]);

  const handleAddressChange = (event) => {
    // Cập nhật giá trị địa chỉ khi người dùng thay đổi
    setAddress(event.target.value);
    setClinicInfo({ ...clinicInfo, address: event.target.value });
  };
  const handleImageChange = (event) => {
    // Hiển thị xem trước ảnh
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
        id: clinicId,
        address,
        descriptionMarkdown,
        descriptionHTML,
        // Cập nhật image nếu có thay đổi
        image: imagePreviewUrl || clinicInfo.image,
      };
      const res = await editClinicService(payload);
      if (res && res.errCode === 0) {
        handleClose();
        toast.success('Chỉnh sửa thông tin phòng khám thành công');
      } else {
        toast.error('Chỉnh sửa thông tin phòng khám thất bại', res.errMessage);
      }
    } catch (error) {
      console.error('Error saving clinic info:', error);
    }
  };

  return (
    <>
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Chỉnh sửa thông tin {clinicInfo && clinicInfo.name}</DialogTitle>
        <DialogContent>
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
            <Grid item xs={6}>
              <TextField
                label="Địa chỉ"
                value={address}
                onChange={handleAddressChange}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
          <MdEditor
            value={descriptionMarkdown}
            onChange={({ text }) => setDescriptionMarkdown(text)}
            style={{ height: '300px', marginTop: '20px' }}
            renderHTML={(text) => mdParser.render(text)}
          />
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
    </>
  );
};

EditClinic.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  clinicId: PropTypes.string,
};

export default EditClinic;
