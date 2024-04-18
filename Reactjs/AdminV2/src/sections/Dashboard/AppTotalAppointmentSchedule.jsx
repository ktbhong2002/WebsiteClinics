import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

import { getTotalScheduleToday } from 'src/Services/userService';

export default function AppTotalAppointmentSchedules({
  title,
  icon,
  color = 'primary',
  sx,
  ...other
}) {
  const [totalAppointmentSchedules, setTotalAppointmentSchedules] = useState(0);
  useEffect(() => {
    const fetchTotalAppointmentSchedules = async () => {
      const res = await getTotalScheduleToday();
      if (res && res.errCode === 0) {
        const total = res.data.length;
        if (total) {
          setTotalAppointmentSchedules(total);
        } else {
          setTotalAppointmentSchedules('0');
        }
      }
    };
    fetchTotalAppointmentSchedules();
  }, []);

  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}

      <Stack spacing={0.5}>
        <Typography variant="h4">{fShortenNumber(totalAppointmentSchedules)}</Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
      </Stack>
    </Card>
  );
}

AppTotalAppointmentSchedules.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};
