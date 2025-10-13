import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import DashboadLayout from '../layout/DashboadLayout';

const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = true; // Replace with actual authentication logic
  const loading = false;

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <DashboadLayout>
      {children ? children : <Outlet />}
    </DashboadLayout>
  )
}

export default ProtectedRoutes