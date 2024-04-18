import 'dayjs/locale/vi';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { Form, Formik, ErrorMessage } from 'formik';
import { makeStyles } from '@mui/styles';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Grid, Button, Container, Typography, InputLabel, Checkbox } from '@mui/material';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import {
  getAllCodeService,
  saveBulkScheduleDoctor,
  getDoctorSchedule,
  doctorCancelSchedule,
} from 'src/Services/userService';

export default function DoctorScheduleView() {
  const [doctorsArr, setDoctorsArr] = useState([]);
  const [doctorScheduleArr, setDoctorScheduleArr] = useState([]);
  const [timesArr, setTimesArr] = useState([]);
  const [rangeTime, setRangeTime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submittedValues, setSubmittedValues] = useState(null); // State để lưu giá trị form đã gửi thành công

  useEffect(() => {
    dayjs.locale('vi');
    const fetchAllScheduleTime = async () => {
      const res = await getAllCodeService(`TIME`);
      if (res && res.errCode === 0) {
        const arrTimes = res.data;
        setTimesArr(arrTimes);
      }
    };
    fetchAllScheduleTime();
  }, []);

  const userData = sessionStorage.getItem('userData');
  const doctorId = userData ? JSON.parse(userData).id : null;

  const fetchDoctorSchedule = async () => {
    const res = await getDoctorSchedule(doctorId);
    if (res && res.errCode === 0) {
      const arrDoctorSchedule = res.data;
      setDoctorScheduleArr(arrDoctorSchedule);
    }
  };

  useEffect(() => {
    fetchDoctorSchedule();
  }, []);

  const handleSaveSchedule = async (values) => {
    const result = [];
    console.log(values);
    if (values.selectedTime && values.selectedTime.length > 0) {
      values.selectedTime.forEach((schedule) => {
        if (schedule) {
          const object = {
            doctorId,
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
      doctorId,
      formatedDate: new Date(values.date).getTime(),
    });
    if (res && res.errCode === 0) {
      // Lưu lịch thành công, gọi lại hàm fetchDoctorSchedule để cập nhật danh sách lịch đã đăng kí
      try {
        await fetchDoctorSchedule();
        toast.success('Lưu thông tin thành công!');
        setSubmittedValues(null);
      } catch (error) {
        console.error('Error fetching doctor schedule:', error);
        toast.error('Có lỗi xảy ra khi cập nhật danh sách lịch đã đăng kí!');
      }
    } else {
      toast.error('Lỗi!');
    }
  };

  const handleCancel = async (scheduleId) => {
    try {
      const res = await doctorCancelSchedule(doctorId, scheduleId);
      if (res && res.errCode === 0) {
        // Gọi API hoặc hàm service để hủy lịch với scheduleId đã chọn
        // await cancelSchedule(scheduleId);
        // Nếu hủy lịch thành công, cập nhật lại danh sách lịch làm việc
        const updatedSchedule = doctorScheduleArr.filter((schedule) => schedule.id !== scheduleId);
        setDoctorScheduleArr(updatedSchedule);
        toast.success('Hủy lịch thành công!');
      } else {
        toast.error('Hủy lịch thất bại!');
      }
    } catch (error) {
      console.error('Error cancelling schedule:', error);
      toast.error('Có lỗi xảy ra khi hủy lịch!');
    }
  };

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Đăng kí lịch làm việc
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
      {/* Đặt ToastContainer ở ngay ngoài phạm vi của Formik */}
      <Formik
        initialValues={
          submittedValues || {
            // Thay đổi initialValues để sử dụng submittedValues nếu tồn tại
            date: null,
            selectedTime: [],
          }
        }
        validate={(values) => {
          const errors = {};
          if (!values.date) {
            errors.date = 'Ngày không hợp lệ';
          }
          if (values.selectedTime.length === 0) {
            errors.selectedTime = 'Vui lòng chọn ít nhất một thời gian';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await handleSaveSchedule(values);
            setSubmittedValues([]); // Lưu giá trị form đã gửi thành công vào state submittedValues
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          <Typography variant="h5" sx={{ mb: 5 }} style={{ textAlign: 'center' }}>
            Lịch đã đăng kí
          </Typography>
          <TableContainer component={Paper} style={{}}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow style={{ backgroundColor: '#00BFFF' }}>
                  <TableCell />
                  <TableCell>Ngày</TableCell>
                  <TableCell align="right">Thời gian</TableCell>
                  <TableCell align="right">Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {doctorScheduleArr.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(parseInt(row.date, 10)).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">{row.timeTypeData.valueVi}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleCancel(row.id)}
                      >
                        Hủy đăng kí
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
