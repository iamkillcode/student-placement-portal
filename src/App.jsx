import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import axios from "axios";
import { SCHOOLS_DATA } from './data/schoolsData.js';
import { ACADEMIC_PROGRAMS, MOCK_SUBJECTS } from './utils/constants.js';
import { 
  predictPlacement, 
  getMotivationalMessage, 
  validateStudentData,
  calculateAggregate,
  getSchoolCategory
} from './utils/placementCalculator.js';
import Dashboard from './views/Dashboard.jsx';
import Students from './views/Students.jsx';
import AddTest from './views/AddTest.jsx';
import Reports from './views/Reports.jsx';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'students', 'add-test', 'reports'
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [newMockTest, setNewMockTest] = useState({
    testName: '',
    date: new Date().toISOString().split('T')[0],
    scores: {}
  });
  const [filterClass, setFilterClass] = useState('all');
  const [filterPerformance, setFilterPerformance] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [importMessage, setImportMessage] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleNewTestScoreChange = (subjectCode, value) => {
    const score = Math.min(Math.max(parseInt(value) || 0, 0), 100);
    setNewMockTest(prev => ({
      ...prev,
      scores: { ...prev.scores, [subjectCode]: score }
    }));
  };

  const addMockTestToStudent = async () => {
    if (!selectedStudent) return;
    
    const aggregate = calculateAggregate(newMockTest.scores);
    const category = getSchoolCategory(aggregate);
    const availableSchools = SCHOOLS_DATA[category] || [];
    
    const newTest = {
      testId: `MT${Date.now()}`,
      testName: newMockTest.testName,
      date: newMockTest.date,
      scores: { ...newMockTest.scores },
      aggregate,
      category,
      predictedSchool: availableSchools[0]?.name || 'No placement available',
      predictedProgram: availableSchools[0]?.programs[0] || 'N/A'
    };

    try {
      const updatedStudent = {
        ...selectedStudent,
        mockTests: [...selectedStudent.mockTests, newTest]
      };
      await axios.post('http://localhost:4000/api/students', updatedStudent);
      setStudents(prev => prev.map(student => 
        student.id === selectedStudent.id 
          ? updatedStudent
          : student
      ));
    } catch (error) {
      console.error("Error adding mock test:", error);
    }

    setNewMockTest({
      testName: '',
      date: new Date().toISOString().split('T')[0],
      scores: {}
    });
    
    alert(`Mock test added successfully! Aggregate: ${aggregate}, Category: ${category}`);
  };

  const getFilteredStudents = () => {
    let filtered = students;
    
    if (filterClass !== 'all') {
      filtered = filtered.filter(student => student.class === filterClass);
    }
    
    if (filterGender !== 'all') {
      filtered = filtered.filter(student => student.gender === filterGender);
    }
    
    if (filterPerformance !== 'all') {
      filtered = filtered.filter(student => {
        const latestTest = student.mockTests[student.mockTests.length - 1];
        return latestTest && latestTest.category === filterPerformance;
      });
    }
    
    return filtered;
  };

  const handleImportStudents = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const newStudents = jsonData.map((row, index) => ({
          id: `STD${String(students.length + index + 1).padStart(3, '0')}`,
          name: row.Name || row.name || `Student ${students.length + index + 1}`,
          indexNumber: row['Index Number'] || row.indexNumber || `2024${String(students.length + index + 1).padStart(3, '0')}`,
          class: "JHS 3 Prudence",
          gender: row.Gender || row.gender || (Math.random() > 0.5 ? 'Male' : 'Female'),
          dateOfBirth: row['Date of Birth'] || row.dateOfBirth || "2008-01-01",
          strengths: row.Strengths ? row.Strengths.split(',').map(s => s.trim()) : ["General Arts"],
          weaknesses: row.Weaknesses ? row.Weaknesses.split(',').map(s => s.trim()) : ["Mathematics"],
          mockTests: []
        }));
        let imported = 0;
        for (const student of newStudents) {
          try {
            await axios.post('http://localhost:4000/api/students', student);
            imported++;
          } catch (err) {
          }
        }
        const response = await axios.get('http://localhost:4000/api/students');
        setStudents(response.data);
        setImportMessage(`Successfully imported ${imported} students!`);
        setTimeout(() => setImportMessage(''), 3000);
      } catch (error) {
        setImportMessage('Error importing file. Please check the format.');
        setTimeout(() => setImportMessage(''), 3000);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleImportMockTests = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        let importedCount = 0;
        for (const row of jsonData) {
          const studentIndex = row['Index Number'] || row.indexNumber;
          let student = students.find(s => s.indexNumber === studentIndex);
          if (!student) continue;
          const scores = {
            ENG: parseInt(row['English Language'] || row.ENG || 0),
            MATH: parseInt(row['Mathematics'] || row.MATH || 0),
            SCI: parseInt(row['Integrated Science'] || row.SCI || 0),
            SOC: parseInt(row['Social Studies'] || row.SOC || 0),
            RME: parseInt(row['Religious & Moral Education'] || row.RME || 0),
            ICT: parseInt(row['Information & Communication Technology'] || row.ICT || 0),
            GHL: parseInt(row['Ghanaian Language'] || row.GHL || 0),
            FRN: parseInt(row['French'] || row.FRN || 0)
          };
          const aggregate = calculateAggregate(scores);
          const category = getSchoolCategory(aggregate);
          const availableSchools = SCHOOLS_DATA[category] || [];
          const newTest = {
            testId: `MT${Date.now()}_${importedCount}`,
            testName: row['Test Name'] || row.testName || 'Imported Test',
            date: row['Date'] || row.date || new Date().toISOString().split('T')[0],
            scores,
            aggregate,
            category,
            predictedSchool: availableSchools[0]?.name || 'No placement available',
            predictedProgram: availableSchools[0]?.programs[0] || 'N/A'
          };
          const updatedStudent = {
            ...student,
            mockTests: [...student.mockTests, newTest]
          };
          try {
            await axios.post('http://localhost:4000/api/students', updatedStudent);
            importedCount++;
          } catch (err) {
          }
        }
        const response = await axios.get('http://localhost:4000/api/students');
        setStudents(response.data);
        setImportMessage(`Successfully imported ${importedCount} mock test results!`);
        setTimeout(() => setImportMessage(''), 3000);
      } catch (error) {
        setImportMessage('Error importing file. Please check the format.');
        setTimeout(() => setImportMessage(''), 3000);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const getStudentById = (id) => students.find(s => s.id === id);

  const getTopPerformers = (count = 5) => {
    return students
      .filter(s => s.mockTests.length > 0)
      .sort((a, b) => {
        const aggA = a.mockTests[a.mockTests.length - 1]?.aggregate || 100;
        const aggB = b.mockTests[b.mockTests.length - 1]?.aggregate || 100;
        return aggA - aggB;
      })
      .slice(0, count);
  };

  const getDashboardStats = () => {
    const totalStudents = students.length;
    const topPerformers = getTopPerformers(5);
    
    const genderDistribution = {
      'Male': students.filter(s => s.gender === 'Male').length,
      'Female': students.filter(s => s.gender === 'Female').length
    };
    
    const performanceDistribution = {
      'Category A': students.filter(s => {
        const latest = s.mockTests[s.mockTests.length - 1];
        return latest && latest.category === 'Category A (Top Tier)';
      }).length,
      'Category B': students.filter(s => {
        const latest = s.mockTests[s.mockTests.length - 1];
        return latest && latest.category === 'Category B (Good Schools)';
      }).length,
      'Category C': students.filter(s => {
        const latest = s.mockTests[s.mockTests.length - 1];
        return latest && latest.category === 'Category C (Standard Schools)';
      }).length
    };

    const studentsWithTests = students.filter(s => s.mockTests.length > 0);
    const averageAggregate = studentsWithTests.length > 0 
      ? (studentsWithTests.reduce((sum, s) => {
          const latest = s.mockTests[s.mockTests.length - 1];
          return sum + (latest?.aggregate || 30);
        }, 0) / studentsWithTests.length).toFixed(1)
      : 0;

    const studentsWithMultipleTests = students.filter(s => s.mockTests.length > 1);
    const improvedStudents = studentsWithMultipleTests.filter(s => {
      const tests = s.mockTests.sort((a, b) => new Date(a.date) - new Date(b.date));
      return tests[tests.length - 1].aggregate < tests[0].aggregate;
    }).length;
    const improvementRate = studentsWithMultipleTests.length > 0 
      ? ((improvedStudents / studentsWithMultipleTests.length) * 100).toFixed(1)
      : 0;

    return {
      totalStudents,
      topPerformers,
      genderDistribution,
      performanceDistribution,
      averageAggregate,
      improvementRate,
      studentsWithTests: studentsWithTests.length
    };
  };

  const generateReportData = () => {
    const stats = getDashboardStats();
    
    const performanceData = [
      { label: 'Category A', value: stats.performanceDistribution['Category A'] },
      { label: 'Category B', value: stats.performanceDistribution['Category B'] },
      { label: 'Category C', value: stats.performanceDistribution['Category C'] }
    ];
    
    const genderData = [
      { label: 'Male', value: stats.genderDistribution['Male'] },
      { label: 'Female', value: stats.genderDistribution['Female'] }
    ];
    
    const subjectPerformance = MOCK_SUBJECTS.map(subject => {
      const studentsWithSubject = students.filter(s => s.mockTests.length > 0);
      const averageScore = studentsWithSubject.length > 0 
        ? (studentsWithSubject.reduce((sum, s) => {
            const latestTest = s.mockTests[s.mockTests.length - 1];
            return sum + (latestTest?.scores[subject.code] || 0);
          }, 0) / studentsWithSubject.length).toFixed(1)
        : 0;
      
      return {
        label: subject.name,
        value: parseFloat(averageScore)
      };
    });
    
    const improvementTrend = students
      .filter(s => s.mockTests.length > 1)
      .map(s => {
        const tests = s.mockTests.sort((a, b) => new Date(a.date) - new Date(b.date));
        const firstAggregate = tests[0].aggregate;
        const lastAggregate = tests[tests.length - 1].aggregate;
        return {
          student: s.name,
          improvement: firstAggregate - lastAggregate
        };
      })
      .sort((a, b) => b.improvement - a.improvement)
      .slice(0, 10);
    
    const schoolPredictions = {};
    students.forEach(s => {
      const latestTest = s.mockTests[s.mockTests.length - 1];
      if (latestTest && latestTest.predictedSchool) {
        const school = latestTest.predictedSchool;
        schoolPredictions[school] = (schoolPredictions[school] || 0) + 1;
      }
    });
    
    const topSchools = Object.entries(schoolPredictions)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8)
      .map(([school, count]) => ({ label: school, value: count }));
    
    return {
      performanceData,
      genderData,
      subjectPerformance,
      improvementTrend,
      topSchools,
      stats
    };
  };

  const NavTabs = () => (
    <div className="nav-tabs">
      <button className={`nav-tab ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentView('dashboard')}>📊 Dashboard</button>
      <button className={`nav-tab ${currentView === 'students' ? 'active' : ''}`} onClick={() => setCurrentView('students')}>👥 Students</button>
      <button className={`nav-tab ${currentView === 'add-test' ? 'active' : ''}`} onClick={() => setCurrentView('add-test')}>➕ Add Mock Test</button>
      <button className={`nav-tab ${currentView === 'reports' ? 'active' : ''}`} onClick={() => setCurrentView('reports')}>📈 Reports</button>
    </div>
  );

  if (currentView === 'dashboard') {
    const stats = getDashboardStats();
    return <>
      <NavTabs />
      <Dashboard
        stats={stats}
        importMessage={importMessage}
        handleImportStudents={handleImportStudents}
        handleImportMockTests={handleImportMockTests}
      />
    </>;
  }
  if (currentView === 'students') {
    return <>
      <NavTabs />
      <Students
        students={students}
        filterGender={filterGender}
        setFilterGender={setFilterGender}
        filterPerformance={filterPerformance}
        setFilterPerformance={setFilterPerformance}
        getFilteredStudents={getFilteredStudents}
        setSelectedStudent={setSelectedStudent}
        setCurrentView={setCurrentView}
      />
    </>;
  }
  if (currentView === 'add-test') {
    return <>
      <NavTabs />
      <AddTest
        students={students}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
        getStudentById={getStudentById}
        newMockTest={newMockTest}
        setNewMockTest={setNewMockTest}
        handleNewTestScoreChange={handleNewTestScoreChange}
        addMockTestToStudent={addMockTestToStudent}
      />
    </>;
  }
  if (currentView === 'reports') {
    const reportData = generateReportData();
    return <>
      <NavTabs />
      <Reports reportData={reportData} />
    </>;
  }
  return null;
}
