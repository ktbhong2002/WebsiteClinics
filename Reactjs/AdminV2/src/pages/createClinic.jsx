import { Helmet } from 'react-helmet-async';

import { CreateClinic } from 'src/sections/clinic/view';

// ----------------------------------------------------------------------

export default function CreateClinicPage() {
  return (
    <>
      <Helmet>
        <title> User | Booking Care </title>
      </Helmet>

      <CreateClinic />
    </>
  );
}
