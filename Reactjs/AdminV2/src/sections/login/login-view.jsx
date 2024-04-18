import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, useFormik, FormikProvider } from 'formik';

import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import { Checkbox } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import { handleLoginApi } from 'src/Services/userService';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import { userLoginSuccess } from '../../store/actions';
// import { useEffect } from 'react';
// ----------------------------------------------------------------------

export default function LoginView() {
  const navigate = useNavigate();
  const theme = useTheme();
  // const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberAccount, setRememberAccount] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .email('Bạn phải nhập đúng địa chỉ Email')
      .required('Bạn phải nhập email !'),
    password: Yup.string().required('Bạn phải nhập mật khẩu'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: false,
    },
    validationSchema: LoginSchema,
    onSubmit: handleSubmit,
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  const handleClick = () => {
    router.push('/manage-user');
  };

  const handleLogin = async () => {
    try {
      const data = await handleLoginApi(values.username, values.password);
      console.log(data.errCode);
      if (data && data.errCode === 0) {
        const storage = rememberAccount ? localStorage : sessionStorage;
        storage.setItem('userData', JSON.stringify(data.user));
        navigate('/');
      } else if (data && data.errCode === 1) {
        formik.setErrors({ username: 'Địa chỉ Email không tồn tại trên hệ thống!' });
      } else if (data && data.errCode === 3) {
        formik.setErrors({ password: 'Bạn đã nhập sai mật khẩu, vui lòng kiểm tra lại!' });
      } else if (data && data.errCode === 4) {
        formik.setErrors({ username: 'Bạn không có quyền đăng nhập vào trang này.' });
      }
    } catch (e) {
      // Xử lý khi có lỗi từ API
      const errorMessage = e.response
        ? e.response.data.message
        : 'Đã xảy ra lỗi khi kết nối đến máy chủ';
      formik.setErrors({ username: errorMessage });
    }
  };

  const renderForm = (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            name="username"
            label="Địa chỉ email..."
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            name="password"
            label="Nhập mật khẩu ..."
            type={showPassword ? 'text' : 'password'}
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
          <Link variant="subtitle2" underline="hover">
            Quên mật khẩu?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={handleLogin}
        >
          Đăng nhập
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
  const [openForgotPasswordDialog, setOpenForgotPasswordDialog] = useState(false);

  const handleOpenForgotPasswordDialog = () => {
    setOpenForgotPasswordDialog(true);
  };

  const handleCloseForgotPasswordDialog = () => {
    setOpenForgotPasswordDialog(false);
  };

  const [isHcaptchaLoaded, setIsHcaptchaLoaded] = useState(false);
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = 'https://hcaptcha.com/1/api.js';
  //   script.async = true;
  //   script.onload = () => {
  //     setIsHcaptchaLoaded(true);
  //   };
  //   document.head.appendChild(script);

  //   return () => {
  //     document.head.removeChild(script);
  //   };
  // }, []);

  const onSubmitCaptcha = () => {
    const response = window.hcaptcha.getResponse();
    console.log(response);
    if (response) {
      // reCAPTCHA đã được xác minh, tiếp tục xử lý form quên mật khẩu
      document.getElementById('forgot-password-form').submit();
    } else {
      // Hiển thị thông báo lỗi nếu reCAPTCHA chưa được xác minh
      alert('Vui lòng xác minh bạn không phải là robot!');
    }
  };

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Đăng nhập quản trị hệ thống</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            {/* Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link> */}
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Hoặc
            </Typography>
          </Divider>

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  name="username"
                  label="Địa chỉ email..."
                  {...getFieldProps('username')}
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                />

                <TextField
                  name="password"
                  label="Nhập mật khẩu ..."
                  type={showPassword ? 'text' : 'password'}
                  {...getFieldProps('password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="body2">Nhớ tài khoản</Typography>
                <Checkbox
                  checked={rememberAccount}
                  onChange={(e) => setRememberAccount(e.target.checked)}
                />
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
                <Link
                  variant="subtitle2"
                  underline="hover"
                  onClick={handleOpenForgotPasswordDialog}
                >
                  Quên mật khẩu?
                </Link>
              </Stack>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                onClick={handleLogin}
              >
                Đăng nhập
              </LoadingButton>
            </Form>
          </FormikProvider>
        </Card>
      </Stack>

      {/* Dialog quên mật khẩu */}
      <Dialog onClose={handleCloseForgotPasswordDialog} open={openForgotPasswordDialog}>
        <DialogTitle>Quên mật khẩu?</DialogTitle>
        <DialogContent>
          {/* Nội dung dialog */}
          <Typography variant="body2">
            Nhập địa chỉ email của bạn để nhận liên kết đặt lại mật khẩu.
          </Typography>
          <TextField autoFocus margin="dense" label="Địa chỉ Email" type="email" fullWidth />
          {/* <div class="h-captcha" data-sitekey="20dd844f-3511-4174-8078-192a03654dff"></div> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForgotPasswordDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={onSubmitCaptcha} color="primary">
            Gửi
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
