import { MapPin, Briefcase, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';

export const ProfileCard = ({ profile }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  return (
    <div className="glass rounded-xl p-6 hover:shadow-glass-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-20 h-20 rounded-xl object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{profile.name}</h3>
              <p className="text-sm text-primary font-medium">{profile.role}</p>
            </div>
            {profile.rating && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg glass-subtle">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium text-foreground">{profile.rating}</span>
              </div>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{profile.bio}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
            {profile.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.experience && (
              <div className="flex items-center gap-1">
                <Briefcase className="h-3 w-3" />
                <span>{profile.experience} years</span>
              </div>
            )}
          </div>
          
          {/* Skills */}
          {profile.skills && profile.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.skills.slice(0, 5).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary"
                >
                  {skill}
                </span>
              ))}
              {profile.skills.length > 5 && (
                <span className="px-2 py-1 text-xs font-medium text-muted-foreground">
                  +{profile.skills.length - 5} more
                </span>
              )}
            </div>
          )}
          
          {/* Action Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/profile/${profile.id}`)}
            className="w-full sm:w-auto"
          >
            {t('viewProfile')}
          </Button>
        </div>
      </div>
    </div>
  );
};
