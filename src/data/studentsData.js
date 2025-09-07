// Student database for Steadfast Academy
// This contains sample students with their academic profiles and mock test history

export const STEADFAST_ACADEMY_STUDENTS = [
  {
    id: "STD001",
    name: "Kwame Asante",
    indexNumber: "2024001",
    class: "JHS 3 Prudence",
    gender: "Male",
    dateOfBirth: "2008-03-15",
    strengths: ["Mathematics", "Science"],
    weaknesses: ["English Language", "Social Studies"],
    mockTests: [
      {
        testId: "MT001",
        testName: "First Term Mock Test",
        date: "2024-01-15",
        scores: { ENG: 65, MATH: 85, SCI: 78, SOC: 58, RME: 72, ICT: 68, GHL: 70, FRN: 45 },
        aggregate: 12,
        category: "Category B (Good Schools)",
        predictedSchool: "Ghana National College",
        predictedProgram: "Science"
      },
      {
        testId: "MT002", 
        testName: "Second Term Mock Test",
        date: "2024-04-20",
        scores: { ENG: 72, MATH: 88, SCI: 82, SOC: 65, RME: 75, ICT: 72, GHL: 73, FRN: 50 },
        aggregate: 9,
        category: "Category B (Good Schools)",
        predictedSchool: "St. Peter's Senior High School",
        predictedProgram: "Science"
      }
    ]
  },
  {
    id: "STD002",
    name: "Ama Serwaa",
    indexNumber: "2024002", 
    class: "JHS 3 Prudence",
    gender: "Female",
    dateOfBirth: "2008-07-22",
    strengths: ["English Language", "Social Studies"],
    weaknesses: ["Mathematics", "Science"],
    mockTests: [
      {
        testId: "MT003",
        testName: "First Term Mock Test",
        date: "2024-01-15",
        scores: { ENG: 88, MATH: 45, SCI: 52, SOC: 85, RME: 90, ICT: 65, GHL: 92, FRN: 78 },
        aggregate: 18,
        category: "Category C (Standard Schools)",
        predictedSchool: "St. Monica's Senior High School",
        predictedProgram: "General Arts"
      }
    ]
  },
  {
    id: "STD003",
    name: "Kofi Mensah",
    indexNumber: "2024003",
    class: "JHS 3 Prudence", 
    gender: "Male",
    dateOfBirth: "2008-01-10",
    strengths: ["Science", "Mathematics", "ICT"],
    weaknesses: ["French", "Ghanaian Language"],
    mockTests: [
      {
        testId: "MT004",
        testName: "First Term Mock Test",
        date: "2024-01-15",
        scores: { ENG: 75, MATH: 92, SCI: 88, SOC: 70, RME: 68, ICT: 95, GHL: 55, FRN: 40 },
        aggregate: 8,
        category: "Category B (Good Schools)",
        predictedSchool: "Keta Senior High School",
        predictedProgram: "Science"
      },
      {
        testId: "MT005",
        testName: "Second Term Mock Test", 
        date: "2024-04-20",
        scores: { ENG: 78, MATH: 95, SCI: 90, SOC: 72, RME: 70, ICT: 97, GHL: 58, FRN: 42 },
        aggregate: 6,
        category: "Category A (Top Tier)",
        predictedSchool: "Achimota School",
        predictedProgram: "Science"
      }
    ]
  },
  {
    id: "STD004",
    name: "Efua Adjei",
    indexNumber: "2024004",
    class: "JHS 3 Prudence",
    gender: "Female",
    dateOfBirth: "2008-11-05",
    strengths: ["General Arts", "Home Economics"],
    weaknesses: ["Mathematics", "Science"],
    mockTests: [
      {
        testId: "MT006",
        testName: "First Term Mock Test",
        date: "2024-01-15",
        scores: { ENG: 82, MATH: 38, SCI: 45, SOC: 88, RME: 85, ICT: 60, GHL: 90, FRN: 75 },
        aggregate: 20,
        category: "Category C (Standard Schools)",
        predictedSchool: "St. John's School, Sekondi",
        predictedProgram: "General Arts"
      }
    ]
  },
  {
    id: "STD005",
    name: "Yaw Boateng",
    indexNumber: "2024005",
    class: "JHS 3 Prudence",
    gender: "Male",
    dateOfBirth: "2008-05-18",
    strengths: ["Mathematics", "Science", "English"],
    weaknesses: ["French", "ICT"],
    mockTests: [
      {
        testId: "MT007",
        testName: "First Term Mock Test",
        date: "2024-01-15",
        scores: { ENG: 85, MATH: 90, SCI: 87, SOC: 75, RME: 80, ICT: 55, GHL: 78, FRN: 35 },
        aggregate: 7,
        category: "Category A (Top Tier)",
        predictedSchool: "Presbyterian Boys' Secondary School (PRESEC)",
        predictedProgram: "Science"
      },
      {
        testId: "MT008",
        testName: "Second Term Mock Test",
        date: "2024-04-20", 
        scores: { ENG: 88, MATH: 93, SCI: 90, SOC: 78, RME: 82, ICT: 58, GHL: 80, FRN: 38 },
        aggregate: 5,
        category: "Category A (Top Tier)",
        predictedSchool: "Achimota School",
        predictedProgram: "Science"
      }
    ]
  },
  {
    id: "STD006",
    name: "Akosua Osei",
    indexNumber: "2024006",
    class: "JHS 3 Prudence",
    gender: "Female",
    dateOfBirth: "2008-09-12",
    strengths: ["Business", "Social Studies"],
    weaknesses: ["Science", "Mathematics"],
    mockTests: [
      {
        testId: "MT009",
        testName: "First Term Mock Test",
        date: "2024-01-15",
        scores: { ENG: 78, MATH: 42, SCI: 48, SOC: 85, RME: 82, ICT: 70, GHL: 88, FRN: 65 },
        aggregate: 16,
        category: "Category C (Standard Schools)",
        predictedSchool: "St. Paul's Senior High School",
        predictedProgram: "Business"
      }
    ]
  },
  {
    id: "STD007",
    name: "Nana Kwaku",
    indexNumber: "2024007",
    class: "JHS 3 Prudence",
    gender: "Male",
    dateOfBirth: "2008-02-28",
    strengths: ["Science", "Mathematics", "ICT"],
    weaknesses: ["English Language", "Social Studies"],
    mockTests: [
      {
        testId: "MT010",
        testName: "First Term Mock Test",
        date: "2024-01-15",
        scores: { ENG: 62, MATH: 88, SCI: 85, SOC: 58, RME: 70, ICT: 92, GHL: 65, FRN: 45 },
        aggregate: 11,
        category: "Category B (Good Schools)",
        predictedSchool: "Tamale Senior High School",
        predictedProgram: "Science"
      }
    ]
  },
  {
    id: "STD008",
    name: "Maame Yaa",
    indexNumber: "2024008",
    class: "JHS 3 Prudence",
    gender: "Female",
    dateOfBirth: "2008-06-14",
    strengths: ["General Arts", "Home Economics", "English"],
    weaknesses: ["Mathematics", "Science"],
    mockTests: [
      {
        testId: "MT011",
        testName: "First Term Mock Test",
        date: "2024-01-15",
        scores: { ENG: 90, MATH: 35, SCI: 42, SOC: 88, RME: 92, ICT: 65, GHL: 95, FRN: 80 },
        aggregate: 19,
        category: "Category C (Standard Schools)",
        predictedSchool: "St. Augustine's Senior High School",
        predictedProgram: "General Arts"
      }
    ]
  },
  {
    id: "STD009",
    name: "Kojo Appiah",
    indexNumber: "2024009",
    class: "JHS 3 Prudence",
    gender: "Male",
    dateOfBirth: "2008-12-03",
    strengths: ["Mathematics", "Science", "English"],
    weaknesses: ["French", "Ghanaian Language"],
    mockTests: [
      {
        testId: "MT012",
        testName: "First Term Mock Test",
        date: "2024-01-15",
        scores: { ENG: 82, MATH: 95, SCI: 88, SOC: 75, RME: 78, ICT: 85, GHL: 50, FRN: 30 },
        aggregate: 6,
        category: "Category A (Top Tier)",
        predictedSchool: "Opoku Ware School",
        predictedProgram: "Science"
      },
      {
        testId: "MT013",
        testName: "Second Term Mock Test",
        date: "2024-04-20",
        scores: { ENG: 85, MATH: 97, SCI: 92, SOC: 78, RME: 80, ICT: 88, GHL: 52, FRN: 32 },
        aggregate: 4,
        category: "Category A (Top Tier)",
        predictedSchool: "Achimota School",
        predictedProgram: "Science"
      }
    ]
  },
  {
    id: "STD010",
    name: "Abena Nyarko",
    indexNumber: "2024010",
    class: "JHS 3 Prudence",
    gender: "Female",
    dateOfBirth: "2008-08-25",
    strengths: ["Business", "English", "Social Studies"],
    weaknesses: ["Science", "Mathematics"],
    mockTests: [
      {
        testId: "MT014",
        testName: "First Term Mock Test",
        date: "2024-01-15",
        scores: { ENG: 85, MATH: 40, SCI: 45, SOC: 90, RME: 88, ICT: 75, GHL: 92, FRN: 70 },
        aggregate: 17,
        category: "Category C (Standard Schools)",
        predictedSchool: "St. Martin's Senior High School",
        predictedProgram: "Business"
      }
    ]
  },
  {
    id: "STD011",
    name: "Emmanuel Ofori",
    indexNumber: "2024011",
    class: "JHS 3 Prudence",
    gender: "Male",
    dateOfBirth: "2008-04-12",
    strengths: ["Mathematics", "Science", "ICT"],
    weaknesses: ["French", "Social Studies"],
    mockTests: [
      {
        testId: "MT015",
        testName: "First Term Mock Test",
        date: "2024-01-15",
        scores: { ENG: 70, MATH: 90, SCI: 85, SOC: 60, RME: 75, ICT: 88, GHL: 65, FRN: 35 },
        aggregate: 10,
        category: "Category B (Good Schools)",
        predictedSchool: "St. Louis Senior High School",
        predictedProgram: "Science"
      }
    ]
  },
  {
    id: "STD012",
    name: "Grace Mensah",
    indexNumber: "2024012",
    class: "JHS 3 Prudence",
    gender: "Female",
    dateOfBirth: "2008-10-08",
    strengths: ["English Language", "Home Economics"],
    weaknesses: ["Mathematics", "Science"],
    mockTests: [
      {
        testId: "MT016",
        testName: "First Term Mock Test",
        date: "2024-01-15",
        scores: { ENG: 92, MATH: 38, SCI: 42, SOC: 85, RME: 88, ICT: 70, GHL: 90, FRN: 75 },
        aggregate: 19,
        category: "Category C (Standard Schools)",
        predictedSchool: "St. Anthony's Senior High School",
        predictedProgram: "Home Economics"
      }
    ]
  },
  {
    id: "STD013",
    name: "Samuel Adjei",
    indexNumber: "2024013",
    class: "JHS 3 Prudence",
    gender: "Male",
    dateOfBirth: "2008-01-25",
    strengths: ["Science", "Mathematics"],
    weaknesses: ["English Language", "French"],
    mockTests: [
      {
        testId: "MT017",
        testName: "First Term Mock Test",
        date: "2024-01-15",
        scores: { ENG: 60, MATH: 88, SCI: 90, SOC: 70, RME: 72, ICT: 80, GHL: 68, FRN: 30 },
        aggregate: 9,
        category: "Category B (Good Schools)",
        predictedSchool: "St. Thomas Aquinas Senior High School",
        predictedProgram: "Science"
      }
    ]
  },
  {
    id: "STD014",
    name: "Priscilla Owusu",
    indexNumber: "2024014",
    class: "JHS 3 Prudence",
    gender: "Female",
    dateOfBirth: "2008-07-03",
    strengths: ["Business", "Social Studies", "English"],
    weaknesses: ["Mathematics", "Science"],
    mockTests: [
      {
        testId: "MT018",
        testName: "First Term Mock Test",
        date: "2024-01-15",
        scores: { ENG: 88, MATH: 45, SCI: 48, SOC: 92, RME: 85, ICT: 75, GHL: 90, FRN: 70 },
        aggregate: 16,
        category: "Category C (Standard Schools)",
        predictedSchool: "St. Roses Senior High School",
        predictedProgram: "Business"
      }
    ]
  },
  {
    id: "STD015",
    name: "Daniel Asante",
    indexNumber: "2024015",
    class: "JHS 3 Prudence",
    gender: "Male",
    dateOfBirth: "2008-09-18",
    strengths: ["Mathematics", "Science", "English"],
    weaknesses: ["French", "Ghanaian Language"],
    mockTests: [
      {
        testId: "MT019",
        testName: "First Term Mock Test",
        date: "2024-01-15",
        scores: { ENG: 85, MATH: 92, SCI: 88, SOC: 78, RME: 80, ICT: 82, GHL: 55, FRN: 35 },
        aggregate: 6,
        category: "Category A (Top Tier)",
        predictedSchool: "Mfantsipim School",
        predictedProgram: "Science"
      }
    ]
  },
  {
    id: "STD016",
    name: "Esther Boateng",
    indexNumber: "2024016",
    class: "JHS 3 Prudence",
    gender: "Female",
    dateOfBirth: "2008-12-22",
    strengths: ["General Arts", "English Language"],
    weaknesses: ["Mathematics", "Science"],
    mockTests: [
      {
        testId: "MT020",
        testName: "First Term Mock Test",
        date: "2024-01-15",
        scores: { ENG: 90, MATH: 40, SCI: 45, SOC: 88, RME: 92, ICT: 65, GHL: 95, FRN: 80 },
        aggregate: 18,
        category: "Category C (Standard Schools)",
        predictedSchool: "Holy Child School",
        predictedProgram: "General Arts"
      }
    ]
  },
  {
    id: "STD017",
    name: "Michael Osei",
    indexNumber: "2024017",
    class: "JHS 3 Prudence",
    gender: "Male",
    dateOfBirth: "2008-06-07",
    strengths: ["Science", "Mathematics", "ICT"],
    weaknesses: ["French", "Social Studies"],
    mockTests: [
      {
        testId: "MT021",
        testName: "First Term Mock Test",
        date: "2024-01-15",
        scores: { ENG: 75, MATH: 90, SCI: 87, SOC: 65, RME: 70, ICT: 92, GHL: 68, FRN: 40 },
        aggregate: 8,
        category: "Category B (Good Schools)",
        predictedSchool: "Prempeh College",
        predictedProgram: "Science"
      }
    ]
  },
  {
    id: "STD018",
    name: "Comfort Adjei",
    indexNumber: "2024018",
    class: "JHS 3 Prudence",
    gender: "Female",
    dateOfBirth: "2008-03-30",
    strengths: ["Home Economics", "English Language"],
    weaknesses: ["Mathematics", "Science"],
    mockTests: [
      {
        testId: "MT022",
        testName: "First Term Mock Test",
        date: "2024-01-15",
        scores: { ENG: 88, MATH: 35, SCI: 40, SOC: 85, RME: 90, ICT: 70, GHL: 92, FRN: 75 },
        aggregate: 20,
        category: "Category C (Standard Schools)",
        predictedSchool: "Aburi Girls' Senior High School",
        predictedProgram: "Home Economics"
      }
    ]
  },
  {
    id: "STD019",
    name: "Joseph Mensah",
    indexNumber: "2024019",
    class: "JHS 3 Prudence",
    gender: "Male",
    dateOfBirth: "2008-11-14",
    strengths: ["Mathematics", "Science", "English"],
    weaknesses: ["French", "ICT"],
    mockTests: [
      {
        testId: "MT023",
        testName: "First Term Mock Test",
        date: "2024-01-15",
        scores: { ENG: 82, MATH: 95, SCI: 90, SOC: 75, RME: 78, ICT: 60, GHL: 80, FRN: 30 },
        aggregate: 5,
        category: "Category A (Top Tier)",
        predictedSchool: "St. Augustine's College",
        predictedProgram: "Science"
      }
    ]
  },
  {
    id: "STD020",
    name: "Ruth Asante",
    indexNumber: "2024020",
    class: "JHS 3 Prudence",
    gender: "Female",
    dateOfBirth: "2008-08-05",
    strengths: ["Business", "English Language", "Social Studies"],
    weaknesses: ["Mathematics", "Science"],
    mockTests: [
      {
        testId: "MT024",
        testName: "First Term Mock Test",
        date: "2024-01-15",
        scores: { ENG: 85, MATH: 42, SCI: 45, SOC: 90, RME: 88, ICT: 75, GHL: 92, FRN: 70 },
        aggregate: 17,
        category: "Category C (Standard Schools)",
        predictedSchool: "St. Mary's Senior High School",
        predictedProgram: "Business"
      }
    ]
  }
];

// Helper functions for student management
export const getStudentById = (id) => {
  return STEADFAST_ACADEMY_STUDENTS.find(student => student.id === id);
};

export const getStudentsByClass = (className) => {
  return STEADFAST_ACADEMY_STUDENTS.filter(student => student.class === className);
};

export const getStudentsByGender = (gender) => {
  return STEADFAST_ACADEMY_STUDENTS.filter(student => student.gender === gender);
};

export const getStudentsByPerformance = (category) => {
  return STEADFAST_ACADEMY_STUDENTS.filter(student => {
    const latestTest = student.mockTests[student.mockTests.length - 1];
    return latestTest && latestTest.category === category;
  });
};

export const getTopPerformers = (limit = 5) => {
  return STEADFAST_ACADEMY_STUDENTS
    .map(student => ({
      ...student,
      latestAggregate: student.mockTests[student.mockTests.length - 1]?.aggregate || 30
    }))
    .sort((a, b) => a.latestAggregate - b.latestAggregate)
    .slice(0, limit);
};
