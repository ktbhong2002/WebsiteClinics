import PropTypes from 'prop-types';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import React, { useState, useEffect } from 'react';

import {
  Grid,
  Dialog,
  Button,
  InputLabel,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { editSpecialtyService, getAllDetailSpecialtyById } from 'src/Services/userService';
import { toast } from 'react-toastify';

const EditSpecialty = ({ open, handleClose, specialtyId }) => {
  const [specialtyInfo, setSpecialtyInfo] = useState(null);
  const [descriptionMarkdown, setDescriptionMarkdown] = useState('');
  const [descriptionHTML, setDescriptionHTML] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  useEffect(() => {
    const fetchInfoSpecialty = async () => {
      try {
        const res = await getAllDetailSpecialtyById({ id: specialtyId });
        if (res && res.errCode === 0) {
          setSpecialtyInfo(res.data);
          setDescriptionMarkdown(res.data.descriptionMarkdown || '');
          // Kiểm tra xem clinicInfo.image có dạng base64 không
          if (res.data.image.startsWith('data:image')) {
            setImagePreviewUrl(res.data.image);
          }
        } else {
          console.error('Error fetching specialty info:', res.errMessage);
        }
      } catch (error) {
        console.error('Error fetching specialty info:', error);
      }
    };

    if (open && !specialtyInfo) {
      fetchInfoSpecialty();
    }
  }, [open, specialtyId, specialtyInfo]);

  const handleImageChange = (event) => {
    // Hiển thị xem trước ảnh
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleEditorChange = ({ text }) => {
    const html = mdParser.render(text); // Tính toán HTML từ markdown text
    setDescriptionMarkdown(text);
    setDescriptionHTML(html); // Cập nhật contentHTML
  };

  const handleSave = async () => {
    try {
      const payload = {
        id: specialtyId,
        descriptionMarkdown,
        descriptionHTML,
        // Cập nhật image nếu có thay đổi
        image: imagePreviewUrl || specialtyInfo.image,
      };
      const res = await editSpecialtyService(payload);
      if (res && res.errCode === 0) {
        toast.success('Cập nhật thông tin chuyên khoa thành công');
        handleClose();
      } else {
        toast.error('Cập nhật thông tin chuyên khoa thất bại:', res.errMessage);
      }
    } catch (error) {
      console.error('Error saving specialty info:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Chỉnh sửa thông tin {specialtyInfo && specialtyInfo.name}</DialogTitle>
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
          <Grid item xs={6} />
        </Grid>
        <MdEditor
          value={descriptionMarkdown}
          onChange={handleEditorChange}
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
  );
};

EditSpecialty.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  specialtyId: PropTypes.string,
};

export default EditSpecialty;
