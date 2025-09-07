// Constants for the Mock School Placement Simulator
// This file centralizes all configuration data for easy backend integration

export const SCHOOL_CATEGORIES = {
  TOP_TIER: "Category A (Top Tier)",
  GOOD: "Category B (Good Schools)", 
  STANDARD: "Category C (Standard Schools)"
};

export const AGGREGATE_THRESHOLDS = {
  TOP_TIER: 6,
  GOOD: 15
};

export const CORE_SUBJECTS = ['ENG', 'MATH', 'SCI', 'SOC'];

export const ACADEMIC_PROGRAMS = [
  "Science",
  "General Arts", 
  "Business",
  "Technical",
  "Visual Arts",
  "Home Economics",
  "Agricultural Science"
];

export const MOCK_SUBJECTS = [
  { name: "English Language", code: "ENG", maxScore: 100, weight: 1 },
  { name: "Mathematics", code: "MATH", maxScore: 100, weight: 1 },
  { name: "Integrated Science", code: "SCI", maxScore: 100, weight: 1 },
  { name: "Social Studies", code: "SOC", maxScore: 100, weight: 1 },
  { name: "Religious & Moral Education", code: "RME", maxScore: 100, weight: 0.5 },
  { name: "Information & Communication Technology", code: "ICT", maxScore: 100, weight: 0.5 },
  { name: "Ghanaian Language", code: "GHL", maxScore: 100, weight: 0.5 },
  { name: "French", code: "FRN", maxScore: 100, weight: 0.5 }
];

// API endpoints for backend integration
export const API_ENDPOINTS = {
  STUDENTS: '/api/students',
  SCHOOLS: '/api/schools',
  PLACEMENTS: '/api/placements',
  PREDICT: '/api/predict',
  EXPORT: '/api/export'
};

// Performance levels
export const PERFORMANCE_LEVELS = {
  EXCELLENT: 'Excellent',
  GOOD: 'Good',
  NEEDS_IMPROVEMENT: 'Needs Improvement'
};
