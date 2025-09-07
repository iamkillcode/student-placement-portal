const mongoose = require('mongoose');

const mockTestSchema = new mongoose.Schema({
  testId: String,
  testName: String,
  date: String,
  scores: Object,
  aggregate: Number,
  category: String,
  predictedSchool: String,
  predictedProgram: String
});

const studentSchema = new mongoose.Schema({
  id: String,
  name: String,
  indexNumber: String,
  class: String,
  gender: String,
  dateOfBirth: String,
  strengths: [String],
  weaknesses: [String],
  mockTests: [mockTestSchema]
});

module.exports = mongoose.model('Student', studentSchema);
