import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, Star, Mail, Phone, Calendar, Award, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { PortfolioCard } from '../components/PortfolioCard';
import { mockProfiles, mockPortfolioProjects } from '../data/mockData';

export default function ProfileDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const profile = mockProfiles.find(p => p.id === parseInt(id));
  
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8">
        <div className="glass-strong rounded-2xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Profile Not Found</h2>
          <p className="text-muted-foreground mb-6">The profile you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/find-talent')}>
            Back to Find Talent
          </Button>
        </div>
      </div>
    );
  }
  
  // Get some portfolio projects for this profile
  const portfolioProjects = mockPortfolioProjects.filter(p => p.author === profile.name).slice(0, 4);
  
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/find-talent')}
          className="mb-6"
        >
          ← Back to Find Talent
        </Button>
        
        {/* Profile Header */}
        <div className="glass-strong rounded-2xl p-8 mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-32 h-32 rounded-2xl object-cover"
              />
            </div>
            
            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{profile.name}</h1>
                  <p className="text-xl text-primary font-semibold mb-2">{profile.role}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    {profile.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{profile.location}</span>
                      </div>
                    )}
                    {profile.experience && (
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{profile.experience} years experience</span>
                      </div>
                    )}
                    {profile.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium text-foreground">{profile.rating} Rating</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Contact Button */}
                <Button className="bg-primary hover:bg-primary/90 whitespace-nowrap">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              </div>
              
              {/* Bio */}
              <p className="text-muted-foreground mb-6">{profile.bio}</p>
              
              {/* Skills */}
              {profile.skills && profile.skills.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">{t('skills')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 text-sm font-medium rounded-lg bg-primary/10 text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Tabs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('about')}</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {profile.name} is a highly skilled {profile.role} with {profile.experience} years of experience 
                  in the BIM industry. Specialized in delivering high-quality BIM coordination and modeling services 
                  for large-scale construction projects across Thailand.
                </p>
                <p>
                  With expertise in industry-leading software including {profile.skills.slice(0, 3).join(', ')}, 
                  {profile.name} has successfully contributed to numerous commercial, residential, and infrastructure projects.
                </p>
              </div>
            </div>
            
            {/* Experience Section */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t('experience')}</h2>
              <div className="space-y-6">
                {/* Experience Item 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{profile.role}</h3>
                    <p className="text-sm text-primary font-medium mb-1">Thai Construction Group</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />
                      <span>2020 - Present · 4 years</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Leading BIM coordination efforts for major commercial projects. Managing team of modelers 
                      and ensuring clash-free designs across multiple disciplines.
                    </p>
                  </div>
                </div>
                
                {/* Experience Item 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">BIM Coordinator</h3>
                    <p className="text-sm text-primary font-medium mb-1">Bangkok Engineering Co.</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />
                      <span>2018 - 2020 · 2 years</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Coordinated MEP systems for high-rise buildings. Performed clash detection and resolution 
                      using Navisworks and BIM 360.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Portfolio Section */}
            {portfolioProjects.length > 0 && (
              <div className="glass rounded-2xl p-6 animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">{t('portfolio')}</h2>
                  <span className="text-sm text-muted-foreground">
                    {profile.portfolioCount || portfolioProjects.length} Projects
                  </span>
                </div>
                
                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {portfolioProjects.map((project) => (
                    <PortfolioCard key={project.id} project={project} height="250px" />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Certifications */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                {t('certifications')}
              </h3>
              <div className="space-y-3">
                <div className="p-3 glass-subtle rounded-lg">
                  <p className="text-sm font-medium text-foreground">Autodesk Certified Professional</p>
                  <p className="text-xs text-muted-foreground">Revit Architecture</p>
                </div>
                <div className="p-3 glass-subtle rounded-lg">
                  <p className="text-sm font-medium text-foreground">BIM Manager Certification</p>
                  <p className="text-xs text-muted-foreground">BuildingSMART</p>
                </div>
                <div className="p-3 glass-subtle rounded-lg">
                  <p className="text-sm font-medium text-foreground">ISO 19650 Certified</p>
                  <p className="text-xs text-muted-foreground">BIM Information Management</p>
                </div>
              </div>
            </div>
            
            {/* Education */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">{t('education')}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Bachelor of Architecture</p>
                  <p className="text-xs text-primary">Chulalongkorn University</p>
                  <p className="text-xs text-muted-foreground">2014 - 2018</p>
                </div>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">{t('contact')}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {profile.name.toLowerCase().replace(' ', '.')}@email.com
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">+66 8X XXX XXXX</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  <a href="#" className="text-primary hover:text-primary/80 transition-smooth">
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Projects Completed</span>
                  <span className="text-sm font-semibold text-foreground">{profile.portfolioCount || 25}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Experience</span>
                  <span className="text-sm font-semibold text-foreground">{profile.experience} years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Client Rating</span>
                  <span className="text-sm font-semibold text-foreground">{profile.rating}/5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
