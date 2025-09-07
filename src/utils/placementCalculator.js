// Placement calculation utilities
// This module handles all placement logic and can be easily moved to backend

import { SCHOOL_CATEGORIES, AGGREGATE_THRESHOLDS, CORE_SUBJECTS, PERFORMANCE_LEVELS } from './constants.js';

/**
 * Calculate aggregate from mock scores
 * @param {Object} scores - Object with subject codes as keys and scores as values
 * @returns {number} - Calculated aggregate (lower is better)
 */
// Deprecated: use calculateAggregateAndRaw for BECE
export const calculateAggregate = (scores) => {
  // For backward compatibility, use new BECE logic
  return calculateAggregateAndRaw(scores).aggregate;
};

/**
 * Convert a raw score (0-100) to BECE grade (1-9)
 * @param {number} score - Raw score percentage
 * @returns {number} - BECE grade (1-9)
 */
export const convertRawScoreToGrade = (score) => {
  if (score >= 90) return 1;
  if (score >= 80) return 2;
  if (score >= 70) return 3;
  if (score >= 60) return 4;
  if (score >= 55) return 5;
  if (score >= 50) return 6;
  if (score >= 40) return 7;
  if (score >= 35) return 8;
  return 9;
};

/**
 * Calculate BECE aggregate and raw score summary
 * @param {Object} scores - Object with subject codes as keys and raw scores (0-100) as values
 * @returns {Object} - { aggregate, rawTotal, subjectGrades }
 */
export const calculateAggregateAndRaw = (scores) => {
  // 1. Convert all subject scores to grades
  const subjectGrades = {};
  for (const [code, raw] of Object.entries(scores)) {
    subjectGrades[code] = convertRawScoreToGrade(raw);
  }
  // 2. Get grades for core subjects
  const coreGrades = ['ENG', 'MATH', 'SCI', 'SOC'].map(code => subjectGrades[code] ?? 9);
  // 3. Get grades for electives (all others)
  const electiveGrades = Object.entries(subjectGrades)
    .filter(([code]) => !['ENG', 'MATH', 'SCI', 'SOC'].includes(code))
    .map(([, grade]) => grade);
  // 4. Pick best 2 electives (lowest grades)
  const best2Electives = electiveGrades.sort((a, b) => a - b).slice(0, 2);
  // 5. Calculate aggregate
  const aggregate = [...coreGrades, ...best2Electives].reduce((a, b) => a + b, 0);
  // 6. Calculate raw total (sum of all raw scores)
  const rawTotal = Object.values(scores).reduce((a, b) => a + b, 0);
  return { aggregate, rawTotal, subjectGrades };
};

/**
 * Get school category based on aggregate
 * @param {number} aggregate - Student's aggregate score
 * @returns {string} - School category
 */
export const getSchoolCategory = (aggregate) => {
  if (aggregate <= AGGREGATE_THRESHOLDS.TOP_TIER) return SCHOOL_CATEGORIES.TOP_TIER;
  if (aggregate <= AGGREGATE_THRESHOLDS.GOOD) return SCHOOL_CATEGORIES.GOOD;
  return SCHOOL_CATEGORIES.STANDARD;
};

/**
 * Get school category based on BECE aggregate
 * @param {number} aggregate - Student's aggregate score
 * @returns {string} - School category
 */
export const getSchoolCategoryBECE = (aggregate) => {
  if (aggregate <= 10) return 'Category A (Top Tier)';
  if (aggregate <= 15) return 'Category B (Good Schools)';
  if (aggregate <= 20) return 'Category C (Standard Schools)';
  return 'Category D (Community/Day Schools)';
};

/**
 * Get performance level based on aggregate
 * @param {number} aggregate - Student's aggregate score
 * @returns {string} - Performance level
 */
export const getPerformanceLevel = (aggregate) => {
  if (aggregate <= AGGREGATE_THRESHOLDS.TOP_TIER) return PERFORMANCE_LEVELS.EXCELLENT;
  if (aggregate <= AGGREGATE_THRESHOLDS.GOOD) return PERFORMANCE_LEVELS.GOOD;
  return PERFORMANCE_LEVELS.NEEDS_IMPROVEMENT;
};

/**
 * Predict placement based on mock scores and preferences
 * @param {Object} studentData - Student data including scores and preferences
 * @param {Object} schoolsData - Available schools data
 * @returns {Object} - Placement prediction results
 */
export const predictPlacement = (studentData, schoolsData) => {
  const aggregate = calculateAggregate(studentData.mockScores);
  const category = getSchoolCategory(aggregate);
  const availableSchools = schoolsData[category] || [];
  
  // Find best matching school based on preferences
  let placedSchool = null;
  let placedProgram = null;
  
  for (let i = 0; i < studentData.schoolPreferences.length; i++) {
    const preferredSchool = studentData.schoolPreferences[i];
    const preferredProgram = studentData.programPreferences[i];
    
    if (preferredSchool && preferredProgram) {
      const school = availableSchools.find(s => s.name === preferredSchool);
      if (school && school.programs.includes(preferredProgram)) {
        placedSchool = school;
        placedProgram = preferredProgram;
        break;
      }
    }
  }
  
  // If no preference match, suggest best available
  if (!placedSchool && availableSchools.length > 0) {
    placedSchool = availableSchools[0];
    placedProgram = placedSchool.programs[0];
  }
  
  return {
    aggregate,
    category,
    placedSchool,
    placedProgram,
    availableSchools,
    performance: getPerformanceLevel(aggregate)
  };
};

/**
 * Get motivational message based on performance
 * @param {string} performance - Performance level
 * @param {number} aggregate - Student's aggregate
 * @returns {Object} - Motivational message and advice
 */
export const getMotivationalMessage = (performance, aggregate) => {
  const messages = {
    [PERFORMANCE_LEVELS.EXCELLENT]: {
      message: "🎉 Outstanding Performance! You're on track for top-tier schools!",
      advice: "Keep up the excellent work and maintain your high standards.",
      color: "#4CAF50"
    },
    [PERFORMANCE_LEVELS.GOOD]: {
      message: "👍 Good Performance! You're doing well and can aim higher!",
      advice: "Focus on your weaker subjects to improve your aggregate and reach top-tier schools.",
      color: "#FF9800"
    },
    [PERFORMANCE_LEVELS.NEEDS_IMPROVEMENT]: {
      message: "📚 Room for Improvement! Don't give up, you can do better!",
      advice: "Create a study plan, focus on core subjects, and practice regularly. Every improvement counts!",
      color: "#F44336"
    }
  };
  
  return messages[performance] || messages[PERFORMANCE_LEVELS.NEEDS_IMPROVEMENT];
};

/**
 * Validate student data
 * @param {Object} studentData - Student data to validate
 * @returns {Object} - Validation result with isValid and errors
 */
export const validateStudentData = (studentData) => {
  const errors = [];
  
  if (!studentData.name || studentData.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  }
  
  if (!studentData.indexNumber || studentData.indexNumber.trim().length < 5) {
    errors.push("Index number must be at least 5 characters long");
  }
  
  const coreScores = CORE_SUBJECTS.filter(code => 
    !studentData.mockScores[code] || studentData.mockScores[code] < 0 || studentData.mockScores[code] > 100
  );
  
  if (coreScores.length > 0) {
    errors.push("All core subjects (English, Math, Science, Social Studies) must have valid scores (0-100)");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
