import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Briefcase, 
  Calendar, 
  Users, 
  Building2,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Bookmark,
  Send
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { mockJobs, mockCompanies } from '../data/mockData';
import { toast } from 'sonner';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [isSaved, setIsSaved] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    coverLetter: '',
    resume: null,
    portfolio: '',
    yearsExperience: '',
    expectedSalary: '',
    availableFrom: ''
  });

  const job = mockJobs.find(j => j.id === parseInt(id));
  const company = mockCompanies.find(c => c.name === job?.company);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8">
        <div className="glass-strong rounded-2xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Job Not Found</h2>
          <p className="text-muted-foreground mb-6">The job you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/find-jobs')}>
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  // Extended job details (in real app, would come from API)
  const jobDetails = {
    ...job,
    applicationDeadline: '2024-02-28',
    openings: 2,
    experienceLevel: 'Mid-Level (5-8 years)',
    responsibilities: [
      'Lead BIM coordination efforts for major commercial construction projects',
      'Develop and maintain BIM execution plans and project standards',
      'Conduct regular clash detection and coordination meetings',
      'Manage and mentor a team of BIM modelers and coordinators',
      'Collaborate with architects, engineers, and contractors throughout project lifecycle',
      'Ensure model quality and adherence to BIM standards and protocols',
      'Provide technical guidance on Revit, Navisworks, and BIM 360 platforms',
      'Generate construction documentation and shop drawings from BIM models'
    ],
    requiredQualifications: [
      "Bachelor's degree in Architecture, Engineering, or related field",
      "Minimum 5 years of experience in BIM coordination or management",
      "Expert knowledge of Autodesk Revit, Navisworks, and BIM 360",
      "Strong understanding of construction documentation and building systems",
      "Proven experience in clash detection and coordination",
      "Excellent leadership and team management skills",
      "Strong communication skills in English and Thai",
      "Ability to work under pressure and meet tight deadlines"
    ],
    preferredQualifications: [
      "Autodesk Certified Professional in Revit",
      "Experience with Dynamo for workflow automation",
      "Knowledge of ISO 19650 BIM standards",
      "Experience with infrastructure projects (Civil 3D, InfraWorks)",
      "Familiarity with Lean Construction principles",
      "Previous experience in high-rise or large-scale projects",
      "Green building certification (LEED, TREES, etc.)"
    ],
    benefits: [
      "Competitive salary package with performance bonuses",
      "Comprehensive health and dental insurance",
      "Annual training and certification budget",
      "Flexible working hours with hybrid work options",
      "Modern office with latest BIM workstations",
      "Career development and growth opportunities",
      "Annual company trips and team building activities",
      "Provident fund and retirement planning"
    ],
    companyOverview: `${job.company} is a leading construction and engineering company in Thailand with over 14 years of experience delivering world-class projects. We specialize in commercial, residential, and infrastructure developments using cutting-edge BIM technology and sustainable building practices. 

Our team of 500+ professionals works on diverse projects ranging from high-rise buildings to large-scale infrastructure. We pride ourselves on innovation, quality, and our commitment to professional development. Join us to work on exciting projects that shape Thailand's skyline.`,
    workingHours: '8:30 AM - 5:30 PM (Monday - Friday)',
    reportingTo: 'BIM Director',
    teamSize: '12 BIM professionals',
    projectTypes: ['Commercial High-Rise', 'Mixed-Use Development', 'Infrastructure']
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Job removed from saved' : 'Job saved successfully');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: `Check out this job: ${job.title} at ${job.company}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share failed', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Job link copied to clipboard');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setApplicationData(prev => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to apply');
      navigate('/login');
      return;
    }

    // In real app, would send to API
    toast.success('Application submitted successfully!');
    setShowApplicationForm(false);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/find-jobs')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <div className="glass-strong rounded-2xl p-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                {/* Company Logo */}
                {job.companyLogo && (
                  <div className="flex-shrink-0">
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-foreground mb-2">{job.title}</h1>
                  <p className="text-xl text-primary font-semibold mb-4">{job.company}</p>
                  
                  {/* Job Meta */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{t(job.type.replace('-', ''))}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{job.postedAt}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{job.applicants} applicants</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 flex-1 sm:flex-none"
                  onClick={() => setShowApplicationForm(true)}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {t('applyNow')}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleSave}
                  className="glass"
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-primary text-primary' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShare}
                  className="glass"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Job Description */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-4">Job Description</h2>
              <p className="text-muted-foreground leading-relaxed">{job.description}</p>
            </div>

            {/* Key Responsibilities */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-4">Key Responsibilities</h2>
              <ul className="space-y-3">
                {jobDetails.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Qualifications */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-4">Required Qualifications</h2>
              <ul className="space-y-3">
                {jobDetails.requiredQualifications.map((qual, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{qual}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preferred Qualifications */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-4">Preferred Qualifications</h2>
              <ul className="space-y-3">
                {jobDetails.preferredQualifications.map((qual, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary/50 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{qual}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-4">Benefits & Perks</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {jobDetails.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 glass-subtle rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Overview */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-4">About {job.company}</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line mb-6">
                {jobDetails.companyOverview}
              </p>
              {company && (
                <Button
                  variant="outline"
                  onClick={() => navigate(`/company/${company.id}`)}
                  className="glass"
                >
                  View Company Profile
                </Button>
              )}
            </div>

            {/* Application Form */}
            {showApplicationForm && (
              <div className="glass rounded-2xl p-6 animate-fade-in">
                <h2 className="text-2xl font-bold text-foreground mb-6">Submit Your Application</h2>
                
                <form onSubmit={handleSubmitApplication} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={applicationData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 glass rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={applicationData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 glass rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={applicationData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 glass rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground"
                        placeholder="+66 X XXXX XXXX"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="yearsExperience" className="block text-sm font-medium text-foreground mb-2">
                        Years of Experience *
                      </label>
                      <input
                        type="number"
                        id="yearsExperience"
                        name="yearsExperience"
                        value={applicationData.yearsExperience}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full px-4 py-3 glass rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expectedSalary" className="block text-sm font-medium text-foreground mb-2">
                        Expected Salary (฿/month)
                      </label>
                      <input
                        type="number"
                        id="expectedSalary"
                        name="expectedSalary"
                        value={applicationData.expectedSalary}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 glass rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="availableFrom" className="block text-sm font-medium text-foreground mb-2">
                        Available From
                      </label>
                      <input
                        type="date"
                        id="availableFrom"
                        name="availableFrom"
                        value={applicationData.availableFrom}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 glass rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="portfolio" className="block text-sm font-medium text-foreground mb-2">
                      Portfolio / LinkedIn URL
                    </label>
                    <input
                      type="url"
                      id="portfolio"
                      name="portfolio"
                      value={applicationData.portfolio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 glass rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label htmlFor="resume" className="block text-sm font-medium text-foreground mb-2">
                      Resume / CV * (PDF, DOC, DOCX - Max 5MB)
                    </label>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      required
                      className="w-full px-4 py-3 glass rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                  </div>

                  <div>
                    <label htmlFor="coverLetter" className="block text-sm font-medium text-foreground mb-2">
                      Cover Letter / Message *
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      value={applicationData.coverLetter}
                      onChange={handleInputChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 glass rounded-lg border border-border focus:border-primary outline-none transition-smooth text-foreground resize-none"
                      placeholder="Tell us why you're a great fit for this position..."
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowApplicationForm(false)}
                      className="flex-1 glass"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      Submit Application
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Summary */}
            <div className="glass rounded-2xl p-6 animate-fade-in sticky top-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Job Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span>Salary</span>
                  </div>
                  <p className="text-base font-medium text-foreground">{job.salary}</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Briefcase className="h-4 w-4" />
                    <span>Experience Level</span>
                  </div>
                  <p className="text-base font-medium text-foreground">{jobDetails.experienceLevel}</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <MapPin className="h-4 w-4" />
                    <span>Work Mode</span>
                  </div>
                  <p className="text-base font-medium text-foreground">{job.workMode ? t(job.workMode) : 'On-site'}</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4" />
                    <span>Application Deadline</span>
                  </div>
                  <p className="text-base font-medium text-foreground">
                    {new Date(jobDetails.applicationDeadline).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Building2 className="h-4 w-4" />
                    <span>Openings</span>
                  </div>
                  <p className="text-base font-medium text-foreground">{jobDetails.openings} positions</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Users className="h-4 w-4" />
                    <span>Team Size</span>
                  </div>
                  <p className="text-base font-medium text-foreground">{jobDetails.teamSize}</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Clock className="h-4 w-4" />
                    <span>Working Hours</span>
                  </div>
                  <p className="text-base font-medium text-foreground">{jobDetails.workingHours}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border/50">
                <h4 className="text-sm font-semibold text-foreground mb-3">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <Button
                  onClick={() => setShowApplicationForm(true)}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Apply for this Job
                </Button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p><strong className="text-foreground">HR Department</strong></p>
                <p>Email: hr@{job.company.toLowerCase().replace(/\s+/g, '')}.com</p>
                <p>Phone: +66 2 XXX XXXX</p>
                <p>Office Hours: Monday - Friday, 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
