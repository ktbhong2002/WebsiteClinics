import { Helmet } from 'react-helmet-async';

import { DoctorView } from 'src/sections/doctor/view';

// ----------------------------------------------------------------------

export default function DoctorPage() {
  return (
    <>
      <Helmet>
        <title> Quản lý bác sĩ | Booking Care </title>
      </Helmet>

      <DoctorView />
    </>
  );
}
