# 🏫 Steadfast Academy - Student Management System

A comprehensive student management system designed for **Steadfast Academy** staff to track and manage JHS students' mock test performance and predict their Senior High School placement. This system helps teachers make informed decisions about student progress and provides insights for academic improvement.

## 🌟 Features

### For Steadfast Academy Staff
- **Student Database**: Pre-loaded with 10 sample students from JHS 3A, 3B, and 3C
- **Mock Test Management**: Add and track multiple mock tests per student
- **Performance Tracking**: Monitor student progress across different test periods
- **Aggregate Calculation**: Automatic calculation of BECE-style aggregates
- **School Placement Prediction**: Predict which schools students are likely to be placed in
- **Dashboard Analytics**: Overview of student performance across all classes
- **Filtering & Search**: Filter students by class and performance category
- **Progress Monitoring**: Track improvement trends over time

### Student Management
- **Individual Student Profiles**: Complete academic profiles with strengths and weaknesses
- **Mock Test History**: Track all mock tests taken by each student
- **Performance Categories**: Automatic categorization (A, B, C) based on aggregates
- **School Predictions**: Real-time placement predictions for each test
- **Academic Insights**: Identify student strengths and areas for improvement

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm (version 8 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mock-school-placement-simulator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 📊 How It Works

### Aggregate Calculation
The system calculates a student's aggregate based on their mock test scores:
- **Core Subjects**: English, Mathematics, Integrated Science, Social Studies (weighted equally)
- **Elective Subjects**: RME, ICT, Ghanaian Language, French (weighted at 50%)
- **Aggregate Range**: 1-30 (lower is better, following BECE standards)

### School Categories
- **Category A (Top Tier)**: Aggregate 1-6 (Achimota, PRESEC, Wesley Girls, etc.)
- **Category B (Good Schools)**: Aggregate 7-15 (Ghana National College, St. Peter's, etc.)
- **Category C (Standard Schools)**: Aggregate 16-30 (St. Monica's, St. John's, etc.)

### Placement Algorithm
1. Calculate student's aggregate from mock scores
2. Determine eligible school category
3. Match student preferences with available schools
4. Suggest best available placement
5. Provide motivational feedback and study advice

## 🏗️ Architecture

### Frontend Structure
```
src/
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
├── styles.css             # Modern, responsive styling
├── data/
│   └── schoolsData.js     # School information and categories
└── utils/
    ├── constants.js       # Application constants
    └── placementCalculator.js # Core placement logic
```

### Backend Ready
The codebase is structured to easily support backend integration:
- **Modular Design**: Business logic separated from UI components
- **API Endpoints**: Predefined endpoints for future backend integration
- **Data Validation**: Input validation ready for server-side implementation
- **Export Functions**: Ready for server-side file generation

## 🎨 Design Features

- **Modern UI**: Clean, professional design with gradient backgrounds
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Accessible**: Proper contrast ratios and keyboard navigation
- **Motivational**: Color-coded feedback and encouraging messages
- **Print-Friendly**: Optimized for printing results

## 🔧 Configuration

### Adding New Schools
Edit `src/data/schoolsData.js` to add new schools:

```javascript
{
  name: "School Name",
  code: "1000001",
  region: "Region Name",
  programs: ["Science", "General Arts", "Business"],
  capacity: 500,
  cutoffs: { maxAggregate: 6 }
}
```

### Modifying Aggregate Thresholds
Update `src/utils/constants.js`:

```javascript
export const AGGREGATE_THRESHOLDS = {
  TOP_TIER: 6,    // Category A schools
  GOOD: 15        // Category B schools
};
```

## 📱 Usage

### For Students
1. **Enter Personal Information**: Name and index number
2. **Input Mock Scores**: Enter scores for each subject (0-100)
3. **Select Preferences**: Choose preferred schools and programs
4. **Calculate Placement**: Click "Calculate My Placement"
5. **Review Results**: See your predicted placement and get study advice

### For Teachers/Administrators
1. **Access Admin Panel**: Click the admin button (bottom right)
2. **Manage Data**: Add/edit students and schools
3. **Export Results**: Generate reports in various formats
4. **Monitor Performance**: Track student progress over time

## 🚀 Future Enhancements

- [ ] **Backend Integration**: Full server-side implementation
- [ ] **User Authentication**: Student and teacher accounts
- [ ] **Progress Tracking**: Historical performance monitoring
- [ ] **Advanced Analytics**: Detailed performance insights
- [ ] **Mobile App**: Native mobile application
- [ ] **Offline Support**: Work without internet connection
- [ ] **Multi-language**: Support for local languages
- [ ] **Integration**: Connect with school management systems

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Ghana Education Service for the school placement system inspiration
- All the schools and students who provided feedback
- The React and Vite communities for excellent tooling

## 📞 Support

For support, questions, or feature requests:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**Made with ❤️ for Ghanaian students and educators**
