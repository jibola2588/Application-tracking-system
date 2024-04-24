import mongoose from 'mongoose';
// import User from './User';
// import Job from './Job';

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
    }
}, { timestamps: true });


const AppliedJobModel =  mongoose.model('AppliedJob', ApplyJobSchema);

export {AppliedJobModel as AppliedJob};