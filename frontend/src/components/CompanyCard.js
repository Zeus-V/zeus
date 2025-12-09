import { MapPin, Users, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';

export const CompanyCard = ({ company }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  return (
    <div className="glass rounded-xl p-6 hover:shadow-glass-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in">
      <div className="flex flex-col items-center text-center">
        {/* Logo */}
        <div className="w-20 h-20 rounded-xl overflow-hidden mb-4 glass-subtle">
          <img
            src={company.logo}
            alt={company.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2">{company.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{company.description}</p>
        
        {/* Stats */}
        <div className="flex items-center gap-6 text-xs text-muted-foreground mb-4">
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
          {company.openPositions && (
            <div className="flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              <span>{company.openPositions} jobs</span>
            </div>
          )}
        </div>
        
        {/* Industries */}
        {company.industries && company.industries.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {company.industries.slice(0, 3).map((industry, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary"
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
          className="w-full"
        >
          {t('viewProfile')}
        </Button>
      </div>
    </div>
  );
};
