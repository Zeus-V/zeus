import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, MicOff, Sparkles, Loader2, AlertCircle, Briefcase, Users, Building2 } from 'lucide-react';
import { Button } from './ui/button';
import { mockJobs, mockProfiles, mockCompanies } from '../data/mockData';

export const AIAssistant = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [resultType, setResultType] = useState(null);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setInputText(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError('Voice recognition failed. Please try typing instead.');
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      setError('Voice recognition not supported in this browser.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setError(null);
      setInputText('');
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const parseIntent = (input) => {
    const lowerInput = input.toLowerCase();

    // Job search patterns
    if (lowerInput.match(/job|position|hiring|vacancy|work|opening/)) {
      return {
        type: 'jobs',
        role: extractRole(input),
        location: extractLocation(input),
        employmentType: extractEmploymentType(input)
      };
    }

    // Talent search patterns
    if (lowerInput.match(/find.*people|looking for.*professional|hire.*freelance|find.*expert|architect|engineer|modeler/)) {
      return {
        type: 'talent',
        role: extractRole(input),
        skill: extractSkills(input)
      };
    }

    // Service provider patterns
    if (lowerInput.match(/company|companies|consultant|consulting|service|provider|firm|training|implementation/)) {
      return {
        type: 'services',
        service: extractService(input),
        location: extractLocation(input)
      };
    }

    // Default to jobs if unclear
    return {
      type: 'jobs',
      query: input
    };
  };

  const extractRole = (input) => {
    const roles = ['bim manager', 'bim coordinator', 'architect', 'engineer', 'modeler', 'mep', 'structural'];
    const found = roles.find(role => input.toLowerCase().includes(role));
    return found || null;
  };

  const extractLocation = (input) => {
    const locations = ['bangkok', 'chiang mai', 'phuket', 'pattaya'];
    const found = locations.find(loc => input.toLowerCase().includes(loc));
    return found || null;
  };

  const extractEmploymentType = (input) => {
    if (input.toLowerCase().includes('freelance')) return 'Freelance';
    if (input.toLowerCase().includes('contract')) return 'Contract';
    if (input.toLowerCase().includes('full-time') || input.toLowerCase().includes('full time')) return 'Full-time';
    return null;
  };

  const extractSkills = (input) => {
    const skills = ['revit', 'navisworks', 'autocad', 'bim 360', 'archicad'];
    const found = skills.find(skill => input.toLowerCase().includes(skill));
    return found || null;
  };

  const extractService = (input) => {
    const services = ['consulting', 'training', 'implementation', 'scan to bim', 'clash detection'];
    const found = services.find(service => input.toLowerCase().includes(service));
    return found || null;
  };

  const searchData = (intent) => {
    const { type } = intent;

    if (type === 'jobs') {
      let filtered = mockJobs;
      
      if (intent.role) {
        filtered = filtered.filter(job =>
          job.title.toLowerCase().includes(intent.role.toLowerCase())
        );
      }
      
      if (intent.location) {
        filtered = filtered.filter(job =>
          job.location.toLowerCase().includes(intent.location.toLowerCase())
        );
      }
      
      if (intent.employmentType) {
        filtered = filtered.filter(job =>
          job.type === intent.employmentType
        );
      }
      
      return filtered.slice(0, 6);
    }

    if (type === 'talent') {
      let filtered = mockProfiles;
      
      if (intent.role) {
        filtered = filtered.filter(profile =>
          profile.role.toLowerCase().includes(intent.role.toLowerCase())
        );
      }
      
      if (intent.skill) {
        filtered = filtered.filter(profile =>
          profile.skills.some(skill => skill.toLowerCase().includes(intent.skill.toLowerCase()))
        );
      }
      
      return filtered.slice(0, 6);
    }

    if (type === 'services') {
      let filtered = mockCompanies.filter(c => c.companyType === 'service_provider');
      
      if (intent.service) {
        filtered = filtered.filter(company =>
          company.services && company.services.some(service =>
            service.toLowerCase().includes(intent.service.toLowerCase())
          )
        );
      }
      
      if (intent.location) {
        filtered = filtered.filter(company =>
          company.location.toLowerCase().includes(intent.location.toLowerCase())
        );
      }
      
      return filtered.slice(0, 6);
    }

    return [];
  };

  const handleSearch = () => {
    if (!inputText.trim()) return;

    setError(null);
    setIsProcessing(true);
    setResults(null);

    // Simulate AI processing delay
    setTimeout(() => {
      try {
        const intent = parseIntent(inputText);
        const searchResults = searchData(intent);
        
        setResults(searchResults);
        setResultType(intent.type);
        setIsProcessing(false);
      } catch (err) {
        setError('Failed to process your request. Please try again.');
        setIsProcessing(false);
      }
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isProcessing) {
      handleSearch();
    }
  };

  const exampleQueries = [
    { text: "Find BIM manager jobs in Bangkok", icon: Briefcase },
    { text: "Show me Revit experts", icon: Users },
    { text: "BIM consulting companies", icon: Building2 }
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full construction-glass mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Search</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 tech-heading high-contrast">
            BIM AI Assistant
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ask me anything about BIM jobs, talent, or services in natural language
          </p>
        </div>

        {/* Main Search Interface */}
        <div className="construction-glass-strong rounded-2xl p-6 sm:p-8 mb-6 animate-fade-in">
          {/* Input Area */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., 'Find me a BIM manager job in Bangkok' or 'Show freelance architects'"
                disabled={isRecording || isProcessing}
                className="w-full pl-12 pr-32 py-4 bg-muted/50 rounded-xl border-2 border-border focus:border-primary outline-none transition-smooth text-foreground placeholder:text-muted-foreground text-base"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              
              {/* Character count */}
              {inputText.length > 0 && (
                <span className="absolute right-24 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
                  {inputText.length}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleSearch}
              disabled={!inputText.trim() || isProcessing || isRecording}
              className="flex-1 bg-primary hover:bg-primary/90 tech-shadow text-base py-6"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Search with AI
                </>
              )}
            </Button>

            <Button
              onClick={toggleRecording}
              disabled={isProcessing}
              className={`px-6 py-6 transition-all ${
                isRecording
                  ? 'bg-accent hover:bg-accent/90 animate-pulse'
                  : 'bg-muted hover:bg-muted/80 text-foreground'
              }`}
            >
              {isRecording ? (
                <>
                  <MicOff className="h-5 w-5 sm:mr-2" />
                  <span className="hidden sm:inline">Stop</span>
                </>
              ) : (
                <>
                  <Mic className="h-5 w-5 sm:mr-2" />
                  <span className="hidden sm:inline">Voice</span>
                </>
              )}
            </Button>
          </div>

          {/* Recording Indicator */}
          {isRecording && (
            <div className="mt-4 flex items-center gap-2 text-accent animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium">Listening... speak clearly</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3 animate-fade-in">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </div>

        {/* Example Queries */}
        {!results && !isProcessing && (
          <div className="mb-6 animate-fade-in">
            <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {exampleQueries.map((example, index) => {
                const Icon = example.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setInputText(example.text)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-all"
                  >
                    <Icon className="h-4 w-4" />
                    {example.text}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Processing State */}
        {isProcessing && (
          <div className="text-center py-12 construction-glass rounded-2xl animate-fade-in">
            <Loader2 className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
            <p className="text-lg text-foreground font-medium mb-2">Processing your request...</p>
            <p className="text-sm text-muted-foreground">AI is analyzing your query</p>
          </div>
        )}

        {/* Results */}
        {results && !isProcessing && (
          <div className="animate-fade-in">
            {results.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">
                    Found <span className="text-primary font-semibold">{results.length}</span> results for "{inputText}"
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setResults(null);
                      setInputText('');
                    }}
                    className="text-xs"
                  >
                    New Search
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.map((result, index) => (
                    <ResultCard
                      key={index}
                      result={result}
                      type={resultType}
                      navigate={navigate}
                    />
                  ))}
                </div>

                {results.length >= 6 && (
                  <div className="text-center mt-6">
                    <Button
                      onClick={() => {
                        if (resultType === 'jobs') navigate('/find-jobs');
                        else if (resultType === 'talent') navigate('/find-talent');
                        else if (resultType === 'services') navigate('/companies');
                      }}
                      className="bg-primary hover:bg-primary/90"
                    >
                      View All Results
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 construction-glass rounded-2xl">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-lg text-foreground font-medium mb-2">No results found</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Try adjusting your search or browse our categories
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={() => navigate('/find-jobs')}>
                    Browse Jobs
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/find-talent')}>
                    Browse Talent
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

// Result Card Component
const ResultCard = ({ result, type, navigate }) => {
  if (type === 'jobs') {
    return (
      <div className="construction-glass rounded-xl p-4 hover:tech-shadow-lg transition-all hover:scale-[1.02] cursor-pointer border border-white/10 hover:border-primary/30"
           onClick={() => navigate(`/job/${result.id}`)}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground text-sm line-clamp-1">{result.title}</h3>
          <Briefcase className="h-4 w-4 text-primary flex-shrink-0" />
        </div>
        <p className="text-xs text-muted-foreground mb-3">{result.company}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">📍 {result.location}</span>
          {result.salary && <span>💰 {result.salary}</span>}
        </div>
        <div className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
          {result.type}
        </div>
      </div>
    );
  }

  if (type === 'talent') {
    return (
      <div className="construction-glass rounded-xl p-4 hover:tech-shadow-lg transition-all hover:scale-[1.02] cursor-pointer border border-white/10 hover:border-primary/30"
           onClick={() => navigate(`/profile/${result.id}`)}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground text-sm">{result.name}</h3>
          <Users className="h-4 w-4 text-primary flex-shrink-0" />
        </div>
        <p className="text-xs text-muted-foreground mb-3">{result.role}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {result.skills.slice(0, 3).map((skill, i) => (
            <span key={i} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md">
              {skill}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">📍 {result.location}</p>
      </div>
    );
  }

  if (type === 'services') {
    return (
      <div className="construction-glass rounded-xl p-4 hover:tech-shadow-lg transition-all hover:scale-[1.02] cursor-pointer border border-white/10 hover:border-primary/30"
           onClick={() => navigate(`/company/${result.id}`)}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground text-sm">{result.name}</h3>
          <Building2 className="h-4 w-4 text-primary flex-shrink-0" />
        </div>
        {result.rating && (
          <p className="text-xs text-muted-foreground mb-2">⭐ {result.rating} ({result.projectsCompleted}+ projects)</p>
        )}
        <div className="flex flex-wrap gap-1 mb-2">
          {result.services && result.services.slice(0, 2).map((service, i) => (
            <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
              {service}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">📍 {result.location}</p>
      </div>
    );
  }

  return null;
};
