import { Helmet } from 'react-helmet-async';

import { MedicalPackageView } from 'src/sections/medicalPackage/view';

// ----------------------------------------------------------------------

export default function MedicalPackagePage() {
  return (
    <>
      <Helmet>
        <title> Quản lý gói khám | Booking Care </title>
      </Helmet>

      <MedicalPackageView />
    </>
  );
}
