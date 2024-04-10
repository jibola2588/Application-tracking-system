import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
// },
  email: { type: String, required: true,},
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const OTPModel = mongoose.model("OTP", OTPSchema);

export { OTPModel as OTP };
