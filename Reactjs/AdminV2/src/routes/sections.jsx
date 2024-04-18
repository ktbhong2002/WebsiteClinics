import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const CreateUserPage = lazy(() => import('src/pages/createUser'));
export const DoctorPage = lazy(() => import('src/pages/doctor'));
export const SchedulePage = lazy(() => import('src/pages/schedule'));
export const ClinicPage = lazy(() => import('src/pages/clinic'));
export const CreateClinicPage = lazy(() => import('src/pages/createClinic'));
export const SpecialtyPage = lazy(() => import('src/pages/specialty'));
export const CreateSpecialtyPage = lazy(() => import('src/pages/createSpecialty'));
export const MedicalPackagePage = lazy(() => import('src/pages/medicalPackage'));
export const CreateMedicalPackagePage = lazy(() => import('src/pages/createMedicalPackage'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

export const DoctorSchedulePage = lazy(() => import('src/pages/DoctorManage/schedule'));
export const DoctorManagePatientPage = lazy(() =>
  import('src/pages/DoctorManage/doctorManagePatient')
);
// ----------------------------------------------------------------------

export default function Router() {
  // const { isLoggedIn, userInfo, language } = useSelector((state) => ({
  //   isLoggedIn: state.user.isLoggedIn,
  //   userInfo: state.user.userInfo,
  //   language: state.app.language,
  // }));

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'manage-user', element: <UserPage /> },
        { path: 'create-user', element: <CreateUserPage /> },
        { path: 'manage-doctor', element: <DoctorPage /> },
        { path: 'manage-schedule', element: <SchedulePage /> },
        { path: 'manage-clinic', element: <ClinicPage /> },
        { path: 'create-clinic', element: <CreateClinicPage /> },
        { path: 'manage-specialty', element: <SpecialtyPage /> },
        { path: 'create-specialty', element: <CreateSpecialtyPage /> },
        { path: 'manage-medical-package', element: <MedicalPackagePage /> },
        { path: 'create-medical-package', element: <CreateMedicalPackagePage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'manage-handbook', element: <BlogPage /> },

        { path: 'doctor-manage-schedule', element: <DoctorSchedulePage /> },
        { path: 'doctor-manage-patient', element: <DoctorManagePatientPage /> },
      ],
    },

    // {
    //   path: "/admin-dashboard/doctor",
    //   element: <DashboardLayout />,
    //   children: [
    //     { path: "manage-patient", element: <ManagePatient /> }, //quan ly benh nhan
    //     { path: "manage-patient/:bookingId", element: <CreateRemedy /> }, //tao don thuoc
    //     {
    //       path: "manage-schedule-doctor",
    //       element: <ManageScheduleOneDoctor />,
    //     }, //quan ly ke hoach kham benh chi rieng mot bac si do
    //     { path: "", element: <Navigate to="/admin-dashboard/doctor/manage-patient" replace={true}/> }
    //   ],
    // },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
