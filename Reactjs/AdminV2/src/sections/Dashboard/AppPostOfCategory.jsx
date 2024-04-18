import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Chart, { useChart } from 'src/components/chart';
import React, { useState, useEffect } from 'react';
import { getPostOfCategory } from 'src/Services/userService';

export default function AppPostOfCategory({ title, subheader, chart, ...other }) {
  const { colors, options } = chart;
  const [postOfCategory, setPostOfCategory] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchPostOfCategory = async () => {
      try {
        const res = await getPostOfCategory();
        if (res && res.errCode === 0) {
          const dataCategory = res.categoriesCount;
          if (dataCategory) {
            const categoryLabels = dataCategory.map((category) => category.category);
            const categoryValues = dataCategory.map((category) => category.count); // Sử dụng 'count' thay vì 'value'
            setLabels(categoryLabels);
            setPostOfCategory(categoryValues);
          } else {
            setLabels([]);
            setPostOfCategory([]);
          }
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostOfCategory();
  }, []);

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '56%',
      },
    },
    fill: {
      type: 'solid', // Loại fill của biểu đồ cột
    },
    labels,
    xaxis: {
      categories: labels, // Sử dụng labels làm categories của trục x
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)} bài viết`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="bar"
          series={[
            {
              data: postOfCategory, // Sử dụng dữ liệu từ postOfCategory
            },
          ]}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}

AppPostOfCategory.propTypes = {
  chart: PropTypes.object.isRequired,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
