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
  salary: {
    type: String,
    required: true
  },
  exp: {
    type: String,
    required: true
  },
  qual: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    required: true,
    enum: ["contract", "Part time", "Full time"]
  },
  deadline: {
    type: Date,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  timePosted: {
    type: Date,
    default: Date.now
  },
  count: {
    type: Number,
    default: 0
  },
  daysLeft: {
    type: Number,
  }
});

JobSchema.post('save', async function(doc, next) {
  try {
    const count = await this.model('Jobs').countDocuments({ _id: this._id });
    this.count = count;
    await this.save();
    next();
  } catch (err) {
    next(err);
  }
});


const JobModel = mongoose.model("Jobs", JobSchema);

export {JobModel as Jobs};