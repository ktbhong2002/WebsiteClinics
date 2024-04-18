import { Helmet } from 'react-helmet-async';

import { CreateSpecialty } from 'src/sections/specialty/view';

// ----------------------------------------------------------------------

export default function CreateSpecialtyPage() {
  return (
    <>
      <Helmet>
        <title> Tạo chuyên khoa | Booking Care </title>
      </Helmet>

      <CreateSpecialty />
    </>
  );
}
