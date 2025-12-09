import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';

export default function Signup() {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: role selection, 2: registration form
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setStep(2);
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock registration
    const mockUser = {
      id: Date.now(),
      email: formData.email,
      name: formData.name,
      role: selectedRole,
      profile: null
    };
    login(mockUser);
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      
      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-2xl animate-fade-in">
        <div className="glass-strong rounded-2xl p-8 shadow-glass-lg">
          {step === 1 ? (
            // Role Selection
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {t('selectRole')}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Choose how you want to use BIM Talent Hub
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Seeker */}
                <button
                  onClick={() => handleRoleSelect('jobseeker')}
                  className="glass rounded-xl p-8 text-center hover:shadow-glass-lg transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-smooth">
                    <Briefcase className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {t('jobSeeker')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Find BIM opportunities and showcase your portfolio
                  </p>
                </button>
                
                {/* Employer */}
                <button
                  onClick={() => handleRoleSelect('employer')}
                  className="glass rounded-xl p-8 text-center hover:shadow-glass-lg transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-smooth">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {t('employer')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Post jobs and find qualified BIM professionals
                  </p>
                </button>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {t('haveAccount')}{' '}
                  <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-smooth">
                    {t('login')}
                  </Link>
                </p>
              </div>
            </>
          ) : (
            // Registration Form
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Create Account
                </h1>
                <p className="text-sm text-muted-foreground">
                  {selectedRole === 'jobseeker' ? t('jobSeeker') : t('employer')}
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 glass rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground placeholder:text-muted-foreground"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t('emailAddress')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 glass rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground placeholder:text-muted-foreground"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    {t('password')}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 glass rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                
                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 glass rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 glass"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    {t('signup')}
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
