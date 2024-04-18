import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

import { getTotalSpecialties } from 'src/Services/userService';

export default function AppTotalSpecialties({ title, icon, color = 'primary', sx, ...other }) {
  const [totalSpecialties, setTotalSpecialties] = useState(0);
  useEffect(() => {
    const fetchTotalSpecialties = async () => {
      const res = await getTotalSpecialties();
      if (res && res.errCode === 0) {
        const total = res.count;
        if (total) {
          setTotalSpecialties(total);
        }
      }
    };
    fetchTotalSpecialties();
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
        <Typography variant="h4">{fShortenNumber(totalSpecialties)}</Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
      </Stack>
    </Card>
  );
}

AppTotalSpecialties.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};
