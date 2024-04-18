import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { TextField, Grid, Button, Container, Typography, InputLabel } from '@mui/material';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import { createNewClinicService } from 'src/Services/userService';

export default function CreateClinic() {
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  const [descriptionMarkdown, setDescriptionMarkdown] = useState('');
  const [descriptionHTML, setDescriptionHTML] = useState('');
  const [avatar, setAvatar] = useState('');

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
        Tạo cơ sở y tế mới
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
          name: '',
          address: '',
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Vui lòng nhập tên cơ sở y tế'),
          address: Yup.string().required('Vui lòng nhập địa chỉ'),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const payload = {
              name: values.name,
              address: values.address,
              descriptionMarkdown,
              descriptionHTML,
              avatar,
            };

            const res = await createNewClinicService(payload);

            if (res && res.errCode === 0) {
              toast.success('Đã lưu cơ sở y tế mới thành công');
              // Reset form values
              resetForm();
              setDescriptionMarkdown('');
              setDescriptionHTML('');
              setAvatar('');
            } else {
              toast.error('Lỗi khi lưu cơ sở y tế');
            }
          } catch (error) {
            toast.error('Lỗi khi lưu cơ sở y tế');
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
                  label="Tên cơ sở y tế"
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
            <MdEditor
              value={descriptionMarkdown}
              onChange={handleEditorChange}
              style={{ height: '300px', marginTop: '20px' }}
              renderHTML={(text) => mdParser.render(text)}
            />
            <Grid item xs={6} style={{ marginTop: '20px' }}>
              <InputLabel id="avatar-label" htmlFor="previewImg">
                Chọn ảnh đại diện
              </InputLabel>
              <input id="previewImg" type="file" accept="image/*" onChange={handleAvatarChange} />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center', paddingTop: '20px' }}>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                Lưu cơ sở mới
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
