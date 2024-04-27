import mongoose from "mongoose";

const schoolDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  qual: {
    type: String,
    required: true
  },
  startD: {
    type: Date,
    required: true
  },
  endD: {
    type: Date,
    required: true
  }
});

const workDataSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  startD: {
    type: Date,
    required: true
  },
  endD: {
    type: Date,
    required: true
  }
});

const resumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  }
});

const personalSchema = new mongoose.Schema({
  gender: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  job: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
});

const applicantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
},
  personal: personalSchema,
  skills: [String],
  resume: resumeSchema,
  schoolData: [schoolDataSchema],
  workData: [workDataSchema]
});

const ApplicantModel = mongoose.model("Applicant", applicantSchema);

export {ApplicantModel as Applicant};