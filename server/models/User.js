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
    resetToken:String,
    expireToken:Date,
}, { timestamps: true })

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})



UserSchema.statics.loginVerificationCode = async function (email, password, role, active) {
    if (role === "Applicant") {
        const users = await this.find({ email, role: "Applicant" });
        if (users.length > 0) {
            return users[0];
        }
    } else {
        const user = await this.findOne({ email });
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                return user;
            }
            throw new Error('Incorrect password');
        }
    }
    throw new Error('Incorrect email');
}

const UserModel = mongoose.model("User", UserSchema)

export {UserModel as User};