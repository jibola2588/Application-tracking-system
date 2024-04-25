import mongoose from 'mongoose';

const ApplyJobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    about: {
        type: String,
    },
    companyName: {
        type: String,
    },
    type: {
        type: String,
        default: 'Remote',
    },
    designation: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    cv: {
        type: String,
        // required: true,
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'accepted', 'rejected']
    },
    appliedAt: {
        type: Date,
        default: Date.now,
      },
}, { timestamps: true });


const AppliedJobModel =  mongoose.model('AppliedJob', ApplyJobSchema);

export {AppliedJobModel as AppliedJob};