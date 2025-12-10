import { useState } from 'react';
import { Search, Filter, MapPin, Building2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { CompanyCard } from '../components/CompanyCard';
import { mockCompanies } from '../data/mockData';

export default function Companies() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [filteredCompanies, setFilteredCompanies] = useState(mockCompanies);
  
  const handleSearch = () => {
    let filtered = mockCompanies;
    
    if (searchQuery) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(company =>
        company.industries.includes(selectedIndustry)
      );
    }
    
    setFilteredCompanies(filtered);
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
            <span className="text-sm font-medium text-accent">Construction Tech Leaders</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 tech-heading high-contrast">
            {t('companies')}
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore industry-leading companies transforming construction with BIM technology
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="glass-strong rounded-2xl p-6 mb-8 animate-fade-in">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-12 pr-4 py-3 glass rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
          
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Building2 className="inline h-4 w-4 mr-1" />
                Industry
              </label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-4 py-2 glass rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground"
              >
                <option value="all">All Industries</option>
                <option value="Commercial">Commercial</option>
                <option value="Residential">Residential</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Engineering">Engineering</option>
                <option value="Architecture">Architecture</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                className="w-full bg-primary hover:bg-primary/90"
              >
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredCompanies.length} of {mockCompanies.length} companies
          </p>
        </div>
        
        {/* Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map(company => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
        
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12 glass-strong rounded-2xl">
            <p className="text-lg text-muted-foreground">No companies found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
