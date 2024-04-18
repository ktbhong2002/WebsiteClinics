import { Helmet } from 'react-helmet-async';

import { ClinicView } from 'src/sections/clinic/view';

// ----------------------------------------------------------------------

export default function ClinicPage() {
  return (
    <>
      <Helmet>
        <title> Quản lý phòng khám | Booking Care </title>
      </Helmet>

      <ClinicView />
    </>
  );
}
