import { Helmet } from 'react-helmet-async';

import { ScheduleView } from 'src/sections/schedule/view';

// ----------------------------------------------------------------------

export default function SchedulePage() {
  return (
    <>
      <Helmet>
        <title> Lịch khám của bác sĩ | Booking Care </title>
      </Helmet>

      <ScheduleView />
    </>
  );
}
