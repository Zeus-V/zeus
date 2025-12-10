import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Menu, X, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-smooth">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">BIM Talent Hub</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth">
              {t('home')}
            </Link>
            <Link to="/find-talent" className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth">
              {t('findTalent')}
            </Link>
            <Link to="/find-jobs" className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth">
              {t('findJobs')}
            </Link>
            <Link to="/companies" className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth">
              {t('companies')}
            </Link>
            <Link to="/pricing" className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth">
              Pricing
            </Link>
          </div>
          
          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="gap-2"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-medium">{language === 'en' ? 'TH' : 'EN'}</span>
            </Button>
            
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                >
                  {t('dashboard')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                >
                  {t('logout')}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  {t('login')}
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate('/signup')}
                  className="bg-primary hover:bg-primary/90"
                >
                  {t('signup')}
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg glass hover:glass-strong transition-smooth"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 animate-slide-down">
            <Link
              to="/"
              className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('home')}
            </Link>
            <Link
              to="/find-talent"
              className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('findTalent')}
            </Link>
            <Link
              to="/find-jobs"
              className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('findJobs')}
            </Link>
            <Link
              to="/companies"
              className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('companies')}
            </Link>
            <Link
              to="/pricing"
              className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-smooth"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            
            <div className="pt-3 border-t border-white/10 space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="w-full justify-start gap-2"
              >
                <Globe className="h-4 w-4" />
                <span>{language === 'en' ? 'ภาษาไทย' : 'English'}</span>
              </Button>
              
              {isAuthenticated ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      navigate('/dashboard');
                      setMobileMenuOpen(false);
                    }}
                  >
                    {t('dashboard')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    {t('logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                  >
                    {t('login')}
                  </Button>
                  <Button
                    size="sm"
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => {
                      navigate('/signup');
                      setMobileMenuOpen(false);
                    }}
                  >
                    {t('signup')}
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
