import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Users, Briefcase, Building2, TrendingUp, CheckCircle, Globe, Award, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { PortfolioCard } from '../components/PortfolioCard';
import { mockPortfolioProjects } from '../data/mockData';

export default function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  const [filteredProjects, setFilteredProjects] = useState(mockPortfolioProjects.slice(0, 6));
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  // Handle URL search params on page load
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      setIsSearchActive(true);
      filterProjects(query);
    } else {
      setIsSearchActive(false);
      setFilteredProjects(mockPortfolioProjects.slice(0, 6));
    }
  }, [searchParams]);

  const filterProjects = (query) => {
    if (!query.trim()) {
      setFilteredProjects(mockPortfolioProjects.slice(0, 6));
      return;
    }

    const filtered = mockPortfolioProjects.filter(project =>
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    
    setFilteredProjects(filtered);
  };

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
          setIsSearchActive(true);
          filterProjects(searchQuery);
          navigate(`/?q=${encodeURIComponent(searchQuery)}`);
          break;
        case 'companies':
          navigate(`/companies?q=${encodeURIComponent(searchQuery)}`);
          break;
        default:
          navigate(`/find-jobs?q=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchActive(false);
    setFilteredProjects(mockPortfolioProjects.slice(0, 6));
    navigate('/');
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
      
      {/* Features Section - Dark Construction Theme */}
      <section className="py-24 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-sm font-medium text-primary">Platform Features</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Why Choose BIM Talent Hub?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Industry-leading platform trusted by construction professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:translate-y-[-4px] animate-fade-in group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-orange-500/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Featured Portfolios Section - Behance-inspired Dark Grid */}
      <section className="py-24 bg-black/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12 animate-fade-in">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
                <span className="text-sm font-medium text-orange-400">Featured Work</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                Outstanding BIM Projects
              </h2>
              <p className="text-xl text-gray-400">
                Explore innovative construction projects from our community
              </p>
            </div>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/find-talent')}
              className="hidden lg:flex bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              View All Projects
            </Button>
          </div>
          
          {/* Behance-style Masonry Grid with Dark Theme */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {featuredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="break-inside-avoid animate-fade-in group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative overflow-hidden rounded-xl bg-[#1a1a1a] border border-white/10 hover:border-primary/50 transition-all duration-300">
                  <div className="relative" style={{ height: index % 3 === 0 ? '400px' : index % 3 === 1 ? '320px' : '360px' }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                        <p className="text-sm text-gray-300 line-clamp-2 mb-3">{project.description}</p>
                        <div className="flex items-center gap-2">
                          {project.tags.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 text-xs font-medium rounded-md bg-white/10 text-white border border-white/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 lg:hidden">
            <Button
              size="lg"
              onClick={() => navigate('/find-talent')}
              className="bg-white/5 border border-white/10 text-white hover:bg-white/10"
            >
              View All Projects
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section - Construction Tech Theme */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-orange-500/10 to-primary/20 blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/10 rounded-3xl p-12 sm:p-16 text-center animate-fade-in relative overflow-hidden">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }} />
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">Join the Community</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Ready to Build Your Future?
              </h2>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                Join 1,500+ BIM professionals and 120+ companies shaping the future of construction technology
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/signup')}
                  className="bg-primary hover:bg-primary/90 min-w-[200px] shadow-lg shadow-primary/25"
                >
                  Get Started Free
                </Button>
                <Button
                  size="lg"
                  onClick={() => navigate('/pricing')}
                  className="bg-white/5 border border-white/10 text-white hover:bg-white/10 min-w-[200px]"
                >
                  View Pricing
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="mt-10 flex items-center justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Free to join</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
