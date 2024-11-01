import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { NotProtectedRoute, ProtectedRoute } from './_UI/_template/ProtectRouter';
import Dashboard from './app/admin/Dashboard';
import Login from './app/login/Login';
import { DashBoardTemplate } from './_UI/_template/PageTemplate';
import './index.css';
import Logout from './app/logout/Logout';
import ProfileShow from './app/admin/profile/ProfileShow';
import ProfileSecurity from './app/admin/profile/password/ProfilePasswhord';
import ProfileUpdate from './app/admin/profile/update/ProfileUpdate';
import DinamiCRUD from './app/admin/crud/DinamicCrud';
import RestorePassword from './app/login/RestorePassword';
import RestorePasswordToken from './app/login/RestorePasswordToken';
import { NotificationProvider } from './_context/NotificationContext';
import { Notification } from './_UI/_compounds/global/Notification';

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <ProtectedRoute>
      <DashBoardTemplate>
        <Dashboard />
      </DashBoardTemplate>
    </ProtectedRoute>,
  },
  {
    path: "/admin/profile",
    element: <ProtectedRoute>
      <DashBoardTemplate>
        <ProfileShow />
      </DashBoardTemplate>
    </ProtectedRoute>,
  },
  {
    path: "/admin/:crud",
    element: <ProtectedRoute>
      <DashBoardTemplate>
        <DinamiCRUD />
      </DashBoardTemplate>
    </ProtectedRoute>,
  },
  {
    path: "/admin/profile/security",
    element: <ProtectedRoute>
      <DashBoardTemplate>
        <ProfileSecurity />
      </DashBoardTemplate>
    </ProtectedRoute>,
  },
  {
    path: "/admin/profile/update",
    element: <ProtectedRoute>
      <DashBoardTemplate>
        <ProfileUpdate />
      </DashBoardTemplate>
    </ProtectedRoute>,
  },
  {
    path: "/logout",
    element: <ProtectedRoute>
      <>
        <Logout />
      </>
    </ProtectedRoute>,
  }, {
    path: "/",
    element: <NotProtectedRoute>
      <Login />
    </NotProtectedRoute>,
  }, {
    path: "/login",
    element: <NotProtectedRoute>
      <Login />
    </NotProtectedRoute>,
  }, {
    path: "/restore",
    element: <NotProtectedRoute>
      <RestorePassword />
    </NotProtectedRoute>,
  },{
    path: "/restore/:token",
    element: <NotProtectedRoute>
      <RestorePasswordToken />
    </NotProtectedRoute>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationProvider>
      <Notification />
      <RouterProvider router={router} />
    </NotificationProvider>
  </StrictMode>,
)
