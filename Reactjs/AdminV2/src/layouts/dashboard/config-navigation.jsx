import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfigAdmin = [
  {
    title: 'Bảng điều khiển',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Quản lý bác sĩ',
    path: '/manage-doctor',
    icon: icon('ic_doctor'),
  },
  {
    title: 'Quản lý ca khám bệnh',
    path: '/manage-schedule',
    icon: icon('ic_calendar'),
  },
  {
    title: 'Quản lý phòng khám',
    path: '/manage-clinic',
    icon: icon('ic_hospital'),
  },
  {
    title: 'Quản lý gói khám',
    path: '/manage-medical-package',
    icon: icon('ic_medicalPackage'),
  },
  {
    title: 'Quản lý chuyên khoa',
    path: '/manage-specialty',
    icon: icon('ic_specialty'),
  },
  {
    title: 'Quản lý người dùng',
    path: '/manage-user',
    icon: icon('ic_user'),
  },
  {
    title: 'Quản lý cẩm nang',
    path: '/manage-handbook',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'Quản lý thuốc',
  //   path: '/manage-drug',
  //   icon: icon('mdi:drugs'),
  // },
  // {
  //   title: 'Khôi phục tài khoản',
  //   path: '/restore-user',
  //   icon: icon('eva:people-fill'),
  // },
];

const navConfigDoctor = [
  {
    title: 'Bảng điều khiển',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Quản lý bệnh nhân',
    path: '/doctor-manage-patient',
    icon: icon('ic_user'),
  },
  {
    title: 'Đăng kí làm viêc',
    path: '/doctor-manage-schedule',
    icon: icon('ic_doctor'),
  },
  // {
  //   title: 'Quản lý ca khám bệnh',
  //   path: '/manage-schedule',
  //   icon: icon('ic_calendar'),
  // },
  // {
  //   title: 'Quản lý bệnh viện',
  //   path: '/manage-clinic',
  //   icon: icon('ic_hospital'),
  // },
  // {
  //   title: 'Quản lý chuyên khoa',
  //   path: '/manage-specialty',
  //   icon: icon('ic_specialty'),
  // },
  // {
  //   title: 'Quản lý cẩm nang',
  //   path: '/manage-handbook',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'Quản lý thuốc',
  //   path: '/manage-drug',
  //   icon: icon('mdi:drugs'),
  // },
  // {
  //   title: 'Khôi phục tài khoản',
  //   path: '/restore-user',
  //   icon: icon('eva:people-fill'),
  // },
];

const navConfig = {
  navConfigAdmin,
  navConfigDoctor,
};

export default navConfig;
