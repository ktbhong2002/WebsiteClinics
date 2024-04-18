import PropTypes from 'prop-types';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import React, { useState, useEffect } from 'react';

import {
  Grid,
  Dialog,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import {
  getAllClinics,
  getAllSpecialties,
  getDetailInforMedicalPackage,
  createNewMedicalPackageService,
} from 'src/Services/userService';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditMedicalPackage = ({ open, handleClose, medicalPackageId }) => {
  const [medicalPackageInfo, setMedicalPackageInfo] = useState(null);
  const [name, setName] = useState('');
  const [descriptionMarkdown, setDescriptionMarkdown] = useState('');
  const [descriptionHTML, setDescriptionHTML] = useState('');
  const [address, setAddress] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [clinicsArr, setClinicsArr] = useState([]);
  const [specialtiesArr, setSpecialtiesArr] = useState([]);
  const [clinicId, setClinicId] = useState('');
  const [specialtyId, setSpecialtyId] = useState('');
  const [price, setPrice] = useState('');
  const [sapo, setSapo] = useState('');

  const mdParser = new MarkdownIt(/* Markdown-it options */);

  useEffect(() => {
    const fetchInfoMedicalPackage = async () => {
      try {
        const res = await getDetailInforMedicalPackage(medicalPackageId);
        if (res && res.errCode === 0) {
          setMedicalPackageInfo(res.data);
          setName(res.data.name || '');
          setDescriptionMarkdown(res.data.descriptionMarkdown || '');
          setAddress(res.data.address || '');
          setSpecialtyId(res.data.specialtyId || '');
          setClinicId(res.data.clinicId || '');
          setPrice(res.data.price || '');
          setSapo(res.data.sapo || '');
          setDescriptionHTML(res.data.descriptionHTML || '');

          // Kiểm tra xem medicalPackageInfo.image có dạng base64 không
          if (res.data.image.startsWith('data:image')) {
            setImagePreviewUrl(res.data.image);
          }
        } else {
          console.error('Error fetching medicalPackage info:', res.errMessage);
        }
      } catch (error) {
        console.error('Error fetching medicalPackage info:', error);
      }
    };

    if (open && !medicalPackageInfo) {
      fetchInfoMedicalPackage();
    }
  }, [open, medicalPackageId, medicalPackageInfo]);

  useEffect(() => {
    const fetchData = async () => {
      const clinicRes = await getAllClinics();
      const specialtyRes = await getAllSpecialties();
      if (clinicRes && clinicRes.errCode === 0) {
        setClinicsArr(clinicRes.data);
      }
      if (specialtyRes && specialtyRes.errCode === 0) {
        setSpecialtiesArr(specialtyRes.data);
      }
    };
    fetchData();
  }, []);

  const handleAddressChange = (event) => {
    // Cập nhật giá trị địa chỉ khi người dùng thay đổi
    setAddress(event.target.value);
    setMedicalPackageInfo({ ...medicalPackageInfo, address: event.target.value });
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

  const handleEditorChange = ({ text }) => {
    const html = mdParser.render(text); // Tính toán HTML từ markdown text
    setDescriptionMarkdown(text);
    setDescriptionHTML(html); // Cập nhật contentHTML
  };

  const handleSave = async () => {
    try {
      const payload = {
        action: 'EDIT',
        id: medicalPackageId,
        name,
        address,
        clinicId,
        specialtyId,
        price,
        sapo,
        descriptionMarkdown,
        descriptionHTML,
        image: imagePreviewUrl || medicalPackageInfo.image,
      };
      const res = await createNewMedicalPackageService(payload);
      if (res && res.errCode === 0) {
        toast.success('Cập nhật thông tin gói khám thành công!');
        handleClose();
      } else {
        toast.error('Cập nhật thông tin gói khám thất bại');
      }
    } catch (error) {
      toast.error('Cập nhật thông tin gói khám thất bại');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Chỉnh sửa thông tin {medicalPackageInfo && medicalPackageInfo.name}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Tên gói khám"
              value={name}
              onChange={(event) => setName(event.target.value)}
              fullWidth
              margin="normal"
            />
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
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <InputLabel id="specialty-label">Chuyên khoa</InputLabel>
            <Select
              name="specialtyId"
              fullWidth
              margin="normal"
              value={specialtyId}
              onChange={(event) => setSpecialtyId(event.target.value)}
            >
              <MenuItem value="">--- Chọn chuyên khoa ---</MenuItem>
              {specialtiesArr.map((specialty, index) => (
                <MenuItem key={index} value={specialty.id}>
                  {specialty.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={4}>
            <InputLabel id="clinic-label">Cơ sở y tế</InputLabel>
            <Select
              name="clinicId"
              fullWidth
              margin="normal"
              value={clinicId}
              onChange={(event) => setClinicId(event.target.value)}
            >
              <MenuItem value="">--- Chọn cơ sở y tế ---</MenuItem>
              {clinicsArr.map((clinic) => (
                <MenuItem key={clinic.id} value={clinic.id}>
                  {clinic.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={4} style={{ paddingTop: '30px' }}>
            <TextField
              label="Giá khám"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              label="Mô tả ngắn"
              fullWidth
              margin="normal"
              value={sapo}
              onChange={(event) => setSapo(event.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
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

EditMedicalPackage.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  medicalPackageId: PropTypes.string,
};

export default EditMedicalPackage;
