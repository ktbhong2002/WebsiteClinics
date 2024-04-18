import { Helmet } from 'react-helmet-async';

import { DoctorScheduleView } from 'src/sections/doctorManage/schedule/view';
// ----------------------------------------------------------------------

export default function DoctorSchedulePage() {
  return (
    <>
      <Helmet>
        <title> Lịch khám của bác sĩ | Booking Care </title>
      </Helmet>

      <DoctorScheduleView />
    </>
  );
}
