import { useState } from 'react';
import { Search, Filter, MapPin, Building2, Briefcase, Settings } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { CompanyCard } from '../components/CompanyCard';
import { mockCompanies } from '../data/mockData';

export default function Companies() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'talent_seeker', 'service_provider'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedHiringStatus, setSelectedHiringStatus] = useState('all');
  const [selectedService, setSelectedService] = useState('all');
  const [filteredCompanies, setFilteredCompanies] = useState(mockCompanies);
  
  // Get companies by type
  const talentSeekers = mockCompanies.filter(c => c.companyType === 'talent_seeker');
  const serviceProviders = mockCompanies.filter(c => c.companyType === 'service_provider');
  
  const handleSearch = () => {
    let filtered = mockCompanies;
    
    // Filter by active tab
    if (activeTab === 'talent_seeker') {
      filtered = filtered.filter(c => c.companyType === 'talent_seeker');
    } else if (activeTab === 'service_provider') {
      filtered = filtered.filter(c => c.companyType === 'service_provider');
    }
    
    // Search query
    if (searchQuery) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by industry
    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(company =>
        company.industries.includes(selectedIndustry)
      );
    }
    
    // Filter by hiring status (for talent seekers)
    if (activeTab === 'talent_seeker' && selectedHiringStatus !== 'all') {
      filtered = filtered.filter(company =>
        company.hiringStatus === selectedHiringStatus
      );
    }
    
    // Filter by service type (for service providers)
    if (activeTab === 'service_provider' && selectedService !== 'all') {
      filtered = filtered.filter(company =>
        company.services && company.services.includes(selectedService)
      );
    }
    
    setFilteredCompanies(filtered);
  };
  
  // Auto-filter when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reset filters
    setSelectedHiringStatus('all');
    setSelectedService('all');
    // Auto-apply filters
    setTimeout(() => handleSearch(), 0);
  };
  
  return (
    <div className="min-h-screen py-8 blueprint-grid relative">
      {/* Construction Tech Background */}
      <div className="absolute inset-0 construction-gradient pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Construction Tech Theme */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full construction-glass mb-4">
            <Building2 className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">BIM Industry Network</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 tech-heading high-contrast">
            {t('companies')}
          </h1>
          <p className="text-lg text-muted-foreground">
            Connect with BIM service providers and companies hiring BIM talent
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in">
          <button
            onClick={() => handleTabChange('all')}
            className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'all'
                ? 'construction-glass-strong text-primary border-2 border-primary/50'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white backdrop-blur-sm border border-white/10'
            }`}
          >
            <Building2 className="h-4 w-4" />
            All Companies ({mockCompanies.length})
          </button>
          
          <button
            onClick={() => handleTabChange('service_provider')}
            className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'service_provider'
                ? 'construction-glass-strong text-primary border-2 border-primary/50'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white backdrop-blur-sm border border-white/10'
            }`}
          >
            <Settings className="h-4 w-4" />
            BIM Service Providers ({serviceProviders.length})
          </button>
          
          <button
            onClick={() => handleTabChange('talent_seeker')}
            className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'talent_seeker'
                ? 'construction-glass-strong text-primary border-2 border-primary/50'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white backdrop-blur-sm border border-white/10'
            }`}
          >
            <Briefcase className="h-4 w-4" />
            Hiring BIM Talent ({talentSeekers.length})
          </button>
        </div>
        
        {/* Search and Filters */}
        <div className="construction-glass-strong rounded-2xl p-6 mb-8 animate-fade-in">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={
                  activeTab === 'service_provider' 
                    ? "Search BIM service providers..." 
                    : activeTab === 'talent_seeker'
                    ? "Search companies hiring BIM talent..."
                    : "Search all companies..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-12 pr-4 py-3 bg-muted/50 rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
          
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Industry Filter (Always shown) */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Building2 className="inline h-4 w-4 mr-1" />
                Industry
              </label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-4 py-2 bg-muted/50 rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground"
              >
                <option value="all">All Industries</option>
                <option value="Commercial">Commercial</option>
                <option value="Residential">Residential</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Engineering">Engineering</option>
                <option value="Architecture">Architecture</option>
                <option value="Consulting">Consulting</option>
                <option value="BIM">BIM Services</option>
              </select>
            </div>
            
            {/* Talent Seeker Specific: Hiring Status */}
            {activeTab === 'talent_seeker' && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Briefcase className="inline h-4 w-4 mr-1" />
                  Hiring Status
                </label>
                <select
                  value={selectedHiringStatus}
                  onChange={(e) => setSelectedHiringStatus(e.target.value)}
                  className="w-full px-4 py-2 bg-muted/50 rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground"
                >
                  <option value="all">All Status</option>
                  <option value="actively_hiring">Actively Hiring</option>
                  <option value="occasional_hiring">Occasional Hiring</option>
                  <option value="not_hiring">Not Hiring</option>
                </select>
              </div>
            )}
            
            {/* Service Provider Specific: Service Type */}
            {activeTab === 'service_provider' && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Settings className="inline h-4 w-4 mr-1" />
                  Service Type
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-2 bg-muted/50 rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground"
                >
                  <option value="all">All Services</option>
                  <option value="BIM Consulting">BIM Consulting</option>
                  <option value="BIM Implementation">BIM Implementation</option>
                  <option value="Training & Education">Training & Education</option>
                  <option value="BIM Management">BIM Management</option>
                  <option value="Clash Detection">Clash Detection</option>
                  <option value="4D/5D Simulation">4D/5D Simulation</option>
                  <option value="Scan to BIM">Scan to BIM</option>
                </select>
              </div>
            )}
            
            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                className="w-full bg-primary hover:bg-primary/90 tech-shadow"
              >
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredCompanies.length} of {mockCompanies.length} companies
            {activeTab === 'service_provider' && ' (Service Providers)'}
            {activeTab === 'talent_seeker' && ' (Hiring Companies)'}
          </p>
        </div>
        
        {/* Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map(company => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
        
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12 construction-glass-strong rounded-2xl">
            <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-foreground mb-2">No companies found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
