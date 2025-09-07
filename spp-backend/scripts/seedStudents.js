const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const Student = require('../models/Student');

const MOCK_SUBJECTS = [
  { code: 'ENG', name: 'English Language' },
  { code: 'MATH', name: 'Mathematics' },
  { code: 'SCI', name: 'Integrated Science' },
  { code: 'SOC', name: 'Social Studies' },
  { code: 'RME', name: 'Religious & Moral Education' },
  { code: 'ICT', name: 'Information & Communication Technology' },
  { code: 'GHL', name: 'Ghanaian Language' },
  { code: 'FRN', name: 'French' }
];

const randomName = () => {
  const first = ['John', 'Mary', 'Kwame', 'Akosua', 'Yaw', 'Ama', 'Kojo', 'Afia', 'Kofi', 'Abena'];
  const last = ['Mensah', 'Owusu', 'Boateng', 'Asare', 'Osei', 'Appiah', 'Addo', 'Adjei', 'Baah', 'Gyasi'];
  return `${first[Math.floor(Math.random() * first.length)]} ${last[Math.floor(Math.random() * last.length)]}`;
};

const randomGender = () => (Math.random() > 0.5 ? 'Male' : 'Female');
const randomDOB = () => {
  const year = 2007 + Math.floor(Math.random() * 3);
  const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
  const day = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const randomStrengths = () => ['General Arts', 'Science', 'Business', 'Visual Arts', 'Technical'].sort(() => 0.5 - Math.random()).slice(0, 2);
const randomWeaknesses = () => ['Mathematics', 'English', 'Science', 'French', 'ICT'].sort(() => 0.5 - Math.random()).slice(0, 2);

const randomScores = () => {
  const scores = {};
  MOCK_SUBJECTS.forEach(sub => {
    scores[sub.code] = 40 + Math.floor(Math.random() * 61); // 40-100
  });
  return scores;
};

const calculateGrade = (score) => {
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

const calculateAggregate = (scores) => {
  // BECE: 4 core (ENG, MATH, SCI, SOC) + best 2 electives
  const coreSubjects = ['ENG', 'MATH', 'SCI', 'SOC'];
  const electiveSubjects = Object.keys(scores).filter(
    (code) => !coreSubjects.includes(code)
  );
  // Get grades for all subjects
  const grades = {};
  for (const code in scores) {
    grades[code] = calculateGrade(scores[code]);
  }
  // Core grades
  const coreGrades = coreSubjects.map((code) => grades[code] ?? 9);
  // Elective grades
  const electiveGrades = electiveSubjects.map((code) => grades[code] ?? 9);
  electiveGrades.sort((a, b) => a - b);
  const best2Electives = electiveGrades.slice(0, 2);
  return coreGrades.concat(best2Electives).reduce((a, b) => a + b, 0);
};

const calculateRawScore = (scores) => {
  return Object.values(scores).reduce((a, b) => a + b, 0);
};

// Category A, B, C schools (15 each)
const CATEGORY_A_SCHOOLS = [
  "Aburi Girls’ Senior High", "Accra Academy", "Accra Girls’ Senior High", "Achimota Senior High", "Adisadel College", "Opoku Ware School", "Prempeh College", "Yaa Asantewaa Girls’ Senior High", "Berekum Presby Senior High", "Holy Child School, Cape Coast", "Mfantsipim School", "Wesley Girls’ Senior High", "St. Augustine’s College", "St. Peter’s Senior High", "Notre Dame Girls’ Senior High, Sunyani"
];
const CATEGORY_B_SCHOOLS = [
  "Ahafoman Senior High/Tech", "Mim Senior High", "Kukuom Agric Senior High", "Sankore Senior High", "Gyamfi Kumanini Senior High/Tech", "Acherensua Senior High", "Hwidiem Senior High", "Boakye Tromo Senior High/Tech", "Yamfo Anglican Senior High School", "Bomaa Community Senior High", "Derma Community Day School", "Samuel Otu Presby Senior High", "Bechem Presby Senior High", "Dompoase Senior High", "Fomena T. I. Ahmad Senior High"
];
const CATEGORY_C_SCHOOLS = [
  "Danso Agyei Senior High Technical", "TWEREKU AMPEM SHS", "Terchire Senior High", "Bodwesango Senior High", "Apagya Senior High", "Afigyaman Senior High School", "Adugyama Community Senior High", "Mankranso Senior High", "WIOSO SHS", "Tweapease Senior High School", "Manso-Adubia Senior High", "Mansoman Senior High", "Esaase Bontefufuo Senior High/Tech", "Agogo State College", "Banka Community Senior High"
];

function getRandomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const getCategory = (aggregate) => {
  if (aggregate <= 10) return 'Category A (Top Tier)';
  if (aggregate <= 15) return 'Category B (Good Schools)';
  if (aggregate <= 20) return 'Category C (Standard Schools)';
  return 'Category D (Community/Day Schools)';
};

const randomSchool = (category) => {
  if (category === 'Category A (Top Tier)') return getRandomFrom(CATEGORY_A_SCHOOLS);
  if (category === 'Category B (Good Schools)') return getRandomFrom(CATEGORY_B_SCHOOLS);
  if (category === 'Category C (Standard Schools)') return getRandomFrom(CATEGORY_C_SCHOOLS);
  return 'Any Community/Day School';
};

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Student.deleteMany({}); // Clear existing students

  const students = [];
  for (let i = 1; i <= 20; i++) {
    const id = `STD${String(i).padStart(3, '0')}`;
    const name = randomName();
    const gender = randomGender();
    const dob = randomDOB();
    const strengths = randomStrengths();
    const weaknesses = randomWeaknesses();
    const indexNumber = `2024${String(i).padStart(3, '0')}`;
    const student = {
      id,
      name,
      indexNumber,
      class: "JHS 3 Prudence",
      gender,
      dateOfBirth: dob,
      strengths,
      weaknesses,
      mockTests: []
    };

    // Add 2 mock tests
    for (let t = 1; t <= 2; t++) {
      const scores = randomScores();
      const rawScore = calculateRawScore(scores);
      const aggregate = calculateAggregate(scores);
      const category = getCategory(aggregate);
      student.mockTests.push({
        testId: `MT${i}${t}`,
        testName: `Mock Test ${t}`,
        date: `2024-0${t}-15`,
        scores,
        rawScore,
        aggregate,
        category,
        predictedSchool: randomSchool(category),
        predictedProgram: strengths[0]
      });
    }

    students.push(student);
  }

  await Student.insertMany(students);
  console.log('Seeded 20 students with 2 mock tests each!');
  mongoose.disconnect();
}

seed();
