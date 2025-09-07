const Student = require('../models/Student');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add or update a student
exports.addOrUpdateStudent = async (req, res) => {
  try {
    const { id } = req.body;
    let student = await Student.findOne({ id });
    if (student) {
      await Student.updateOne({ id }, req.body);
      student = await Student.findOne({ id });
      res.json(student);
    } else {
      student = new Student(req.body);
      await student.save();
      res.json(student);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
