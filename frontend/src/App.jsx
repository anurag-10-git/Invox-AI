import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import SignUp from './pages/Auth/SignUp'
import Login from './pages/Auth/Login'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/Dashboard/Dashboard'
import AllInvoices from './pages/Invoices/AllInvoices'
import CreateInvoice from './pages/Invoices/CreateInvoice'
import InvoiceDetail from './pages/Invoices/InvoiceDetail'
import Profile from './pages/Profile/Profile'
import ProtectedRoutes from './components/auth/ProtectedRoutes'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />

          <Route path='/' element={<ProtectedRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/invoices' element={<AllInvoices />} />
            <Route path='/invoices/new' element={<CreateInvoice />} />
            <Route path='/invoices/:id' element={<InvoiceDetail />} />
            <Route path='/profile' element={<Profile />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          }
        }}
      />
    </AuthProvider>
  )
}

export default App