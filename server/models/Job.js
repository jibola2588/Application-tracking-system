import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  locations: {
    type: [String],
    required: true
  },
  qualifications: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: false
  },
  timePosted: {
    type: String,
    required: true
  },
  applicantsCount: {
    type: Number,
    required: true
  },
  daysLeft: {
    type: Number,
    required: true
  }
});

const JobModel = mongoose.model("Jobs", JobSchema);

export {JobModel as Jobs};