import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { mockProfiles } from '../data/mockData';

export default function Login() {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - in real app would validate credentials
    const mockUser = {
      id: 1,
      email,
      name: 'Somchai Pattana',
      role: 'jobseeker',
      profile: mockProfiles[0]
    };
    login(mockUser);
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <div className="glass-strong rounded-2xl p-8 shadow-glass-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t('login')}
            </h1>
            <p className="text-sm text-muted-foreground">
              Welcome back to BIM Talent Hub
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                {t('emailAddress')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 glass rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-foreground">{t('rememberMe')}</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-smooth">
                {t('forgotPassword')}
              </Link>
            </div>
            
            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90"
            >
              {t('login')}
            </Button>
          </form>
          
          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t('noAccount')}{' '}
              <Link to="/signup" className="text-primary hover:text-primary/80 font-medium transition-smooth">
                {t('signup')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
