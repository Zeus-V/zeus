import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Building2, Users, Wrench, AlertCircle, CheckCircle2, ArrowLeft, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { mockPortfolioProjects, mockProfiles, mockCompanies } from '../data/mockData';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const project = mockPortfolioProjects.find(p => p.id === parseInt(id));
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8">
        <div className="glass-strong rounded-2xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Project Not Found</h2>
          <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }
  
  // Find the creator profile
  const creator = mockProfiles.find(p => p.name === project.author);
  
  // Mock stakeholder companies
  const stakeholders = [
    { name: 'Thai Construction Group', role: 'Main Contractor', logo: mockCompanies[0].logo },
    { name: 'Bangkok Engineering Co.', role: 'MEP Consultant', logo: mockCompanies[1].logo },
    { name: 'Arch Studio Thailand', role: 'Architect', logo: mockCompanies[2].logo }
  ];
  
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        {/* Hero Image */}
        <div className="glass-strong rounded-2xl overflow-hidden mb-8 animate-fade-in">
          <div className="relative h-[500px]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Project Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg glass-strong text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">{project.title}</h1>
              <p className="text-lg text-white/90">{project.description}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Overview */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-6">Project Overview</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {project.title} represents a significant achievement in Building Information Modeling (BIM) 
                  implementation for modern construction projects in Thailand. This project showcases the 
                  integration of advanced BIM technologies and collaborative workflows to deliver exceptional 
                  results in architectural design and coordination.
                </p>
                <p>
                  The project involved comprehensive 3D modeling, clash detection, and coordination across 
                  multiple disciplines including architecture, structure, and MEP systems. Through the use 
                  of industry-leading BIM software and methodologies, the team successfully delivered a 
                  clash-free, construction-ready model that significantly reduced on-site conflicts and 
                  improved construction efficiency.
                </p>
              </div>
            </div>
            
            {/* Modeling & Drawing Tools */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <div className="flex items-center gap-2 mb-6">
                <Wrench className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Modeling & Drawing Tools</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {project.software.map((tool, index) => (
                  <div
                    key={index}
                    className="glass-subtle rounded-lg p-4 text-center hover:shadow-glass transition-smooth"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Wrench className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">{tool}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {tool.includes('Revit') ? '3D Modeling' : 
                       tool.includes('Navisworks') ? 'Coordination' :
                       tool.includes('BIM 360') ? 'Collaboration' :
                       tool.includes('Civil 3D') ? 'Infrastructure' :
                       tool.includes('Enscape') ? 'Visualization' :
                       tool.includes('Lumion') ? 'Rendering' : 'BIM Tool'}
                    </p>
                  </div>
                ))}
                
                {/* Additional common tools */}
                <div className="glass-subtle rounded-lg p-4 text-center hover:shadow-glass transition-smooth">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Wrench className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">AutoCAD</p>
                  <p className="text-xs text-muted-foreground mt-1">2D Documentation</p>
                </div>
              </div>
            </div>
            
            {/* Challenges & Solutions */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-6">Challenges & Solutions</h2>
              
              <div className="space-y-6">
                {/* Challenge */}
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-destructive/10 flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Challenge</h3>
                      <p className="text-muted-foreground">{project.challenges}</p>
                    </div>
                  </div>
                </div>
                
                {/* Solution */}
                <div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-success/10 flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Solution</h3>
                      <p className="text-muted-foreground">{project.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stakeholder Companies */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <div className="flex items-center gap-2 mb-6">
                <Building2 className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Stakeholder Companies</h2>
              </div>
              
              <div className="space-y-4">
                {stakeholders.map((stakeholder, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 glass-subtle rounded-lg hover:shadow-glass transition-smooth"
                  >
                    <img
                      src={stakeholder.logo}
                      alt={stakeholder.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-foreground">{stakeholder.name}</h3>
                      <p className="text-sm text-primary">{stakeholder.role}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Project Team */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <div className="flex items-center gap-2 mb-6">
                <Users className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Project Team</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 glass-subtle rounded-lg">
                  <img
                    src={creator?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'}
                    alt={project.author}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-foreground">{project.author}</h3>
                    <p className="text-sm text-primary">{project.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">BIM Creator & Lead Coordinator</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/profile/${creator?.id || 1}`)}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Information */}
            <div className="glass rounded-2xl p-6 animate-fade-in sticky top-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Project Information</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4" />
                    <span>Completion Date</span>
                  </div>
                  <p className="text-base font-medium text-foreground">{project.completionDate}</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <MapPin className="h-4 w-4" />
                    <span>Location</span>
                  </div>
                  <p className="text-base font-medium text-foreground">Bangkok, Thailand</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Building2 className="h-4 w-4" />
                    <span>Project Type</span>
                  </div>
                  <p className="text-base font-medium text-foreground">{project.tags[0]}</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Users className="h-4 w-4" />
                    <span>BIM Creator</span>
                  </div>
                  <p className="text-base font-medium text-foreground">{project.author}</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border/50">
                <h4 className="text-sm font-semibold text-foreground mb-3">Project Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Contact BIM Creator
                </Button>
              </div>
            </div>
            
            {/* Project Stats */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">Project Statistics</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">BIM Models Created</span>
                  <span className="text-sm font-semibold text-foreground">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Clashes Detected</span>
                  <span className="text-sm font-semibold text-foreground">1,248</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Clashes Resolved</span>
                  <span className="text-sm font-semibold text-success">100%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Team Members</span>
                  <span className="text-sm font-semibold text-foreground">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Project Duration</span>
                  <span className="text-sm font-semibold text-foreground">18 months</span>
                </div>
              </div>
            </div>
            
            {/* Software Used */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">Primary Software</h3>
              
              <div className="space-y-2">
                {project.software.map((tool, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg glass-subtle"
                  >
                    <span className="text-sm text-foreground">{tool}</span>
                    <span className="text-xs text-muted-foreground">
                      {tool.includes('Revit') ? 'Primary' : 'Secondary'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
