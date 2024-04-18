import { Helmet } from 'react-helmet-async';

import { CreateMedicalPackage } from 'src/sections/medicalPackage/view';

// ----------------------------------------------------------------------

export default function CreateMedicalPackagePage() {
  return (
    <>
      <Helmet>
        <title> Tạo gói khám | Booking Care </title>
      </Helmet>

      <CreateMedicalPackage />
    </>
  );
}
