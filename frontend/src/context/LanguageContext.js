import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Navigation
    home: 'Home',
    findTalent: 'Find Talent',
    findJobs: 'Find Jobs',
    companies: 'Companies',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    
    // Hero Section
    heroTitle: 'Connect with Top BIM Talent in Thailand',
    heroSubtitle: 'Find skilled BIM professionals or discover your next opportunity in Building Information Modeling',
    searchPlaceholder: 'Search for jobs, skills, or companies...',
    searchButton: 'Search',
    
    // Stats
    activeJobs: 'Active Jobs',
    bimProfessionals: 'BIM Professionals',
    companies: 'Companies',
    projectsCompleted: 'Projects Completed',
    
    // Features
    featuresTitle: 'Why Choose BIM Talent Hub?',
    feature1Title: 'Verified Professionals',
    feature1Desc: 'All BIM professionals are verified with portfolio reviews',
    feature2Title: 'Smart Matching',
    feature2Desc: 'AI-powered matching system connects the right talent with opportunities',
    feature3Title: 'Portfolio Showcase',
    feature3Desc: 'Beautiful portfolio galleries to showcase your BIM projects',
    feature4Title: 'Bilingual Platform',
    feature4Desc: 'Full support for Thai and English languages',
    
    // CTA
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    viewProfile: 'View Profile',
    applyNow: 'Apply Now',
    postJob: 'Post a Job',
    
    // Job Types
    fullTime: 'Full-time',
    partTime: 'Part-time',
    freelance: 'Freelance',
    contract: 'Contract',
    remote: 'Remote',
    onSite: 'On-site',
    hybrid: 'Hybrid',
    
    // Roles
    bimModeler: 'BIM Modeler',
    bimCoordinator: 'BIM Coordinator',
    bimManager: 'BIM Manager',
    bimConsultant: 'BIM Consultant',
    
    // Profile
    about: 'About',
    skills: 'Skills',
    experience: 'Experience',
    education: 'Education',
    certifications: 'Certifications',
    portfolio: 'Portfolio',
    contact: 'Contact',
    
    // Dashboard
    dashboard: 'Dashboard',
    myApplications: 'My Applications',
    savedJobs: 'Saved Jobs',
    myJobs: 'My Job Posts',
    candidates: 'Candidates',
    analytics: 'Analytics',
    settings: 'Settings',
    
    // Auth
    emailAddress: 'Email Address',
    password: 'Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    selectRole: 'Select Your Role',
    jobSeeker: 'Job Seeker',
    employer: 'Employer / Company',
    
    // Footer
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    allRightsReserved: 'All rights reserved',
  },
  th: {
    // Navigation
    home: 'หน้าแรก',
    findTalent: 'ค้นหาผู้เชี่ยวชาญ',
    findJobs: 'ค้นหางาน',
    companies: 'บริษัท',
    login: 'เข้าสู่ระบบ',
    signup: 'สมัครสมาชิก',
    logout: 'ออกจากระบบ',
    
    // Hero Section
    heroTitle: 'เชื่อมต่อกับผู้เชี่ยวชาญ BIM ชั้นนำในประเทศไทย',
    heroSubtitle: 'ค้นหาผู้เชี่ยวชาญ BIM ที่มีทักษะหรือค้นพบโอกาสครั้งต่อไปของคุณใน Building Information Modeling',
    searchPlaceholder: 'ค้นหางาน ทักษะ หรือบริษัท...',
    searchButton: 'ค้นหา',
    
    // Stats
    activeJobs: 'งานที่เปิดรับ',
    bimProfessionals: 'ผู้เชี่ยวชาญ BIM',
    companies: 'บริษัท',
    projectsCompleted: 'โครงการที่สำเร็จ',
    
    // Features
    featuresTitle: 'ทำไมต้องเลือก BIM Talent Hub?',
    feature1Title: 'ผู้เชี่ยวชาญที่ได้รับการตรวจสอบ',
    feature1Desc: 'ผู้เชี่ยวชาญ BIM ทุกคนได้รับการตรวจสอบพร้อมการรีวิวผลงาน',
    feature2Title: 'การจับคู่อัจฉริยะ',
    feature2Desc: 'ระบบจับคู่ที่ขับเคลื่อนด้วย AI เชื่อมต่อผู้มีความสามารถที่เหมาะสมกับโอกาส',
    feature3Title: 'แสดงผลงาน',
    feature3Desc: 'แกลเลอรี่ผลงานที่สวยงามเพื่อแสดงโครงการ BIM ของคุณ',
    feature4Title: 'แพลตฟอร์มสองภาษา',
    feature4Desc: 'รองรับภาษาไทยและอังกฤษอย่างเต็มรูปแบบ',
    
    // CTA
    getStarted: 'เริ่มต้นใช้งาน',
    learnMore: 'เรียนรู้เพิ่มเติม',
    viewProfile: 'ดูโปรไฟล์',
    applyNow: 'สมัครตอนนี้',
    postJob: 'ลงประกาศงาน',
    
    // Job Types
    fullTime: 'เต็มเวลา',
    partTime: 'พาร์ทไทม์',
    freelance: 'ฟรีแลนซ์',
    contract: 'สัญญาจ้าง',
    remote: 'ทำงานจากที่บ้าน',
    onSite: 'ทำงานที่สำนักงาน',
    hybrid: 'ลูกผสม',
    
    // Roles
    bimModeler: 'นักสร้างแบบจำลอง BIM',
    bimCoordinator: 'ผู้ประสานงาน BIM',
    bimManager: 'ผู้จัดการ BIM',
    bimConsultant: 'ที่ปรึกษา BIM',
    
    // Profile
    about: 'เกี่ยวกับ',
    skills: 'ทักษะ',
    experience: 'ประสบการณ์',
    education: 'การศึกษา',
    certifications: 'ใบรับรอง',
    portfolio: 'ผลงาน',
    contact: 'ติดต่อ',
    
    // Dashboard
    dashboard: 'แดชบอร์ด',
    myApplications: 'การสมัครของฉัน',
    savedJobs: 'งานที่บันทึก',
    myJobs: 'ประกาศงานของฉัน',
    candidates: 'ผู้สมัคร',
    analytics: 'การวิเคราะห์',
    settings: 'การตั้งค่า',
    
    // Auth
    emailAddress: 'อีเมล',
    password: 'รหัสผ่าน',
    rememberMe: 'จดจำฉัน',
    forgotPassword: 'ลืมรหัสผ่าน?',
    noAccount: 'ยังไม่มีบัญชี?',
    haveAccount: 'มีบัญชีอยู่แล้ว?',
    selectRole: 'เลือกบทบาทของคุณ',
    jobSeeker: 'ผู้หางาน',
    employer: 'นายจ้าง / บริษัท',
    
    // Footer
    aboutUs: 'เกี่ยวกับเรา',
    contactUs: 'ติดต่อเรา',
    privacyPolicy: 'นโยบายความเป็นส่วนตัว',
    termsOfService: 'ข้อกำหนดการใช้บริการ',
    allRightsReserved: 'สงวนลิขสิทธิ์',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });
  
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'th' : 'en');
  };
  
  const t = (key) => {
    return translations[language][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
