import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTotalClinics from 'src/sections/Dashboard/AppTotalClinic';
import AppTotalDoctors from 'src/sections/Dashboard/AppTotalDoctors';
import AppTotalMedicalPackage from 'src/sections/Dashboard/AppTotalMedicalPackage';
import AppTotalPatient from 'src/sections/Dashboard/AppTotalPatient';
import AppTotalHandbooks from 'src/sections/Dashboard/AppTotalHandbook';
import AppTotalSpecialties from 'src/sections/Dashboard/AppTotalSpecialties';
import AppTotalScheduleToday from 'src/sections/Dashboard/AppTotalScheduleToday';
import AppTotalAppointmentSchedules from 'src/sections/Dashboard/AppTotalAppointmentSchedule';
import AppPostOfCategory from 'src/sections/Dashboard/AppPostOfCategory';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
// import { parseJSON } from 'date-fns';

// ----------------------------------------------------------------------

export default function AppView() {
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, chúc {userData.firstName} một ngày tốt lành 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppTotalClinics
            title="Phòng khám"
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_clinics.png" />}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6} md={3}>
          <AppTotalDoctors />
        </Grid> */}

        <Grid xs={12} sm={6} md={3}>
          <AppTotalSpecialties
            title="Chuyên khoa"
            color="info"
            icon={
              <img
                alt="icon"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh4V7Z_-xb5DnAMMUWLqF0pasu1Mt47ErjUPDXtIyTsdKgjLWZXpRpUK6CZNT48nng-lU&usqp=CAU"
              />
            }
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppTotalDoctors
            title="Bác sĩ"
            color="info"
            icon={<img alt="icon" src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppTotalPatient
            title="Bệnh nhân"
            color="info"
            icon={
              <img
                alt="icon"
                src="https://cdn.icon-icons.com/icons2/2265/PNG/512/crowd_patient_patients_icon_140420.png"
              />
            }
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppTotalHandbooks
            title="Cẩm nang"
            color="info"
            icon={
              <img
                alt="icon"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Circle-icons-news.svg/1200px-Circle-icons-news.svg.png"
              />
            }
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppTotalScheduleToday
            title="Lịch khám hôm nay"
            color="info"
            icon={
              <img
                alt="icon"
                src="https://cdn2.iconfinder.com/data/icons/design-butterscotch-vol-1/256/Deadline-512.png"
              />
            }
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppTotalAppointmentSchedules
            title="Ca làm việc hôm nay"
            color="warning"
            icon={
              <img alt="icon" src="https://oxanh.vn/Data/upload/images/Page/danh-muc-benh.svg" />
            }
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppTotalMedicalPackage
            title="Gói khám"
            color="error"
            icon={
              <img
                alt="icon"
                src="https://static.vecteezy.com/system/resources/previews/023/129/685/original/the-first-aid-kit-icon-typically-represents-a-collection-of-supplies-and-equipment-used-to-provide-medical-assistance-in-emergency-situations-vector.jpg"
              />
            }
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          {/* <AppWebsiteVisits
            title="Thể loại cẩm nang"
            subheader="(+43%) than last year"
            chart={{
              // labels: [
              //   '01/01/2003',
              //   '02/01/2003',
              //   '03/01/2003',
              //   '04/01/2003',
              //   '05/01/2003',
              //   '06/01/2003',
              //   '07/01/2003',
              //   '08/01/2003',
              //   '09/01/2003',
              //   '10/01/2003',
              //   '11/01/2003',
              // ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          /> */}
          <AppPostOfCategory
            title="Thể loại cẩm nang"
            chart={{
              colors: ['#008FFB'], // Màu của cột
              series: [
                {
                  name: 'Thể loại',
                  type: 'column',
                  fill: 'solid', // Loại fill của cột
                },
              ],
              options: {}, // Các tùy chọn cho biểu đồ (nếu có)
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Tỷ lệ giới tính bệnh nhân"
            chart={{
              series: [
                { label: 'Nam', value: 12 },
                { label: 'Nữ', value: 15 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
