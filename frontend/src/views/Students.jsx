import React from "react";

export default function Students({
  students,
  filterGender,
  setFilterGender,
  filterPerformance,
  setFilterPerformance,
  getFilteredStudents,
  setSelectedStudent,
  setCurrentView
}) {
  const filteredStudents = getFilteredStudents();
  return (
    <div className="container">
      <div className="header">
        <h1>👥 Student Management</h1>
        <p className="subtitle">View and manage student records and mock test history</p>
      </div>
      {/* Navigation is handled in App */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Filter by Gender:</label>
          <select className="filter-select" value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
            <option value="all">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Filter by Performance:</label>
          <select className="filter-select" value={filterPerformance} onChange={(e) => setFilterPerformance(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="Category A (Top Tier)">Category A</option>
            <option value="Category B (Good Schools)">Category B</option>
            <option value="Category C (Standard Schools)">Category C</option>
          </select>
        </div>
      </div>
      <div className="section">
        <h2>Student Records ({filteredStudents.length} students)</h2>
        <div className="students-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Index Number</th>
                <th>Gender</th>
                <th>Class</th>
                <th>Latest Aggregate</th>
                <th>Category</th>
                <th>Predicted School</th>
                <th>Tests Taken</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const latestTest = student.mockTests[student.mockTests.length - 1];
                return (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.indexNumber}</td>
                    <td>{student.gender}</td>
                    <td>{student.class}</td>
                    <td>{latestTest?.aggregate || 'N/A'}</td>
                    <td>{latestTest?.category || 'N/A'}</td>
                    <td>{latestTest?.predictedSchool || 'N/A'}</td>
                    <td>{student.mockTests.length}</td>
                    <td>
                      <button
                        className="btn-small"
                        onClick={() => {
                          setSelectedStudent(student);
                          setCurrentView('add-test');
                        }}
                      >
                        Add Test
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
