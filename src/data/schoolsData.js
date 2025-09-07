// Schools data for Ghanaian Senior High Schools
// This data can be easily moved to a backend database

export const SCHOOLS_DATA = {
  "Category A (Top Tier)": [
    { 
      name: "Achimota School", 
      code: "1000001", 
      region: "Greater Accra", 
      programs: ["Science", "General Arts", "Business"],
      capacity: 500,
      cutoffs: { maxAggregate: 6 }
    },
    { 
      name: "Wesley Girls' High School", 
      code: "1000002", 
      region: "Central", 
      programs: ["Science", "Home Economics", "General Arts"],
      capacity: 400,
      cutoffs: { maxAggregate: 6 }
    },
    { 
      name: "Presbyterian Boys' Secondary School (PRESEC)", 
      code: "1000003", 
      region: "Greater Accra", 
      programs: ["Science", "Business", "General Arts"],
      capacity: 600,
      cutoffs: { maxAggregate: 6 }
    },
    { 
      name: "Opoku Ware School", 
      code: "1000004", 
      region: "Ashanti", 
      programs: ["Science", "General Arts", "Business"],
      capacity: 550,
      cutoffs: { maxAggregate: 6 }
    },
    { 
      name: "Mfantsipim School", 
      code: "1000005", 
      region: "Central", 
      programs: ["Science", "General Arts", "Business"],
      capacity: 500,
      cutoffs: { maxAggregate: 6 }
    },
    { 
      name: "St. Augustine's College", 
      code: "1000006", 
      region: "Central", 
      programs: ["Science", "General Arts", "Business"],
      capacity: 450,
      cutoffs: { maxAggregate: 6 }
    },
    { 
      name: "Prempeh College", 
      code: "1000007", 
      region: "Ashanti", 
      programs: ["Science", "General Arts", "Business"],
      capacity: 500,
      cutoffs: { maxAggregate: 6 }
    },
    { 
      name: "Holy Child School", 
      code: "1000008", 
      region: "Central", 
      programs: ["Science", "Home Economics", "General Arts"],
      capacity: 400,
      cutoffs: { maxAggregate: 6 }
    },
    { 
      name: "Adisadel College", 
      code: "1000009", 
      region: "Central", 
      programs: ["Science", "General Arts", "Business"],
      capacity: 500,
      cutoffs: { maxAggregate: 6 }
    },
    { 
      name: "Aburi Girls' Senior High School", 
      code: "1000010", 
      region: "Eastern", 
      programs: ["Science", "Home Economics", "General Arts"],
      capacity: 400,
      cutoffs: { maxAggregate: 6 }
    }
  ],
  "Category B (Good Schools)": [
    { 
      name: "Ghana National College", 
      code: "1000011", 
      region: "Greater Accra", 
      programs: ["Science", "General Arts", "Business"],
      capacity: 400,
      cutoffs: { maxAggregate: 15 }
    },
    { 
      name: "St. Peter's Senior High School", 
      code: "1000012", 
      region: "Central", 
      programs: ["Science", "General Arts", "Business"],
      capacity: 350,
      cutoffs: { maxAggregate: 15 }
    },
    { 
      name: "Keta Senior High School", 
      code: "1000013", 
      region: "Volta", 
      programs: ["Science", "General Arts", "Business"],
      capacity: 300,
      cutoffs: { maxAggregate: 15 }
    },
    { 
      name: "Tamale Senior High School", 
      code: "1000014", 
      region: "Northern", 
      programs: ["Science", "General Arts", "Business"],
      capacity: 400,
      cutoffs: { maxAggregate: 15 }
    },
    { 
      name: "St. Louis Senior High School", 
      code: "1000015", 
      region: "Northern", 
      programs: ["Science", "General Arts", "Business"],
      capacity: 300,
      cutoffs: { maxAggregate: 15 }
    },
    { 
      name: "St. Roses Senior High School", 
      code: "1000016", 
      region: "Ashanti", 
      programs: ["Science", "Home Economics", "General Arts"],
      capacity: 350,
      cutoffs: { maxAggregate: 15 }
    },
    { 
      name: "St. Mary's Senior High School", 
      code: "1000017", 
      region: "Greater Accra", 
      programs: ["Science", "General Arts", "Business"],
      capacity: 300,
      cutoffs: { maxAggregate: 15 }
    },
    { 
      name: "St. Thomas Aquinas Senior High School", 
      code: "1000018", 
      region: "Greater Accra", 
      programs: ["Science", "General Arts", "Business"],
      capacity: 350,
      cutoffs: { maxAggregate: 15 }
    }
  ],
  "Category C (Standard Schools)": [
    { 
      name: "St. Monica's Senior High School", 
      code: "1000019", 
      region: "Ashanti", 
      programs: ["Science", "General Arts", "Business"],
      capacity: 300,
      cutoffs: { maxAggregate: 30 }
    },
    { 
      name: "St. John's School, Sekondi", 
      code: "1000020", 
      region: "Western", 
      programs: ["Science", "General Arts", "Business"],
      capacity: 250,
      cutoffs: { maxAggregate: 30 }
    },
    { 
      name: "St. Paul's Senior High School", 
      code: "1000021", 
      region: "Eastern", 
      programs: ["Science", "General Arts", "Business"],
      capacity: 300,
      cutoffs: { maxAggregate: 30 }
    },
    { 
      name: "St. Augustine's Senior High School", 
      code: "1000022", 
      region: "Greater Accra", 
      programs: ["Science", "General Arts", "Business"],
      capacity: 250,
      cutoffs: { maxAggregate: 30 }
    },
    { 
      name: "St. Martin's Senior High School", 
      code: "1000023", 
      region: "Ashanti", 
      programs: ["Science", "General Arts", "Business"],
      capacity: 300,
      cutoffs: { maxAggregate: 30 }
    },
    { 
      name: "St. Anthony's Senior High School", 
      code: "1000024", 
      region: "Central", 
      programs: ["Science", "General Arts", "Business"],
      capacity: 250,
      cutoffs: { maxAggregate: 30 }
    }
  ]
};

// Helper function to get all schools as a flat array
export const getAllSchools = () => {
  return Object.values(SCHOOLS_DATA).flat();
};

// Helper function to get schools by region
export const getSchoolsByRegion = (region) => {
  return getAllSchools().filter(school => school.region === region);
};

// Helper function to get schools by program
export const getSchoolsByProgram = (program) => {
  return getAllSchools().filter(school => school.programs.includes(program));
};
