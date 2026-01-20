import { MapPin, Users, Briefcase, Star, Award, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';

export const CompanyCard = ({ company }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const isServiceProvider = company.companyType === 'service_provider';
  const isTalentSeeker = company.companyType === 'talent_seeker';
  
  return (
    <div className="construction-glass rounded-xl p-6 hover:tech-shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in border border-white/10 hover:border-primary/30">
      <div className="flex flex-col items-center text-center">
        {/* Logo */}
        <div className="w-20 h-20 rounded-xl overflow-hidden mb-4 bg-muted/30 border border-white/10">
          <img
            src={company.logo}
            alt={company.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Company Type Badge */}
        <div className="mb-3">
          {isServiceProvider && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
              <Settings className="h-3 w-3" />
              BIM Service Provider
            </div>
          )}
          {isTalentSeeker && company.hiringStatus === 'actively_hiring' && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold border border-accent/20">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Actively Hiring
            </div>
          )}
          {isTalentSeeker && company.hiringStatus === 'occasional_hiring' && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-semibold border border-yellow-500/20">
              Occasional Hiring
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2 high-contrast">{company.name}</h3>
        
        {/* Rating for Service Providers */}
        {isServiceProvider && company.rating && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 text-accent fill-accent" />
            <span className="text-sm font-semibold text-foreground">{company.rating}</span>
            <span className="text-xs text-muted-foreground">({company.projectsCompleted} projects)</span>
          </div>
        )}
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{company.description}</p>
        
        {/* Stats */}
        <div className="flex items-center gap-6 text-xs text-muted-foreground mb-4 flex-wrap justify-center">
          {company.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{company.location}</span>
            </div>
          )}
          {company.size && (
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{company.size}</span>
            </div>
          )}
          {isTalentSeeker && company.openPositions > 0 && (
            <div className="flex items-center gap-1 text-accent font-medium">
              <Briefcase className="h-3 w-3" />
              <span>{company.openPositions} jobs</span>
            </div>
          )}
          {isServiceProvider && company.projectsCompleted && (
            <div className="flex items-center gap-1 text-primary font-medium">
              <Award className="h-3 w-3" />
              <span>{company.projectsCompleted}+ projects</span>
            </div>
          )}
        </div>
        
        {/* Service Provider: Services */}
        {isServiceProvider && company.services && company.services.length > 0 && (
          <div className="mb-4 w-full">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Services Offered:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {company.services.slice(0, 3).map((service, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/20"
                >
                  {service}
                </span>
              ))}
              {company.services.length > 3 && (
                <span className="px-2 py-1 text-xs font-medium rounded-md bg-muted/30 text-muted-foreground">
                  +{company.services.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Talent Seeker: Employment Types */}
        {isTalentSeeker && company.employmentTypes && company.employmentTypes.length > 0 && (
          <div className="mb-4 w-full">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Hiring For:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {company.employmentTypes.map((type, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium rounded-md bg-accent/10 text-accent border border-accent/20"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Industries (shown for both types but limited) */}
        {company.industries && company.industries.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {company.industries.slice(0, 2).map((industry, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium rounded-md bg-white/5 text-gray-400 border border-white/10"
              >
                {industry}
              </span>
            ))}
          </div>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/company/${company.id}`)}
          className="w-full bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50 transition-smooth"
        >
          {isServiceProvider ? 'View Services' : 'View Jobs'}
        </Button>
      </div>
    </div>
  );
};
