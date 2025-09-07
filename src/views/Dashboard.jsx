import React from "react";
import { BarChart, PieChart } from "../components/SimpleChart.jsx";

export default function Dashboard({
  stats,
  importMessage,
  handleImportStudents,
  handleImportMockTests
}) {
  return (
    <div className="container">
      <div className="header">
        <h1>🏫 Steadfast Academy - Student Management System</h1>
        <p className="subtitle">Track and manage student mock test performance and school placement predictions</p>
      </div>
      {/* Navigation is handled in App */}
      <div className="section">
        <h2>📁 Import Data</h2>
        <div className="import-section">
          <div className="import-group">
            <label className="btn-import">
              📊 Import Students
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleImportStudents}
                style={{ display: "none" }}
              />
            </label>
            <p className="import-note">Excel format: Name, Index Number, Gender, Date of Birth, Strengths, Weaknesses</p>
          </div>
          <div className="import-group">
            <label className="btn-import">
              📝 Import Mock Tests
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleImportMockTests}
                style={{ display: "none" }}
              />
            </label>
            <p className="import-note">Excel format: Index Number, Test Name, Date, English Language, Mathematics, Integrated Science, Social Studies, RME, ICT, Ghanaian Language, French</p>
          </div>
        </div>
        {importMessage && (
          <div className={`import-message ${importMessage.includes('Error') ? 'error' : 'success'}`}>
            {importMessage}
          </div>
        )}
      </div>
      <div className="dashboard-grid">
        <div className="stat-card">
          <h3>Total Students</h3>
          <div className="stat-number">{stats.totalStudents}</div>
        </div>
        <div className="stat-card">
          <h3>Students with Tests</h3>
          <div className="stat-number">{stats.studentsWithTests}</div>
        </div>
        <div className="stat-card">
          <h3>Average Aggregate</h3>
          <div className="stat-number">{stats.averageAggregate}</div>
        </div>
        <div className="stat-card">
          <h3>Improvement Rate</h3>
          <div className="stat-number">{stats.improvementRate}%</div>
        </div>
      </div>
      <div className="dashboard-grid">
        <div className="stat-card category-a">
          <h3>Category A (Top Tier)</h3>
          <div className="stat-number">{stats.performanceDistribution['Category A']}</div>
          <div className="stat-percentage">
            {((stats.performanceDistribution['Category A'] / stats.totalStudents) * 100).toFixed(1)}%
          </div>
        </div>
        <div className="stat-card category-b">
          <h3>Category B (Good Schools)</h3>
          <div className="stat-number">{stats.performanceDistribution['Category B']}</div>
          <div className="stat-percentage">
            {((stats.performanceDistribution['Category B'] / stats.totalStudents) * 100).toFixed(1)}%
          </div>
        </div>
        <div className="stat-card category-c">
          <h3>Category C (Standard)</h3>
          <div className="stat-number">{stats.performanceDistribution['Category C']}</div>
          <div className="stat-percentage">
            {((stats.performanceDistribution['Category C'] / stats.totalStudents) * 100).toFixed(1)}%
          </div>
        </div>
      </div>
      <div className="section">
        <h2>🏆 Top Performers</h2>
        <div className="performers-grid">
          {stats.topPerformers.map((student, index) => {
            const latestTest = student.mockTests[student.mockTests.length - 1];
            return (
              <div key={student.id} className="performer-card">
                <div className="performer-rank">#{index + 1}</div>
                <h4>{student.name}</h4>
                <p><strong>Class:</strong> {student.class}</p>
                <p><strong>Latest Aggregate:</strong> {latestTest?.aggregate || 'N/A'}</p>
                <p><strong>Category:</strong> {latestTest?.category || 'N/A'}</p>
                <p><strong>Predicted School:</strong> {latestTest?.predictedSchool || 'N/A'}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="section">
        <h2>👥 Gender Distribution</h2>
        <div className="gender-distribution">
          {Object.entries(stats.genderDistribution).map(([gender, count]) => (
            <div key={gender} className="gender-item">
              <h4>{gender}</h4>
              <div className="gender-count">{count} students</div>
              <div className="gender-percentage">
                {((count / stats.totalStudents) * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
