import express from "express";
import { OTP } from "../models/Otp.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, subject, message, duration } = req.body;

    const createOTP = await OTP.create({
      email,
      subject,
      message,
      duration,
    });

    await sendOTP({
      email,
      subject,
      message,
      duration,
    });

    res.status(201).send(createOTP);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export {router as OTPRouter}