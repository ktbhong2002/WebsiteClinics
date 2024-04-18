import * as Yup from 'yup';
import MarkdownIt from 'markdown-it';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Form, Field, Formik, ErrorMessage } from 'formik';

import {
  Grid,
  Button,
  Select,
  MenuItem,
  TextField,
  Container,
  Typography,
  InputLabel,
} from '@mui/material';

import {
  getAllClinics,
  getAllSpecialties,
  createNewMedicalPackageService,
} from 'src/Services/userService';
import { action } from 'src/theme/palette';

export default function CreateMedicalPackage() {
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  const [clinicsArr, setClinicsArr] = useState([]);
  const [specialtiesArr, setSpecialtiesArr] = useState([]);
  const [descriptionMarkdown, setDescriptionMarkdown] = useState('');
  const [descriptionHTML, setDescriptionHTML] = useState('');
  const [avatar, setAvatar] = useState('');

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

  const handleEditorChange = ({ text }) => {
    setDescriptionMarkdown(text);
    setDescriptionHTML(mdParser.render(text));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setAvatar(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Tạo gói khám mới
      </Typography>
      <Formik
        initialValues={{
          name: '',
          clinic: '',
          specialty: '',
          address: '',
          price: '',
          sapo: '',
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Vui lòng nhập tên gói khám'),
          clinic: Yup.string().required('Vui lòng chọn cơ sở y tế'),
          specialty: Yup.string().required('Vui lòng chọn chuyên khoa'),
          address: Yup.string().required('Vui lòng nhập địa chỉ'),
          price: Yup.number().required('Vui lòng nhập giá khám'),
          sapo: Yup.string().required('Vui lòng nhập mô tả ngắn'),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const payload = {
              action: 'CREATE',
              name: values.name,
              clinicId: values.clinic,
              specialtyId: values.specialty,
              address: values.address,
              price: values.price,
              sapo: values.sapo,
              descriptionMarkdown,
              descriptionHTML,
              avatar,
            };

            const res = await createNewMedicalPackageService(payload);

            if (res && res.errCode === 0) {
              toast.success('Đã lưu gói khám mới thành công');
              // Reset form values
              resetForm();
              setDescriptionMarkdown('');
              setDescriptionHTML('');
              setAvatar('');
            } else {
              toast.error('Lỗi khi lưu gói khám');
            }
          } catch (error) {
            toast.error('Lỗi khi lưu gói khám');
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  label="Tên gói khám"
                  name="name"
                  fullWidth
                  margin="normal"
                  error={errors.name && touched.name}
                  helperText={errors.name && touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={6}>
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
                <InputLabel id="specialty-label">Chuyên khoa</InputLabel>
                <Field
                  as={Select}
                  labelId="specialty-label"
                  name="specialty"
                  fullWidth
                  margin="normal"
                  error={errors.specialty && touched.specialty}
                >
                  <MenuItem value="">--- Chọn chuyên khoa ---</MenuItem>
                  {specialtiesArr.map((specialty) => (
                    <MenuItem key={specialty.id} value={specialty.id}>
                      {specialty.name}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="specialty" component="div" className="error" />
              </Grid>
              <Grid item xs={4}>
                <InputLabel id="clinic-label">Cơ sở y tế</InputLabel>
                <Field
                  as={Select}
                  labelId="clinic-label"
                  name="clinic"
                  fullWidth
                  margin="normal"
                  error={errors.clinic && touched.clinic}
                >
                  <MenuItem value="">--- Chọn cơ sở y tế ---</MenuItem>
                  {clinicsArr.map((clinic) => (
                    <MenuItem key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="clinic" component="div" className="error" />
              </Grid>
              <Grid item xs={4} style={{ paddingTop: '30px' }}>
                <Field
                  as={TextField}
                  label="Giá khám"
                  name="price"
                  fullWidth
                  margin="normal"
                  error={errors.price && touched.price}
                  helperText={errors.price && touched.price && errors.price}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Field
                  as={TextField}
                  label="Mô tả ngắn"
                  name="sapo"
                  fullWidth
                  margin="normal"
                  error={errors.sapo && touched.sapo}
                  helperText={errors.sapo && touched.sapo && errors.sapo}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel id="avatar-label" htmlFor="previewImg">
                  Chọn ảnh đại diện
                </InputLabel>
                <input id="previewImg" type="file" accept="image/*" onChange={handleAvatarChange} />
              </Grid>
            </Grid>
            <InputLabel id="specialty-label">Nhập mô tả chi tiết</InputLabel>
            <MdEditor
              value={descriptionMarkdown}
              onChange={handleEditorChange}
              style={{ height: '300px', marginTop: '20px' }}
              renderHTML={(text) => mdParser.render(text)}
            />

            <Grid item xs={12} style={{ textAlign: 'center', paddingTop: '20px' }}>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                Lưu gói khám
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
