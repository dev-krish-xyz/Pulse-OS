import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Landing from './pages/landing/Landing';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import PatientList from './pages/patients/PatientList';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/layout/Layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/patients" element={<PatientList />} />
              <Route path="/doctors" element={<div className="p-8"><div className="bg-white rounded-xl border border-slate-200 p-8 text-center"><p className="text-slate-500">Doctors - Coming Soon</p></div></div>} />
              <Route path="/staff" element={<div className="p-8"><div className="bg-white rounded-xl border border-slate-200 p-8 text-center"><p className="text-slate-500">Staff - Coming Soon</p></div></div>} />
              <Route path="/appointments" element={<div className="p-8"><div className="bg-white rounded-xl border border-slate-200 p-8 text-center"><p className="text-slate-500">Appointments - Coming Soon</p></div></div>} />
              <Route path="/medical-records" element={<div className="p-8"><div className="bg-white rounded-xl border border-slate-200 p-8 text-center"><p className="text-slate-500">Medical Records - Coming Soon</p></div></div>} />
              <Route path="/billing" element={<div className="p-8"><div className="bg-white rounded-xl border border-slate-200 p-8 text-center"><p className="text-slate-500">Billing - Coming Soon</p></div></div>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#18181b',
            color: '#fff',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#f43f5e',
              secondary: '#fff',
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
