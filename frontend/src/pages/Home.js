import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, Briefcase, Building2, TrendingUp, CheckCircle, Globe, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { PortfolioCard } from '../components/PortfolioCard';
import { mockPortfolioProjects } from '../data/mockData';

export default function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/find-jobs?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  const stats = [
    { label: t('activeJobs'), value: '250+', icon: Briefcase },
    { label: t('bimProfessionals'), value: '1,500+', icon: Users },
    { label: t('companies'), value: '120+', icon: Building2 },
    { label: t('projectsCompleted'), value: '3,000+', icon: TrendingUp }
  ];
  
  const features = [
    {
      icon: CheckCircle,
      title: t('feature1Title'),
      description: t('feature1Desc')
    },
    {
      icon: Award,
      title: t('feature2Title'),
      description: t('feature2Desc')
    },
    {
      icon: Building2,
      title: t('feature3Title'),
      description: t('feature3Desc')
    },
    {
      icon: Globe,
      title: t('feature4Title'),
      description: t('feature4Desc')
    }
  ];
  
  const featuredProjects = mockPortfolioProjects.slice(0, 6);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1618385455730-2571c38966b7"
            alt="BIM workspace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/80" />
          <div className="absolute inset-0 gradient-mesh opacity-40" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {t('heroSubtitle')}
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="glass-strong rounded-2xl p-2 flex items-center gap-2 shadow-glass-lg">
                <Search className="h-5 w-5 text-muted-foreground ml-4" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground px-2 py-3"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  {t('searchButton')}
                </Button>
              </div>
            </form>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/find-jobs')}
                className="bg-primary hover:bg-primary/90 min-w-[200px]"
              >
                {t('findJobs')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/find-talent')}
                className="glass-strong min-w-[200px]"
              >
                {t('findTalent')}
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 border-y border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t('featuresTitle')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover why BIM professionals and companies trust our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="glass rounded-2xl p-6 hover:shadow-glass-lg transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Featured Portfolios Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore outstanding BIM projects from our talented community
            </p>
          </div>
          
          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className="break-inside-avoid">
                <PortfolioCard
                  project={project}
                  height={index % 3 === 0 ? '400px' : index % 3 === 1 ? '320px' : '360px'}
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/find-talent')}
              className="glass-strong"
            >
              View All Projects
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-strong rounded-3xl p-12 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of BIM professionals and companies finding success on our platform
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/signup')}
                className="bg-primary hover:bg-primary/90 min-w-[200px]"
              >
                {t('getStarted')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/about')}
                className="glass min-w-[200px]"
              >
                {t('learnMore')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
