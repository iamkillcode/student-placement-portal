import React from "react";
import { MOCK_SUBJECTS } from "../utils/constants.js";

export default function AddTest({
  students,
  selectedStudent,
  setSelectedStudent,
  getStudentById,
  newMockTest,
  setNewMockTest,
  handleNewTestScoreChange,
  addMockTestToStudent
}) {
  return (
    <div className="container">
      <div className="header">
        <h1>➕ Add Mock Test</h1>
        <p className="subtitle">Record a new mock test for a student</p>
      </div>
      {/* Navigation is handled in App */}
      <div className="section">
        <h2>Select Student</h2>
        <div className="student-selector">
          <select
            value={selectedStudent?.id || ''}
            onChange={(e) => setSelectedStudent(getStudentById(e.target.value))}
            className="form-select"
          >
            <option value="">Choose a student...</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.name} - {student.class} ({student.indexNumber})
              </option>
            ))}
          </select>
        </div>
      </div>
      {selectedStudent && (
        <>
          <div className="section">
            <h2>Student Information</h2>
            <div className="student-info">
              <p><strong>Name:</strong> {selectedStudent.name}</p>
              <p><strong>Index Number:</strong> {selectedStudent.indexNumber}</p>
              <p><strong>Gender:</strong> {selectedStudent.gender}</p>
              <p><strong>Class:</strong> {selectedStudent.class}</p>
              <p><strong>Date of Birth:</strong> {selectedStudent.dateOfBirth}</p>
              <p><strong>Strengths:</strong> {selectedStudent.strengths.join(', ')}</p>
              <p><strong>Weaknesses:</strong> {selectedStudent.weaknesses.join(', ')}</p>
            </div>
          </div>
          <div className="section">
            <h2>Mock Test Details</h2>
            <div className="form-row">
              <input
                type="text"
                placeholder="Test Name (e.g., Third Term Mock Test)"
                value={newMockTest.testName}
                onChange={(e) => setNewMockTest(prev => ({ ...prev, testName: e.target.value }))}
                className="form-input"
              />
              <input
                type="date"
                value={newMockTest.date}
                onChange={(e) => setNewMockTest(prev => ({ ...prev, date: e.target.value }))}
                className="form-input"
              />
            </div>
          </div>
          <div className="section">
            <h2>Test Scores</h2>
            <div className="scores-grid">
              {MOCK_SUBJECTS.map((subject) => (
                <div key={subject.code} className="score-item">
                  <label>{subject.name}</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newMockTest.scores[subject.code] || ''}
                    onChange={(e) => handleNewTestScoreChange(subject.code, e.target.value)}
                    className="score-input"
                    placeholder="0-100"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="calculate-section">
            <button
              className="btn-primary calculate-btn"
              onClick={addMockTestToStudent}
              disabled={!newMockTest.testName || Object.keys(newMockTest.scores).length < 4}
            >
              ➕ Add Mock Test
            </button>
            <p className="calculate-note">
              Make sure to enter at least the core subject scores (English, Math, Science, Social Studies)
            </p>
          </div>
        </>
      )}
    </div>
  );
}
