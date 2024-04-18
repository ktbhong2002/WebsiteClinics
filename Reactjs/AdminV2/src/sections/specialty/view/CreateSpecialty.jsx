import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { TextField, Grid, Button, Container, Typography, InputLabel } from '@mui/material';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import { createNewClinicService, createNewSpecialtyService } from 'src/Services/userService';
import Label from 'src/components/label';

export default function CreateSpecialty() {
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  const [descriptionMarkdown, setDescriptionMarkdown] = useState('');
  const [descriptionHTML, setDescriptionHTML] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(''); // State để lưu trữ URL của ảnh

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
        setAvatarUrl(base64String); // Cập nhật URL của ảnh khi người dùng tải lên
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Tạo chuyên khoa mới
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
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Vui lòng nhập tên chuyên khoa'),
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

            const res = await createNewSpecialtyService(payload);

            if (res && res.errCode === 0) {
              toast.success('Đã lưu chuyên khoa mới thành công');
              // Reset form values
              resetForm();
              setDescriptionMarkdown('');
              setDescriptionHTML('');
              setAvatar('');
              setAvatarUrl(''); // Đặt lại URL của ảnh khi người dùng tải lên thành công
            } else {
              toast.error('Lỗi khi lưu chuyên khoa');
            }
          } catch (error) {
            toast.error('Lỗi khi lưu chuyên khoa');
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
                  label="Tên chuyên khoa"
                  name="name"
                  fullWidth
                  margin="normal"
                  error={errors.name && touched.name}
                  helperText={errors.name && touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={5} style={{ marginTop: '10px' }}>
                <InputLabel id="avatar-label" htmlFor="previewImg">
                  Chọn ảnh đại diện
                </InputLabel>
                <input id="previewImg" type="file" accept="image/*" onChange={handleAvatarChange} />
                {avatarUrl && ( // Hiển thị ảnh nếu URL của ảnh có sẵn
                  <img src={avatarUrl} alt="Avatar" style={{ width: '220px', marginTop: '10px' }} />
                )}
              </Grid>
            </Grid>

            <InputLabel id="clinic-label" style={{ paddingTop: '30px' }}>
              Nhập nội dung mô tả chuyên khoa
            </InputLabel>
            <MdEditor
              value={descriptionMarkdown}
              onChange={handleEditorChange}
              style={{ height: '300px', marginTop: '20px' }}
              renderHTML={(text) => mdParser.render(text)}
            />
            <Grid item xs={12} style={{ textAlign: 'center', paddingTop: '20px' }}>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                Lưu chuyên khoa mới
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
