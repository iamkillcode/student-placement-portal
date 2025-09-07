import React from "react";
import { BarChart, PieChart } from "../components/SimpleChart.jsx";
import { calculateAggregateAndRaw } from "../utils/placementCalculator.js";

export default function Reports({ reportData }) {
  return (
    <div className="container">
      <div className="header">
        <h1>📈 Performance Reports & Analytics</h1>
        <p className="subtitle">Comprehensive analysis of student performance and placement predictions</p>
      </div>
      {/* Navigation is handled in App */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <h3>Total Students</h3>
          <div className="stat-number">{reportData.stats.totalStudents}</div>
        </div>
        <div className="stat-card">
          <h3>Average Aggregate</h3>
          <div className="stat-number">{reportData.stats.averageAggregate}</div>
        </div>
        <div className="stat-card">
          <h3>Improvement Rate</h3>
          <div className="stat-number">{reportData.stats.improvementRate}%</div>
        </div>
        <div className="stat-card">
          <h3>Students with Tests</h3>
          <div className="stat-number">{reportData.stats.studentsWithTests}</div>
        </div>
      </div>
      <div className="charts-grid">
        <div className="chart-section">
          <PieChart
            data={reportData.performanceData}
            title="Performance Distribution"
            colors={["#107c10", "#ff8c00", "#d13438"]}
          />
        </div>
        <div className="chart-section">
          <PieChart
            data={reportData.genderData}
            title="Gender Distribution"
            colors={["#0078d4", "#00bcf2"]}
          />
        </div>
      </div>
      <div className="section">
        <BarChart
          data={reportData.subjectPerformance}
          title="Average Subject Performance"
          colors={["#0078d4", "#00bcf2", "#8764b8", "#107c10", "#ff8c00", "#d13438", "#ffb900", "#43e97b"]}
        />
      </div>
      <div className="section">
        <BarChart
          data={reportData.topSchools}
          title="Top Predicted School Placements"
          colors={["#0078d4", "#00bcf2", "#8764b8", "#107c10", "#ff8c00", "#d13438", "#ffb900", "#43e97b"]}
        />
      </div>
      <div className="section">
        <h2>📈 Student Improvement Analysis</h2>
        <div className="improvement-table">
          <table>
            <thead>
              <tr style={{ color: 'black' }}>
                <th>Student Name</th>
                <th>Raw Score (Latest)</th>
                <th>Aggregate (Latest)</th>
                <th>Improvement (Aggregate Points)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reportData.improvementTrend.map((item, index) => {
                // Find student in reportData.stats.topPerformers or students list if available
                const student = reportData.stats.topPerformers.find(s => s.name === item.student) || {};
                const tests = student.mockTests || [];
                const latestTest = tests[tests.length - 1] || {};
                const { aggregate, rawTotal } = latestTest.scores ? calculateAggregateAndRaw(latestTest.scores) : { aggregate: 'N/A', rawTotal: 'N/A' };
                return (
                  <tr key={index} style={{ color: 'black' }}>
                    <td>{item.student}</td>
                    <td style={{ color: 'black', fontWeight: 600 }}>{rawTotal !== undefined ? rawTotal : 'N/A'}</td>
                    <td style={{ color: 'black', fontWeight: 600 }}>{aggregate !== undefined ? aggregate : 'N/A'}</td>
                    <td>
                      <span className={`improvement-value ${item.improvement > 0 ? 'positive' : item.improvement < 0 ? 'negative' : 'neutral'}`} style={{ color: item.improvement > 0 ? '#107c10' : item.improvement < 0 ? '#d13438' : '#333' }}>
                        {item.improvement > 0 ? '+' : ''}{item.improvement}
                      </span>
                    </td>
                    <td>
                      <span className={`improvement-status ${item.improvement > 0 ? 'improved' : item.improvement < 0 ? 'declined' : 'stable'}`} style={{ color: item.improvement > 0 ? '#107c10' : item.improvement < 0 ? '#d13438' : '#0078d4', fontWeight: 600 }}>
                        {item.improvement > 0 ? '📈 Improved' : item.improvement < 0 ? '📉 Declined' : '➡️ Stable'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="section">
        <h2>🎯 Placement Predictions Summary</h2>
        <div className="predictions-summary">
          <div className="prediction-category">
            <h3>Category A (Top Tier) - {reportData.performanceData[0].value} students</h3>
            <p>These students are predicted to gain admission to prestigious schools like Achimota, PRESEC, Wesley Girls, etc.</p>
          </div>
          <div className="prediction-category">
            <h3>Category B (Good Schools) - {reportData.performanceData[1].value} students</h3>
            <p>These students are likely to be placed in good quality schools with strong academic programs.</p>
          </div>
          <div className="prediction-category">
            <h3>Category C (Standard Schools) - {reportData.performanceData[2].value} students</h3>
            <p>These students may need additional support to improve their performance and reach higher categories.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
