// Simple Chart Component for Performance Reports
import React from 'react';

export const BarChart = ({ data, title, colors = ['#0078d4', '#00bcf2', '#8764b8', '#107c10', '#ff8c00', '#d13438', '#ffb900', '#43e97b'] }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="chart-container">
      <h3>{title}</h3>
      <div className="bar-chart">
        {data.map((item, index) => (
          <div key={item.label} className="bar-item">
            <div className="bar-label">{item.label}</div>
            <div className="bar-wrapper">
              <div 
                className="bar-fill"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: colors[index % colors.length]
                }}
              />
              <div className="bar-value">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PieChart = ({ data, title, colors = ['#0078d4', '#00bcf2', '#8764b8', '#107c10', '#ff8c00', '#d13438', '#ffb900', '#43e97b'] }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;
  
  return (
    <div className="chart-container">
      <h3>{title}</h3>
      <div className="pie-chart">
        <div className="pie-chart-svg">
          <svg width="200" height="200" viewBox="0 0 200 200">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const startAngle = (cumulativePercentage / 100) * 360;
              const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
              cumulativePercentage += percentage;
              
              const startAngleRad = (startAngle - 90) * (Math.PI / 180);
              const endAngleRad = (endAngle - 90) * (Math.PI / 180);
              
              const largeArcFlag = percentage > 50 ? 1 : 0;
              
              const x1 = 100 + 80 * Math.cos(startAngleRad);
              const y1 = 100 + 80 * Math.sin(startAngleRad);
              const x2 = 100 + 80 * Math.cos(endAngleRad);
              const y2 = 100 + 80 * Math.sin(endAngleRad);
              
              const pathData = [
                `M 100 100`,
                `L ${x1} ${y1}`,
                `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`
              ].join(' ');
              
              return (
                <path
                  key={item.label}
                  d={pathData}
                  fill={colors[index % colors.length]}
                  stroke="#fff"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>
        <div className="pie-legend">
          {data.map((item, index) => (
            <div key={item.label} className="legend-item">
              <div 
                className="legend-color"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="legend-label">{item.label}</span>
              <span className="legend-value">({item.value})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const LineChart = ({ data, title, color = '#0078d4' }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const minValue = Math.min(...data.map(item => item.value));
  const range = maxValue - minValue;
  
  return (
    <div className="chart-container">
      <h3>{title}</h3>
      <div className="line-chart">
        <svg width="100%" height="200" viewBox="0 0 400 200">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
              <stop offset="100%" stopColor={color} stopOpacity="0"/>
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(percentage => (
            <line
              key={percentage}
              x1="0"
              y1={200 - (percentage / 100) * 180}
              x2="400"
              y2={200 - (percentage / 100) * 180}
              stroke="#e0e0e0"
              strokeWidth="1"
            />
          ))}
          
          {/* Data line */}
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="3"
            points={data.map((item, index) => {
              const x = (index / (data.length - 1)) * 380 + 10;
              const y = 200 - ((item.value - minValue) / range) * 180 - 10;
              return `${x},${y}`;
            }).join(' ')}
          />
          
          {/* Data points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 380 + 10;
            const y = 200 - ((item.value - minValue) / range) * 180 - 10;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill={color}
                stroke="#fff"
                strokeWidth="2"
              />
            );
          })}
          
          {/* Area under curve */}
          <polygon
            fill="url(#lineGradient)"
            points={[
              `10,200`,
              ...data.map((item, index) => {
                const x = (index / (data.length - 1)) * 380 + 10;
                const y = 200 - ((item.value - minValue) / range) * 180 - 10;
                return `${x},${y}`;
              }),
              `390,200`
            ].join(' ')}
          />
        </svg>
        
        <div className="line-chart-labels">
          {data.map((item, index) => (
            <div key={index} className="line-label">
              <span className="line-label-text">{item.label}</span>
              <span className="line-label-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
