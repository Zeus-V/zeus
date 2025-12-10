import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FindJobs from './pages/FindJobs';
import FindTalent from './pages/FindTalent';
import Companies from './pages/Companies';
import Dashboard from './pages/Dashboard';
import ProfileDetail from './pages/ProfileDetail';
import ProjectDetail from './pages/ProjectDetail';
import CompanyDetail from './pages/CompanyDetail';
import Pricing from './pages/Pricing';
import JobDetail from './pages/JobDetail';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Layout Component
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/find-jobs" element={<FindJobs />} />
              <Route path="/find-talent" element={<FindTalent />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/profile/:id" element={<ProfileDetail />} />
              <Route path="/portfolio/:id" element={<ProjectDetail />} />
              <Route path="/company/:id" element={<CompanyDetail />} />
              <Route path="/job/:id" element={<JobDetail />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              {/* Redirect any unknown routes to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
