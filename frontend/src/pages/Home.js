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
  const [activeTab, setActiveTab] = useState('projects');
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate based on active tab
      switch (activeTab) {
        case 'jobs':
          navigate(`/find-jobs?q=${encodeURIComponent(searchQuery)}`);
          break;
        case 'people':
          navigate(`/find-talent?q=${encodeURIComponent(searchQuery)}`);
          break;
        case 'projects':
          navigate(`/?q=${encodeURIComponent(searchQuery)}`);
          break;
        case 'companies':
          navigate(`/companies?q=${encodeURIComponent(searchQuery)}`);
          break;
        default:
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
  
  // Search categories
  const searchCategories = [
    { id: 'projects', label: 'Projects', icon: Building2, placeholder: 'Search BIM projects, buildings, infrastructure...' },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, placeholder: 'Search BIM jobs, positions, opportunities...' },
    { id: 'people', label: 'People', icon: Users, placeholder: 'Search BIM professionals, modelers, coordinators...' },
    { id: 'companies', label: 'Companies', icon: Building2, placeholder: 'Search construction companies, firms...' }
  ];

  const activeCategory = searchCategories.find(cat => cat.id === activeTab);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a]">
      {/* Hero Section with Behance-inspired Search */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Dark Construction Background */}
        <div className="absolute inset-0 z-0">
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
          
          {/* Construction-themed gradient overlays */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="animate-fade-in text-center mb-12">
            {/* Construction-themed title */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">BIM & Construction Technology Platform</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Build the Future of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-glow to-orange-400">
                Construction Technology
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Discover BIM professionals, explore innovative projects, and connect with industry leaders
            </p>
          </div>
          
          {/* Behance-inspired Search with Category Tabs */}
          <div className="max-w-4xl mx-auto">
            {/* Category Tabs */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {searchCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                      activeTab === category.id
                        ? 'bg-primary text-white shadow-lg shadow-primary/25'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white backdrop-blur-sm'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {category.label}
                  </button>
                );
              })}
            </div>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <div className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
                <div className="flex items-center">
                  <div className="pl-6 pr-4 py-4">
                    <Search className="h-6 w-6 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder={activeCategory?.placeholder || 'Search...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-500 py-4 text-lg"
                  />
                  <div className="pr-3 py-3">
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 px-8"
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Popular Searches */}
              <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
                <span className="text-sm text-gray-500">Popular:</span>
                {['BIM Manager', 'Revit', 'High-Rise', 'MEP Coordination', 'Infrastructure'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm transition-smooth border border-white/5"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {/* Stats Section - Dark Construction Theme */}
      <section className="py-16 border-y border-white/5 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center animate-fade-in group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-orange-500/10 border border-primary/20 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
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
