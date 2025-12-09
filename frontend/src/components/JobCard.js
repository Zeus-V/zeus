import { MapPin, Clock, DollarSign, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';

export const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isSaved, setIsSaved] = useState(false);
  
  const handleSave = (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'full-time':
        return 'bg-success/10 text-success';
      case 'freelance':
        return 'bg-primary/10 text-primary';
      case 'contract':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  
  return (
    <div
      className="glass rounded-xl p-6 hover:shadow-glass-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer animate-fade-in"
      onClick={() => navigate(`/job/${job.id}`)}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex gap-4 flex-1 min-w-0">
          {/* Company Logo */}
          {job.companyLogo && (
            <div className="flex-shrink-0">
              <img
                src={job.companyLogo}
                alt={job.company}
                className="w-12 h-12 rounded-lg object-cover"
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-1">{job.title}</h3>
            <p className="text-sm text-muted-foreground">{job.company}</p>
          </div>
        </div>
        
        {/* Save Button */}
        <button
          onClick={handleSave}
          className="p-2 rounded-lg glass-subtle hover:glass transition-smooth flex-shrink-0"
        >
          <Bookmark className={`h-5 w-5 ${
            isSaved ? 'fill-primary text-primary' : 'text-muted-foreground'
          }`} />
        </button>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{job.description}</p>
      
      {/* Job Details */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
        {job.location && (
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{job.location}</span>
          </div>
        )}
        {job.salary && (
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            <span>{job.salary}</span>
          </div>
        )}
        {job.postedAt && (
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{job.postedAt}</span>
          </div>
        )}
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-2 py-1 text-xs font-medium rounded-md ${getTypeColor(job.type)}`}>
          {t(job.type.replace('-', ''))}
        </span>
        {job.workMode && (
          <span className="px-2 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground">
            {t(job.workMode)}
          </span>
        )}
      </div>
      
      {/* Required Skills */}
      {job.skills && job.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="px-2 py-1 text-xs font-medium text-muted-foreground">
              +{job.skills.length - 4}
            </span>
          )}
        </div>
      )}
      
      {/* Action */}
      <Button
        variant="default"
        size="sm"
        className="w-full bg-primary hover:bg-primary/90"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/job/${job.id}`);
        }}
      >
        {t('applyNow')}
      </Button>
    </div>
  );
};
