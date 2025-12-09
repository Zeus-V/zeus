import { useState } from 'react';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PortfolioCard = ({ project, height = 'auto' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div
      className="group relative overflow-hidden rounded-xl glass cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-glass-lg animate-fade-in"
      style={{ height }}
      onClick={() => navigate(`/portfolio/${project.id}`)}
    >
      {/* Image */}
      <div className="relative w-full h-full overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
            <p className="text-sm text-white/80 line-clamp-2 mb-3">{project.description}</p>
            
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Eye className="h-3 w-3" />
              <span>View Details</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tags - Visible on hover */}
      {project.tags && project.tags.length > 0 && (
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium rounded-md glass-strong text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
