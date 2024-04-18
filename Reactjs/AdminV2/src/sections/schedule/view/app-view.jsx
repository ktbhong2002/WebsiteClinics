import 'dayjs/locale/vi';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Field, Formik, ErrorMessage } from 'formik';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Grid, Button, Select, MenuItem, Container, Typography, InputLabel } from '@mui/material';

import { getAllDoctors, getAllCodeService, saveBulkScheduleDoctor } from 'src/Services/userService';

export default function ScheduleView() {
  const [doctorsArr, setDoctorsArr] = useState([]);
  const [timesArr, setTimesArr] = useState([]);
  const [rangeTime, setRangeTime] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dayjs.locale('vi');
    const fetchDoctors = async () => {
      const res = await getAllDoctors(``);
      if (res && res.errCode === 0) {
        const arrDoctors = res.data;
        setDoctorsArr(arrDoctors);
      }
    };
    const fetchAllScheduleTime = async () => {
      const res = await getAllCodeService(`TIME`);
      if (res && res.errCode === 0) {
        const arrTimes = res.data;
        setTimesArr(arrTimes);
      }
    };
    fetchDoctors();
    fetchAllScheduleTime();
  }, []);

  const handleSaveSchedule = async (values) => {
    const result = [];
    if (values.selectedTime && values.selectedTime.length > 0) {
      values.selectedTime.forEach((schedule) => {
        if (schedule) {
          const object = {
            doctorId: values.doctor,
            date: new Date(values.date).getTime(),
            timeType: schedule,
          };
          result.push(object);
        }
      });
      if (result.length === 0) {
        console.log('Invalid selected time!');
        return;
      }
    } else {
      toast.error('Invalid selected time!');
      return;
    }
    const res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: values.doctor,
      formatedDate: new Date(values.date).getTime(),
    });
    if (res && res.errCode === 0) {
      toast.success('Lưu thông tin thành công!');
    } else {
      toast.error('Lỗi!');
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Đăng kí lịch khám cho bác sĩ
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
          doctor: '',
          date: null,
          selectedTime: [],
        }}
        validate={(values) => {
          const errors = {};
          if (!values.doctor) {
            errors.doctor = 'Vui lòng chọn bác sĩ';
          }
          if (!values.date) {
            errors.date = 'Ngày không hợp lệ';
          }
          if (!values.doctor) {
            errors.date = 'Vui lòng chọn ngày đăng kí';
          }
          if (values.selectedTime.length === 0) {
            errors.selectedTime = 'Vui lòng chọn ít nhất một thời gian';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await handleSaveSchedule(values);
          } catch (error) {
            toast.error('Lỗi!');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputLabel id="doctor-label">Chọn bác sĩ</InputLabel>
                <Field as={Select} name="doctor" fullWidth labelId="doctor-label">
                  <MenuItem value="">--- Chọn bác sĩ---</MenuItem>
                  {doctorsArr.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.lastName} {item.firstName}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="doctor" component="div" className="error" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="date-label">Chọn ngày</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label=""
                    inputFormat="MM/DD/YYYY"
                    name="date"
                    // minDate={formattedToday}
                    onChange={(newSelectedDate) => {
                      setFieldValue('date', newSelectedDate); // Cập nhật giá trị ngày được chọn
                    }}
                  />
                </LocalizationProvider>
                <ErrorMessage name="date" component="div" className="error" />
              </Grid>
              <Grid container spacing={2} style={{ paddingTop: '30px' }}>
                <Grid item xs={9}>
                  <InputLabel>Chọn thời gian</InputLabel>
                  <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                    {timesArr.map((item) => (
                      <Button
                        key={item.keyMap}
                        variant={
                          values.selectedTime.includes(item.keyMap) ? 'contained' : 'outlined'
                        }
                        className="btn btn-schedule"
                        onClick={() => {
                          if (values.selectedTime.includes(item.keyMap)) {
                            const newSelectedTime = values.selectedTime.filter(
                              (time) => time !== item.keyMap
                            );
                            setFieldValue('selectedTime', newSelectedTime);
                          } else {
                            setFieldValue('selectedTime', [...values.selectedTime, item.keyMap]);
                          }
                        }}
                        style={{ width: '23%', marginBottom: '1rem' }} // Đặt chiều rộng và khoảng cách giữa các nút
                      >
                        {item.valueVi}
                      </Button>
                    ))}
                  </Box>
                  <ErrorMessage name="selectedTime" component="div" className="error" />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  // onClick={() => handleSaveSchedule(values)}
                >
                  {isSubmitting ? <CircularProgress size={24} /> : 'Lưu lịch khám'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
