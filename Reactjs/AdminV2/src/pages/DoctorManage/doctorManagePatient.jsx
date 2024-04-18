import { Helmet } from 'react-helmet-async';

import { DoctorManagePatienView } from 'src/sections/doctorManage/patientManage/doctor/view';
// ----------------------------------------------------------------------

export default function DoctorManagePatientPage() {
  return (
    <>
      <Helmet>
        <title> Danh sách bệnh nhân | Booking Care </title>
      </Helmet>

      <DoctorManagePatienView />
    </>
  );
}
