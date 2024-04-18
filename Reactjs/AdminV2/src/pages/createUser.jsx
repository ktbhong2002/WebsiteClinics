import { Helmet } from 'react-helmet-async';

import { CreateUser } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function CreateUserPage() {
  return (
    <>
      <Helmet>
        <title> User | Booking Care </title>
      </Helmet>

      <CreateUser />
    </>
  );
}
