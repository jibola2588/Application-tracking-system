import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true, unique: true},
    lastName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {
        type: String,
        enum : ['HR', 'Applicant', 'Admin'],
        default: 'Applicant',
        required: true,
    },
    loginVerificationCode: {
        type: String,
        default: ''
    },
    verificationHash: {
        type: String,
        default: ''
    },
    active:{
        type:Boolean,
        default:true
    },
    otp: {type: String},
    resetToken:String,
    expireToken:Date,
}, { timestamps: true })


const UserModel = mongoose.model("User", UserSchema)

export {UserModel as User};