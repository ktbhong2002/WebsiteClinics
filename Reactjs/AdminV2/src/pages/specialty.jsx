import { Helmet } from 'react-helmet-async';

import { SpecialtyView } from 'src/sections/specialty/view';

// ----------------------------------------------------------------------

export default function SchedulePage() {
  return (
    <>
      <Helmet>
        <title> Quản lý chuyên khoa | Booking Care </title>
      </Helmet>

      <SpecialtyView />
    </>
  );
}
