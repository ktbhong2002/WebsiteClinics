export const adminMenu = [
  {
    //quản lý người dùng
    name: "menu.admin.manage-user",
    menus: [
      // {
      //   name: "menu.admin.crud",
      //   link: "/system/user-manage",
      // },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
        // subMenus: [
        //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
        // ]
      },
      {
        //quản lý kế hoạch khám bệnh của bác sĩ
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
  {
    //quản lý phòng khám
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    //quản lý chuyên khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },
  {
    //quản lý cẩm nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
  {
    //quản lý gói khám
    name: "menu.admin.medical-package",
    menus: [
      {
        name: "menu.admin.manage-medical-package",
        link: "/system/manage-medical-package",
      },
    ],
  },
  {
    name: "menu.admin.statistical",
    menus: [
      {
        name: "menu.admin.dashboard",
        link: "/system/dashboard",
      },
      {
        name: "Thống kê lịch khám",
        link: "/system/statiscal-handbook",
      },
      {
        name: "Thống kê cẩm nang",
        link: "/system/statiscal-handbook",
      },
    ],
  },
];

export const doctorMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        //quản lý kế hoạch khám bệnh của bác sĩ
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      {
        //quản lý benh nhan khám bệnh của bác sĩ
        name: "menu.doctor.manage-patient",
        link: "/doctor/manage-patient",
      },
      {
        name: "Thống kê",
        link: "/doctor/statistics",
      },
    ],
  },
];
