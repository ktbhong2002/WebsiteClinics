import moment from 'moment';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import {
  Grid,
  Dialog,
  Button,
  TextField,
  InputLabel,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';

import {
  postSendRemedy,
  cancelBookAppointment,
  getAllPatientsForDoctor,
  acceptBookAppointment,
} from 'src/Services/userService';

import Iconify from 'src/components/iconify';

export default function DoctorTableRow({
  selected,
  handleClick,
  time,
  patientId,
  firstName,
  address,
  reason,
  gender,
  email,
  date,
  status,
  timeType,
}) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const [sendRemedyDialogOpen, setSendRemedyDialogOpen] = useState(false);

  const [emailReceive, setEmailReceive] = useState(email);

  const [patients, setPatients] = useState([]);

  const userData = sessionStorage.getItem('userData');
  const doctorId = userData ? JSON.parse(userData).id : null;
  const fetchPatients = async () => {
    const res = await getAllPatientsForDoctor({ doctorId });
    if (res && res.errCode === 0) {
      const arrPatients = res.data;
      setPatients(arrPatients);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSendRemedy = async () => {
    setIsSending(true);
    try {
      // const userData = sessionStorage.getItem('userData');
      // const doctorId = userData ? JSON.parse(userData).id : null;

      const res = await postSendRemedy({
        doctorId,
        email: emailReceive,
        patientId,
        language: 'vi',
        patientName: firstName,
        timeType,
        imgBase64: imagePreviewUrl,
      });
      if (res && res.errCode === 0) {
        window.location.reload();
        toast.success('Đã gửi đơn thuốc thành công');
        setIsSending(false);
        fetchPatients();
      } else {
        toast.error('Có lỗi khi thực hiện gửi đơn thuốc');
      }
    } catch (error) {
      toast.error('Có lỗi khi thực hiện gửi đơn thuốc:', error);
      // Show error message
    } finally {
      setSendRemedyDialogOpen(false);
    }
  };

  const handleCancelConfirmation = async () => {
    try {
      const res = await cancelBookAppointment({ id: patientId });
      if (res && res.errCode === 0) {
        // Handle success

        toast.success('Hủy lịch khám của bệnh nhân thành công');
        setTimeout(() => {
          window.location.reload();
          fetchPatients(); // Gọi fetchPatients ngay sau khi hủy lịch thành công
        }, 3000);
        // Show success message
      } else {
        toast.error('Có lỗi khi thao tác hủy lịch khám, hãy thực hiện lại');
      }
    } catch (error) {
      toast.error('Hủy thất bại:', error);
      // Show error message
    } finally {
      setConfirmDialogOpen(false);
    }
  };

  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const handleImageChange = (event) => {
    // Hiển thị xem trước ảnh
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const formattedDate = moment
    .unix(Math.floor(date / 1000))
    .locale('vi')
    .format('dddd - DD/MM/YYYY');

  const [isSending, setIsSending] = useState(false);

  const handleAccept = async () => {
    try {
      const res = await acceptBookAppointment({ id: patientId });
      if (res && res.errCode === 0) {
        window.location.reload();
      } else {
        toast.error('Có lỗi khi thao tác đồng ý khám, hãy thực hiện lại');
      }
    } catch (error) {
      toast.error('thất bại:', error);
      // Show error message
    } finally {
      setConfirmDialogOpen(false);
    }
  };

  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selected} onChange={handleClick} />
      </TableCell>
      <TableCell>
        <div>{time}</div>
        <div>{formattedDate}</div>
      </TableCell>
      <TableCell>{firstName || 'Không có thông tin'}</TableCell>
      <TableCell>{address}</TableCell>
      <TableCell>{reason || 'Không có lý do'}</TableCell>
      <TableCell>{gender}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>
        {status === 'Lịch hẹn mới' && (
          <MenuItem onClick={() => setConfirmDialogOpen(true)}>
            <Iconify icon="eva:close-circle-fill" sx={{ mr: 2 }} style={{ color: 'red' }} />
            Hủy lịch
          </MenuItem>
        )}
        {status === 'Đã xác nhận' && (
          <>
            <MenuItem onClick={() => handleAccept()}>
              <Iconify icon="bi:check-circle-fill" sx={{ mr: 2 }} style={{ color: 'green' }} />
              Đồng ý
            </MenuItem>
            <MenuItem onClick={() => setConfirmDialogOpen(true)}>
              <Iconify icon="eva:close-circle-fill" sx={{ mr: 2 }} style={{ color: 'red' }} />
              Hủy lịch
            </MenuItem>
          </>
        )}
        {status === 'Đang khám' && (
          <MenuItem onClick={() => setSendRemedyDialogOpen(true)}>
            <Iconify icon="eva:email-outline" sx={{ mr: 2 }} style={{ color: '#00a7fa' }} />
            Gửi kết quả
          </MenuItem>
        )}
        {status === 'Hoàn thành' && (
          <MenuItem onClick={() => setSendRemedyDialogOpen(true)}>
            <Iconify icon="mdi:email-resend-outline" sx={{ mr: 2 }} style={{ color: '#ffae00' }} />
            Gửi lại kết quả
          </MenuItem>
        )}
      </TableCell>

      {/* Confirmation Dialog */}
      {confirmDialogOpen && (
        <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
          <DialogTitle>Xác nhận hủy lịch</DialogTitle>
          <DialogContent>
            <DialogContentText>Bạn có chắc chắn muốn hủy lịch này không?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDialogOpen(false)} color="error">
              Hủy
            </Button>
            <Button onClick={handleCancelConfirmation} color="primary" autoFocus>
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Confirmation Dialog */}
      {sendRemedyDialogOpen && (
        <Dialog open={sendRemedyDialogOpen} onClose={() => setSendRemedyDialogOpen(false)}>
          <DialogTitle>Gửi đơn thuốc tới tới bệnh nhân {firstName}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid item xs={6}>
                <TextField
                  label="Địa chỉ nhận"
                  name="email"
                  fullWidth
                  margin="normal"
                  // value={email}
                  defaultValue={email}
                  onChange={(e) => setEmailReceive(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} style={{ paddingTop: '20px' }}>
                <InputLabel id="markdown-label">Chọn File đơn thuốc :</InputLabel>
                <input id="previewImg" type="file" accept="image/*" onChange={handleImageChange} />
                {imagePreviewUrl && (
                  <img
                    src={imagePreviewUrl}
                    alt="Preview"
                    style={{ width: '100%', marginTop: '10px' }}
                  />
                )}
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSendRemedyDialogOpen(false)} color="error">
              Hủy
            </Button>
            <Button
              className={`send-button ${isSending ? 'loading' : ''}`}
              onClick={handleSendRemedy}
              color="primary"
              autoFocus
            >
              {isSending ? 'Đang gửi...' : 'Gửi'}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </TableRow>
  );
}

DoctorTableRow.propTypes = {
  selected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  time: PropTypes.string.isRequired,
  patientId: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  reason: PropTypes.string,
  gender: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  timeType: PropTypes.string.isRequired,
};
