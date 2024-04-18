import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import {
  TextField,
  Grid,
  Button,
  Container,
  Typography,
  MenuItem,
  InputLabel,
  Select,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { createNewUserService, getAllCodeService } from 'src/Services/userService';

export default function CreateUser() {
  const [genderArr, setGenderArr] = useState([]);
  const [positionArr, setPositionArr] = useState([]);
  const [roleArr, setRoleArr] = useState([]);
  const [previewImgURL, setPreviewImgURL] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchGenders = async () => {
      const res = await getAllCodeService(`GENDER`);
      if (res && res.errCode === 0) {
        const arrGenders = res.data;
        setGenderArr(arrGenders);
      }
    };
    const fetchPositions = async () => {
      const res = await getAllCodeService(`POSITION`);
      if (res && res.errCode === 0) {
        const arrPositions = res.data;
        setPositionArr(arrPositions);
      }
    };
    const fetchRoles = async () => {
      const res = await getAllCodeService(`ROLE`);
      if (res && res.errCode === 0) {
        const arrRoles = res.data;
        setRoleArr(arrRoles);
      }
    };
    fetchRoles();
    fetchPositions();
    fetchGenders();
  }, []);

  // const handleOnChangeImage = async (event) => {
  //   const data = event.target.files;
  //   const file = data[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64 = reader.result;
  //       const objectUrl = URL.createObjectURL(file);
  //       setPreviewImgURL(objectUrl);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Tạo tài khoản mới
      </Typography>
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
      <Formik
        initialValues={{
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          address: '',
          gender: '',
          role: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Địa chỉ email không hợp lệ')
            .required('Vui lòng nhập địa chỉ email'),
          password: Yup.string().required('Vui lòng nhập mật khẩu'),
          firstName: Yup.string().required('Vui lòng nhập họ và tên đệm'),
          lastName: Yup.string().required('Vui lòng nhập tên'),
          phoneNumber: Yup.string()
            .matches(/^[0-9]+$/, 'Số điện thoại chỉ chứa các chữ số')
            .required('Vui lòng nhập số điện thoại'),
          address: Yup.string().required('Vui lòng nhập địa chỉ'),
          gender: Yup.string().required('Vui lòng chọn giới tính'),
          role: Yup.string().required('Vui lòng chọn vai trò'),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const res = await createNewUserService(values);
            if (res && res.errCode === 0) {
              toast.success('Tạo tài khoản thành công');
              resetForm();
            } else if (res && res.errCode === 1) {
              toast.error('Email đã tồn tại trong hệ thống');
            } else {
              toast.error('Lỗi khi tạo tài khoản');
            }
          } catch (error) {
            console.error('Error creating user:', error);
            toast.error('Đã xảy ra lỗi khi tạo tài khoản');
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched, resetForm }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  label="Địa chỉ Email"
                  name="email"
                  fullWidth
                  margin="normal"
                  error={errors.email && touched.email}
                  helperText={errors.email && touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  label="Mật khẩu"
                  name="password"
                  fullWidth
                  margin="normal"
                  error={errors.password && touched.password}
                  helperText={errors.password && touched.password && errors.password}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  label="Họ và tên đệm"
                  name="firstName"
                  fullWidth
                  margin="normal"
                  error={errors.firstName && touched.firstName}
                  helperText={errors.firstName && touched.firstName && errors.firstName}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  label="Tên"
                  name="lastName"
                  fullWidth
                  margin="normal"
                  error={errors.lastName && touched.lastName}
                  helperText={errors.lastName && touched.lastName && errors.lastName}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Field
                  as={TextField}
                  label="Số điện thoại"
                  name="phoneNumber"
                  fullWidth
                  margin="normal"
                  error={errors.phoneNumber && touched.phoneNumber}
                  helperText={errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={8}>
                <Field
                  as={TextField}
                  label="Địa chỉ"
                  name="address"
                  fullWidth
                  margin="normal"
                  error={errors.address && touched.address}
                  helperText={errors.address && touched.address && errors.address}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <InputLabel id="gender-label">Giới tính</InputLabel>
                <Field
                  as={Select}
                  name="gender"
                  fullWidth
                  margin="normal"
                  error={errors.gender && touched.gender}
                >
                  <MenuItem value="">--- Chọn giới tính ---</MenuItem>
                  {genderArr.map((item, index) => (
                    <MenuItem key={index} value={item.keyMap}>
                      {item.valueVi}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="gender" component="div" className="error" />
              </Grid>
              <Grid item xs={4}>
                <InputLabel id="positon-label">Chức danh</InputLabel>
                <Field as={Select} name="position" fullWidth margin="normal">
                  <MenuItem value="">--- Chọn chức danh ---</MenuItem>
                  {positionArr.map((item, index) => (
                    <MenuItem key={index} value={item.keyMap}>
                      {item.valueVi}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="position" component="div" className="error" />
              </Grid>
              <Grid item xs={4}>
                <InputLabel id="gender-label">Vai trò</InputLabel>
                <Field
                  as={Select}
                  name="role"
                  fullWidth
                  margin="normal"
                  error={errors.role && touched.role}
                >
                  <MenuItem value="">--- Chọn vai trò ---</MenuItem>
                  {roleArr.map((item, index) => (
                    <MenuItem key={index} value={item.keyMap}>
                      {item.valueVi}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="role" component="div" className="error" />
              </Grid>
            </Grid>
            <Grid item xs={6} style={{ marginTop: '20px' }}>
              <InputLabel id="avatar-label" htmlFor="previewImg">
                Chọn ảnh đại diện
              </InputLabel>
              <input
                id="previewImg"
                type="file"
                accept="image/*"
                // onChange={(event) => handleOnChangeImage(event)}
              />
              {/* <div
                className="preview-image"
                style={{
                  backgroundImage: `url(${previewImgURL})`,
                }}
                onClick={() => openPreviewImage()}
              ></div> */}
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center', paddingTop: '20px' }}>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                Tạo tài khoản
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
