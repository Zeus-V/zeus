import { useState } from 'react';
import { Search, Filter, MapPin, Briefcase } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { JobCard } from '../components/JobCard';
import { mockJobs } from '../data/mockData';

export default function FindJobs() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  
  const handleSearch = () => {
    let filtered = mockJobs;
    
    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(job => job.type === selectedType);
    }
    
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(job => job.location.includes(selectedLocation));
    }
    
    setFilteredJobs(filtered);
  };
  
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('findJobs')}
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover BIM opportunities across Thailand
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
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-12 pr-4 py-3 glass rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
          
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Briefcase className="inline h-4 w-4 mr-1" />
                Job Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 glass rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground"
              >
                <option value="all">All Types</option>
                <option value="full-time">{t('fullTime')}</option>
                <option value="freelance">{t('freelance')}</option>
                <option value="contract">{t('contract')}</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 glass rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground"
              >
                <option value="all">All Locations</option>
                <option value="Bangkok">Bangkok</option>
                <option value="Chiang Mai">Chiang Mai</option>
                <option value="Phuket">Phuket</option>
                <option value="Remote">Remote</option>
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
            Showing {filteredJobs.length} of {mockJobs.length} jobs
          </p>
        </div>
        
        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        
        {filteredJobs.length === 0 && (
          <div className="text-center py-12 glass-strong rounded-2xl">
            <p className="text-lg text-muted-foreground">No jobs found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
