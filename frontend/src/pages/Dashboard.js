import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Briefcase, Users, TrendingUp, Clock, CheckCircle, XCircle, BarChart3 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { mockApplications, mockProfiles, mockJobs } from '../data/mockData';

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState('overview');
  
  // Mock applications with candidate details
  const applications = mockApplications.map(app => ({
    ...app,
    candidate: mockProfiles.find(p => p.id === app.candidateId),
    job: mockJobs.find(j => j.id === app.jobId)
  }));
  
  const stats = [
    { label: 'Active Jobs', value: '12', icon: Briefcase, color: 'text-primary' },
    { label: 'Total Applications', value: '156', icon: Users, color: 'text-success' },
    { label: 'Interviews Scheduled', value: '8', icon: Clock, color: 'text-warning' },
    { label: 'Hires This Month', value: '4', icon: TrendingUp, color: 'text-primary' }
  ];
  
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('dashboard')}
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || 'User'}
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="glass rounded-xl p-6 hover:shadow-glass-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-primary/10`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
        
        {/* Tabs */}
        <div className="glass-strong rounded-2xl p-6 animate-fade-in">
          <div className="flex gap-4 mb-6 border-b border-border/50 pb-4 overflow-x-auto">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth whitespace-nowrap ${
                selectedTab === 'overview'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedTab('candidates')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth whitespace-nowrap ${
                selectedTab === 'candidates'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
              }`}
            >
              {t('candidates')}
            </button>
            <button
              onClick={() => setSelectedTab('analytics')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth whitespace-nowrap ${
                selectedTab === 'analytics'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
              }`}
            >
              {t('analytics')}
            </button>
          </div>
          
          {/* Tab Content */}
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Applications</h3>
                <div className="space-y-4">
                  {applications.slice(0, 5).map(app => (
                    <div key={app.id} className="glass rounded-lg p-4 hover:shadow-glass transition-smooth">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-3 flex-1">
                          <img
                            src={app.candidate.avatar}
                            alt={app.candidate.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="font-semibold text-foreground">{app.candidate.name}</h4>
                            <p className="text-sm text-muted-foreground">{app.job.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">Applied {app.appliedDate}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${
                            app.status === 'shortlisted'
                              ? 'bg-success/10 text-success'
                              : app.status === 'rejected'
                              ? 'bg-destructive/10 text-destructive'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {selectedTab === 'candidates' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Candidate Analysis</h3>
                <Button size="sm" variant="outline" className="glass">
                  Compare Selected
                </Button>
              </div>
              
              {/* Candidate List with Feasibility Analysis */}
              <div className="space-y-4">
                {applications.map(app => (
                  <div key={app.id} className="glass rounded-lg p-6 hover:shadow-glass-lg transition-smooth">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Candidate Info */}
                      <div className="flex gap-4 flex-1">
                        <img
                          src={app.candidate.avatar}
                          alt={app.candidate.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-foreground mb-1">{app.candidate.name}</h4>
                          <p className="text-sm text-primary font-medium mb-2">{app.candidate.role}</p>
                          <div className="flex flex-wrap gap-2">
                            {app.candidate.skills.slice(0, 3).map((skill, idx) => (
                              <span key={idx} className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Feasibility Analysis */}
                      <div className="flex-1 space-y-3">
                        <h5 className="text-sm font-semibold text-foreground mb-3">Feasibility Analysis</h5>
                        
                        {/* Skills Match */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Skills Match</span>
                            <span className="text-xs font-medium text-foreground">{app.skillsMatch}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500"
                              style={{ width: `${app.skillsMatch}%` }}
                            />
                          </div>
                        </div>
                        
                        {/* Experience Score */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Experience Score</span>
                            <span className="text-xs font-medium text-foreground">{app.experienceScore}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-success to-success/80 transition-all duration-500"
                              style={{ width: `${app.experienceScore}%` }}
                            />
                          </div>
                        </div>
                        
                        {/* Portfolio Quality */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Portfolio Quality</span>
                            <span className="text-xs font-medium text-foreground">{app.portfolioQuality}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-warning to-warning/80 transition-all duration-500"
                              style={{ width: `${app.portfolioQuality}%` }}
                            />
                          </div>
                        </div>
                        
                        {/* Overall Score */}
                        <div className="pt-2 border-t border-border/50">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">Overall Score</span>
                            <span className="text-lg font-bold text-primary">
                              {Math.round((app.skillsMatch + app.experienceScore + app.portfolioQuality) / 3)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2 mt-4 pt-4 border-t border-border/50">
                      <Button size="sm" variant="outline" className="flex-1 glass">
                        View Profile
                      </Button>
                      <Button size="sm" className="flex-1 bg-success hover:bg-success/90">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Shortlist
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 glass hover:bg-destructive/10">
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {selectedTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Hiring Analytics</h3>
              
              {/* Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold text-foreground">Application Trends</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">This Month</span>
                      <span className="text-sm font-medium text-foreground">48 applications</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Last Month</span>
                      <span className="text-sm font-medium text-muted-foreground">36 applications</span>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium text-success">+33% increase</span>
                    </div>
                  </div>
                </div>
                
                <div className="glass rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold text-foreground">Conversion Rates</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Application to Interview</span>
                      <span className="text-sm font-medium text-foreground">12%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Interview to Offer</span>
                      <span className="text-sm font-medium text-foreground">65%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Offer Acceptance</span>
                      <span className="text-sm font-medium text-foreground">85%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
