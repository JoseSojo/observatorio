import { createRoot } from 'react-dom/client'
import './index.css';import AppRouter from './route/AppRouter';
import { NotificationProvider } from './_context/NotificationContext';
import { Notification } from './UI/_default/Notification';
import { AuthProvider } from './_context/auth/AuthContext';

createRoot(document.getElementById('root')!).render(
  <>
    <NotificationProvider>   
      <AuthProvider>  
        <Notification />
        <AppRouter />
      </AuthProvider> 
    </NotificationProvider>
  </>,
)
