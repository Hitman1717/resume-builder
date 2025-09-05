// Application constants

export const API_ENDPOINTS = {
  HEALTH: '/health',
  GENERATE_RESUME: '/api/resume/generate',
  PREVIEW_RESUME: '/api/resume/preview'
};

export const ROUTES = {
  HOME: '/',
  RESUME_BUILDER: '/resume-builder',
  TEMPLATES: '/templates',
  ABOUT: '/about'
};

export const FORM_VALIDATION = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MAX_DESCRIPTION_LENGTH: 1000,
  MAX_SKILLS_PER_CATEGORY: 20
};

export const AI_ENHANCEMENT_TYPES = {
  SUMMARY: 'summary',
  EXPERIENCE: 'experience',
  EDUCATION: 'education',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  ACHIEVEMENTS: 'achievements'
};

export const RESUME_SECTIONS = {
  PERSONAL: 'Personal Information',
  SUMMARY: 'Professional Summary',
  EXPERIENCE: 'Work Experience',
  PROJECTS: 'Projects',
  ACHIEVEMENTS: 'Achievements',
  EDUCATION: 'Education',
  SKILLS: 'Skills'
};

export const DEFAULT_SKILLS_CATEGORIES = [
  'Technical Skills',
  'Languages',
  'Tools',
  'Frameworks',
  'Soft Skills'
];
