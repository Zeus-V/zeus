import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Users, Building2, Briefcase, Globe, Mail, Phone, ArrowLeft, ExternalLink, Calendar, DollarSign } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { JobCard } from '../components/JobCard';
import { PortfolioCard } from '../components/PortfolioCard';
import { mockCompanies, mockJobs, mockPortfolioProjects } from '../data/mockData';

export default function CompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const company = mockCompanies.find(c => c.id === parseInt(id));
  
  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8">
        <div className="glass-strong rounded-2xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Company Not Found</h2>
          <p className="text-muted-foreground mb-6">The company you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/companies')}>
            Back to Companies
          </Button>
        </div>
      </div>
    );
  }
  
  // Get jobs from this company
  const companyJobs = mockJobs.filter(job => job.company === company.name);
  
  // Get some portfolio projects
  const companyProjects = mockPortfolioProjects.slice(0, 4);
  
  // Mock company benefits and values
  const benefits = [
    { title: 'Competitive Salary', description: 'Industry-leading compensation packages' },
    { title: 'Health Insurance', description: 'Comprehensive health and dental coverage' },
    { title: 'Flexible Hours', description: 'Work-life balance with flexible scheduling' },
    { title: 'Professional Development', description: 'Training and certification support' },
    { title: 'Modern Office', description: 'State-of-the-art facilities and equipment' },
    { title: 'Team Activities', description: 'Regular team building and social events' }
  ];
  
  const companyValues = [
    'Innovation & Technology Excellence',
    'Safety & Quality First',
    'Sustainable Building Practices',
    'Collaborative Culture',
    'Continuous Learning'
  ];
  
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/companies')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Companies
        </Button>
        
        {/* Company Header */}
        <div className="glass-strong rounded-2xl p-8 mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Company Logo */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-2xl overflow-hidden glass-subtle">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Company Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{company.name}</h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    {company.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{company.location}</span>
                      </div>
                    )}
                    {company.size && (
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{company.size} employees</span>
                      </div>
                    )}
                    {company.openPositions && (
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        <span className="font-medium text-primary">{company.openPositions} open positions</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Follow Button */}
                <Button className="bg-primary hover:bg-primary/90 whitespace-nowrap">
                  Follow Company
                </Button>
              </div>
              
              {/* Description */}
              <p className="text-muted-foreground mb-6">{company.description}</p>
              
              {/* Industries */}
              {company.industries && company.industries.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Industries</h3>
                  <div className="flex flex-wrap gap-2">
                    {company.industries.map((industry, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 text-sm font-medium rounded-lg bg-primary/10 text-primary"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Company */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-4">About {company.name}</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {company.name} is a leading organization in the construction and BIM industry, 
                  dedicated to delivering exceptional projects across Thailand. With a strong focus 
                  on innovation and technology, we leverage Building Information Modeling to streamline 
                  project delivery and enhance collaboration.
                </p>
                <p>
                  Our team of experienced professionals works on diverse projects ranging from 
                  commercial developments to infrastructure projects. We pride ourselves on our 
                  commitment to quality, safety, and sustainable building practices.
                </p>
                <p>
                  As a {company.size} employee company based in {company.location}, we offer a 
                  collaborative work environment where professionals can grow their careers and 
                  contribute to meaningful projects that shape Thailand's skyline.
                </p>
              </div>
            </div>
            
            {/* Company Values */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-6">Our Values</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {companyValues.map((value, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 glass-subtle rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Benefits & Perks */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-6">Benefits & Perks</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="p-4 glass-subtle rounded-lg hover:shadow-glass transition-smooth"
                  >
                    <h3 className="text-base font-semibold text-foreground mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Open Positions */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Open Positions ({companyJobs.length})
                </h2>
                <Button variant="outline" size="sm" className="glass">
                  View All Jobs
                </Button>
              </div>
              
              {companyJobs.length > 0 ? (
                <div className="space-y-4">
                  {companyJobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 glass-subtle rounded-xl">
                  <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No open positions at the moment</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Follow this company to get notified when new positions open
                  </p>
                </div>
              )}
            </div>
            
            {/* Company Projects */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Featured Projects</h2>
                <span className="text-sm text-muted-foreground">
                  {companyProjects.length} Projects
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {companyProjects.map((project) => (
                  <PortfolioCard key={project.id} project={project} height="250px" />
                ))}
              </div>
            </div>
            
            {/* Google Maps Location */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Our Location</h2>
              </div>
              
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">{company.name}</p>
                  <p>123 Sukhumvit Road, Khlong Toei</p>
                  <p>{company.location}, 10110</p>
                  <p>Thailand</p>
                </div>
                
                {/* Google Maps Embed */}
                <div className="relative w-full h-[400px] rounded-xl overflow-hidden glass-subtle">
                  <iframe
                    title={`${company.name} Location`}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.9747919439317!2d100.55924431483044!3d13.736717190353844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ee109d8f4e3%3A0x2b2a12e0ec4b857c!2sSukhumvit%20Rd%2C%20Khlong%20Toei%2C%20Bangkok%2010110!5e0!3m2!1sen!2sth!4v1234567890123!5m2!1sen!2sth"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                  />
                  
                  {/* Fallback for map loading error */}
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/10 pointer-events-none">
                    <div className="text-center p-4">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2 opacity-20" />
                    </div>
                  </div>
                </div>
                
                {/* Direction Link */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.name + ' ' + company.location + ' Thailand')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-smooth"
                >
                  <ExternalLink className="h-4 w-4" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Company Information */}
            <div className="glass rounded-2xl p-6 animate-fade-in sticky top-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Company Information</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Building2 className="h-4 w-4" />
                    <span>Company Size</span>
                  </div>
                  <p className="text-base font-medium text-foreground">{company.size} employees</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <MapPin className="h-4 w-4" />
                    <span>Headquarters</span>
                  </div>
                  <p className="text-base font-medium text-foreground">{company.location}</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4" />
                    <span>Founded</span>
                  </div>
                  <p className="text-base font-medium text-foreground">2010</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Briefcase className="h-4 w-4" />
                    <span>Open Positions</span>
                  </div>
                  <p className="text-base font-medium text-primary">{company.openPositions} jobs</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border/50">
                <h4 className="text-sm font-semibold text-foreground mb-3">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      hr@{company.name.toLowerCase().replace(/\s+/g, '')}.com
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">+66 2 XXX XXXX</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a href="#" className="text-primary hover:text-primary/80 transition-smooth">
                      www.{company.name.toLowerCase().replace(/\s+/g, '')}.com
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact HR
                </Button>
              </div>
            </div>
            
            {/* Company Stats */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">Company Statistics</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Projects</span>
                  <span className="text-sm font-semibold text-foreground">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Completed Projects</span>
                  <span className="text-sm font-semibold text-foreground">247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Employees</span>
                  <span className="text-sm font-semibold text-foreground">{company.size}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">BIM Professionals</span>
                  <span className="text-sm font-semibold text-primary">45</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Years in Business</span>
                  <span className="text-sm font-semibold text-foreground">14+</span>
                </div>
              </div>
            </div>
            
            {/* Hiring Process */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">Hiring Process</h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">1</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Application Review</p>
                    <p className="text-xs text-muted-foreground mt-1">1-2 days</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">2</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Phone Screening</p>
                    <p className="text-xs text-muted-foreground mt-1">30 minutes</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">3</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Technical Interview</p>
                    <p className="text-xs text-muted-foreground mt-1">1-2 hours</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">4</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Final Interview</p>
                    <p className="text-xs text-muted-foreground mt-1">1 hour</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-success">5</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Offer</p>
                    <p className="text-xs text-muted-foreground mt-1">Within 1 week</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">Connect With Us</h3>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start glass">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
                <Button variant="outline" className="w-full justify-start glass">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
                <Button variant="outline" className="w-full justify-start glass">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Website
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
