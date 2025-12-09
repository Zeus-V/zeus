import { useState } from 'react';
import { Search, Filter, MapPin, Briefcase } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { ProfileCard } from '../components/ProfileCard';
import { mockProfiles } from '../data/mockData';

export default function FindTalent() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [filteredProfiles, setFilteredProfiles] = useState(mockProfiles);
  
  const handleSearch = () => {
    let filtered = mockProfiles;
    
    if (searchQuery) {
      filtered = filtered.filter(profile =>
        profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedRole !== 'all') {
      filtered = filtered.filter(profile => profile.role === selectedRole);
    }
    
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(profile => profile.location.includes(selectedLocation));
    }
    
    setFilteredProfiles(filtered);
  };
  
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('findTalent')}
          </h1>
          <p className="text-lg text-muted-foreground">
            Connect with skilled BIM professionals in Thailand
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
                placeholder="Search by name, skills, or role..."
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
                Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-2 glass rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground"
              >
                <option value="all">All Roles</option>
                <option value="BIM Manager">{t('bimManager')}</option>
                <option value="BIM Coordinator">{t('bimCoordinator')}</option>
                <option value="BIM Modeler">{t('bimModeler')}</option>
                <option value="BIM Consultant">{t('bimConsultant')}</option>
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
            Showing {filteredProfiles.length} of {mockProfiles.length} professionals
          </p>
        </div>
        
        {/* Profile Listings */}
        <div className="space-y-6">
          {filteredProfiles.map(profile => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
        
        {filteredProfiles.length === 0 && (
          <div className="text-center py-12 glass-strong rounded-2xl">
            <p className="text-lg text-muted-foreground">No professionals found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
