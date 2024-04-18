import PropTypes from 'prop-types';
import MarkdownIt from 'markdown-it';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  getAllSpecialty,
  getAllCodeService,
  getDetailInforDoctor,
  saveDetailDoctorService,
} from 'src/Services/userService';

const EditDoctor = ({ open, handleClose, doctorId, updateDoctorData }) => {
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const [contentMarkdown, setContentMarkdown] = useState('');
  const [contentHTML, setContentHTML] = useState('');
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    nameClinic: '',
    addressClinic: '',
    note: '',
    specialtyId: '', // Chuyên khoa
    clinicId: '', // Phòng khám
    selectedPrice: '',
    selectedPayment: '',
    selectedProvince: '',
    contentMarkdown: '',
    contentHTML: '',
  });

  const [priceArr, setPriceArr] = useState([]);
  const [paymentArr, setPaymentArr] = useState([]);
  const [provinceArr, setProvinceArr] = useState([]);
  const [clinicsArr, setClinicsArr] = useState([]);
  const [specialtiesArr, setSpecialtiesArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clinicRes, specialtyRes, priceRes, paymentRes, provinceRes] = await Promise.all([
          getAllClinics(),
          getAllSpecialty(),
          getAllCodeService('PRICE'),
          getAllCodeService('PAYMENT'),
          getAllCodeService('PROVINCE'),
        ]);

        if (clinicRes.errCode === 0) setClinicsArr(clinicRes.data);
        if (specialtyRes.errCode === 0) setSpecialtiesArr(specialtyRes.data);
        if (priceRes.errCode === 0) setPriceArr(priceRes.data);
        if (paymentRes.errCode === 0) setPaymentArr(paymentRes.data);
        if (provinceRes.errCode === 0) setProvinceArr(provinceRes.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data');
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      if (open && !doctorInfo && !isLoading) {
        try {
          const res = await getDetailInforDoctor(doctorId);
          if (res.errCode === 0) {
            setDoctorInfo(res.data);
            setFormData((prevData) => ({
              ...prevData,
              doctorId,
              action: 'EDIT',
              description: res.data.Markdown ? res.data.Markdown.description || '' : '',
              contentMarkdown: res.data.Markdown ? res.data.Markdown.contentMarkdown || '' : '',
              contentHTML: res.data.Markdown ? res.data.Markdown.contentHTML || '' : '',
              selectedPrice: res.data.Doctor_Infor ? res.data.Doctor_Infor.priceId || '' : '',
              selectedPayment: res.data.Doctor_Infor ? res.data.Doctor_Infor.paymentId || '' : '',
              selectedProvince: res.data.Doctor_Infor ? res.data.Doctor_Infor.provinceId || '' : '',
              nameClinic: res.data.Doctor_Infor ? res.data.Doctor_Infor.nameClinic || '' : '',
              addressClinic: res.data.Doctor_Infor ? res.data.Doctor_Infor.addressClinic || '' : '',
              note: res.data.Doctor_Infor ? res.data.Doctor_Infor.note || '' : '',
              specialtyId: res.data.Doctor_Infor ? res.data.Doctor_Infor.specialtyId || '' : '',
              clinicId: res.data.Doctor_Infor ? res.data.Doctor_Infor.clinicId || '' : '',
            }));
          } else {
            console.error('Error fetching doctor info:', res.errMessage);
            toast.error('Error fetching doctor info');
          }
        } catch (error) {
          console.error('Error fetching doctor info:', error);
          toast.error('Error fetching doctor info');
        }
      }
    };
    fetchDoctorInfo();
  }, [open, doctorId, doctorInfo, isLoading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditorChange = ({ text }) => {
    const html = mdParser.render(text); // Tính toán HTML từ markdown text
    setContentMarkdown(text);
    setContentHTML(html); // Cập nhật contentHTML
    setFormData((prevData) => ({
      ...prevData,
      contentMarkdown: text,
      contentHTML: html, // Cập nhật contentHTML vào formData
    }));
  };

  const handleSave = async () => {
    try {
      const res = await saveDetailDoctorService(formData);
      if (res.errCode === 0) {
        toast.success('Cập nhật thông tin của bác sĩ thành công');
        handleClose();
        updateDoctorData();
      } else {
        toast.error('Cập nhật thông tin bác sĩ thất bại');
      }
    } catch (error) {
      console.error('Error saving doctor info', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Chỉnh sửa thông tin bác sĩ {doctorInfo?.lastName} {doctorInfo?.firstName}
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Thông tin giới thiệu"
                name="description"
                fullWidth
                margin="normal"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel id="gender-label">Giá khám bệnh</InputLabel>
              <Select
                name="selectedPrice"
                fullWidth
                margin="normal"
                value={formData.selectedPrice}
                onChange={handleInputChange}
              >
                <MenuItem value="">--- Chọn giá khám ---</MenuItem>
                {priceArr.map((item, index) => (
                  <MenuItem key={index} value={item.keyMap}>
                    {item.valueVi}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4}>
              <InputLabel id="positon-label">Phương thức thanh toán</InputLabel>
              <Select
                name="selectedPayment"
                fullWidth
                margin="normal"
                value={formData.selectedPayment}
                onChange={handleInputChange}
              >
                <MenuItem value="">--- Chọn phương thức thanh toán ---</MenuItem>
                {paymentArr.map((item, index) => (
                  <MenuItem key={index} value={item.keyMap}>
                    {item.valueVi}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4}>
              <InputLabel id="gender-label">Tỉnh thành</InputLabel>
              <Select
                name="selectedProvince"
                fullWidth
                margin="normal"
                value={formData.selectedProvince}
                onChange={handleInputChange}
              >
                <MenuItem value="">--- Chọn tỉnh thành ---</MenuItem>
                {provinceArr.map((item, index) => (
                  <MenuItem key={index} value={item.keyMap}>
                    {item.valueVi}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Tên phòng khám"
                name="nameClinic"
                fullWidth
                margin="normal"
                value={formData.nameClinic}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Địa chỉ phòng khám"
                name="addressClinic"
                fullWidth
                margin="normal"
                value={formData.addressClinic}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Ghi chú"
                name="note"
                fullWidth
                margin="normal"
                value={formData.note}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="gender-label">Chọn chuyên khoa</InputLabel>
              <Select
                name="specialtyId"
                fullWidth
                margin="normal"
                value={formData.specialtyId}
                onChange={handleInputChange}
              >
                <MenuItem value="">--- Chọn chuyên khoa ---</MenuItem>
                {specialtiesArr.map((specialty, index) => (
                  <MenuItem key={index} value={specialty.id}>
                    {specialty.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="positon-label">Chọn phòng khám</InputLabel>
              <Select
                name="clinicId"
                fullWidth
                margin="normal"
                value={formData.clinicId}
                onChange={handleInputChange}
              >
                <MenuItem value="">--- Chọn phòng khám ---</MenuItem>
                {clinicsArr.map((clinic, index) => (
                  <MenuItem key={index} value={clinic.id}>
                    {clinic.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="markdown-label">Mô tả chi tiết</InputLabel>
              <MdEditor
                value={formData.contentMarkdown}
                onChange={handleEditorChange}
                style={{ height: '300px', marginTop: '20px' }}
                renderHTML={(text) => mdParser.render(text)}
              />
            </Grid>
          </Grid>
        )}
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

EditDoctor.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  doctorId: PropTypes.string.isRequired,
  updateDoctorData: PropTypes.func.isRequired, // Hàm cập nhật dữ liệu bác sĩ trong thành phần cha
};

export default EditDoctor;
