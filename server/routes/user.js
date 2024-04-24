import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { OTP } from "../models/Otp.js";

import jwt from "jsonwebtoken";
let currentSite = "";

import validator from "validator";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import { generateOTP } from "../util/generateOTP.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, password } = req.body;
  const user = await User.findOne({ email });

  try {
    if (user) {
      return res.json({ message: "User already exists" });
    }
    
    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      role: "Applicant",
    });

    await newUser.save();

    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // Do not hash the OTP before storing
    await OTP.create({ email, otp, name: "register_otp" });
    
    // Send the OTP via email
    sendOTPByEmail(email, otp);
    
    return res.status(200).json({ message: "OTP sent successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to send OTP", error: error, success: false });
  }
});

router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user, req.body, "LOG CHECK");
    if (!user) {
      return res.json({ status: false, message: "User does not exist" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.json({ status: false, message: "Password does not match" });
    }

    // Password matches, generate JWT token
    const token = jwt.sign({ email: user.email }, process.env.KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { maxAge: 360000, httpOnly: true });

    // Return success response
    return res.status(200).json({ success: "Login successfully", data: token , body: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get("/getUsers", async (req, res) => {
  try {
    const result = await User.find();
    res
      .status(200)
      .json({ result, message: "all users get successfully", success: true });
  } catch (error) {
    res
      .status(404)
      .json({
        message: "error in getAllUsers - controllers/user.js",
        error,
        success: false,
      });
  }
});

router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    // Validate email
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email field is required", success: false });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({
          message: "Invalid email format. Please provide a valid email.",
          success: false,
        });
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const hashedOTP = await bcrypt.hash(otp, 12);

    try {
      // Attempt to insert the OTP document
      await OTP.create({ email, otp: hashedOTP, name: "register_otp" });
      // Send the OTP via email
      sendOTPByEmail(email, otp);
      return res
        .status(200)
        .json({ message: "OTP sent successfully", success: true });
    } catch (error) {
      if (error.code === 11000 && error.keyValue.email === email) {
        // Duplicate key error for the same email
        // Resend OTP
        sendOTPByEmail(email, otp);
        return res
          .status(200)
          .json({ message: "OTP resent successfully", success: true });
      } else {
        // Other errors
        console.error(error);
        return res
          .status(500)
          .json({
            message: "Failed to send OTP",
            error: error,
            success: false,
          });
      }
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error, success: false });
  }
});

router.post("/send-forget-pass-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const isEmailAlreadyReg = await User.findOne({ email });

    if (!email)
      return res
        .status(400)
        .json({ message: "email field is required", success: false });
    // in forget password route, user should be registered already
    if (!isEmailAlreadyReg)
      return res
        .status(400)
        .json({ message: `no user exist with email ${email}`, success: false });
    if (!validator.isEmail(email))
      return res
        .status(400)
        .json({
          message: `email pattern failed. Please provide a valid email.`,
          success: false,
        });

    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const hashedOTP = await bcrypt.hash(otp, 12);
    const newOTP = await OTP.create({
      email,
      otp: hashedOTP,
      name: "forget_password_otp",
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verification",
      html: `<p>Your OTP code is ${otp}</p>`, // all data to be sent
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else return null; //console.log(info);
    });

    res
      .status(200)
      .json({
        result: newOTP,
        otp,
        message: "forget_password_otp send successfully",
        success: true,
      });
  } catch (error) {
    res
      .status(404)
      .json({
        message: "error in sendForgetPasswordOTP - controllers/user.js",
        error,
        success: false,
      });
  }
});

router.put("/change-password", async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    if (!email || !password || !otp)
      return res
        .status(400)
        .json({
          message: "make sure to provide all the fieds ( email, password, otp)",
          success: false,
        });
    if (!validator.isEmail(email))
      return res
        .status(400)
        .json({
          message: `email pattern failed. Please provide a valid email.`,
          success: false,
        });

    const findedUser = await User.findOne({ email });
    if (!findedUser)
      return res
        .status(400)
        .json({
          message: `user with email ${email} is not exist `,
          success: false,
        });

    const otpHolder = await OTP.find({ email });
    if (otpHolder.length == 0)
      return res
        .status(400)
        .json({ message: "you have entered an expired otp", success: false });

    const forg_pass_otps = otpHolder.filter(
      (otp) => otp.name == "forget_password_otp"
    ); // otp may be sent multiple times to user. So there may be multiple otps with user email stored in dbs. But we need only last one.
    const findedOTP = forg_pass_otps[forg_pass_otps.length - 1];

    const plainOTP = otp;
    const hashedOTP = findedOTP.otp;

    const isValidOTP = await bcrypt.compare(plainOTP, hashedOTP);

    if (isValidOTP) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await User.findByIdAndUpdate(
        findedUser._id,
        { name: findedUser.name, email, password: hashedPassword },
        { new: true }
      );

      await OTP.deleteMany({ email: findedOTP.email });

      return res
        .status(200)
        .json({
          result,
          message: "password changed successfully",
          success: true,
        });
    } else {
      return res.status(200).json({ message: "wrong otp", success: false });
    }
  } catch (error) {
    res
      .status(404)
      .json({
        message: "error in changePassword - controllers/user.js",
        error,
        success: false,
      });
  }
});

const OTP_EXPIRATION_TIME = 300000; // 5 minutes in milliseconds

router.post("/verify-login", async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: false, message: "User does not exist" });
    }

    // Find the OTP record by email
    const otpRecord = await OTP.findOne({ email });

    // If OTP record not found
    if (!otpRecord) {
      return res.json({ status: false, message: "No OTP record found" });
    }

    // Compare the provided OTP with the hashed OTP stored in the database
    const isMatch = await bcrypt.compare(otp, otpRecord.otp);
    if (!isMatch) {
      return res.json({ status: false, message: "Invalid OTP" });
    }

    // Clear the OTP record after successful verification
    await OTP.deleteOne({ email });

    // Generate JWT token for authentication
    const token = jwt.sign({ email: user.email }, process.env.KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { maxAge: 360000, httpOnly: true });

    // Return success response
    return res.status(200).json({ success: "Login successful", data: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, process.env.KEY, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User not registered!" });
    }
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, process.env.KEY, {
      expiresIn: "5m",
    });
    const link = `http://localhost:5173/reset-password/${token}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) {}
});

router.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = process.env.KEY + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

router.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = process.env.KEY + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});

router.delete("/deleteUsers", async (req, res) => {
  try {
    const result = await User.deleteMany();
    res
      .status(200)
      .json({
        result,
        message: `User collection deleted successfully `,
        success: true,
      });
  } catch (err) {
    res
      .status(404)
      .json({
        message: "error in deleteAllUsers - controllers/user.js",
        success: false,
      });
  }
});

function sendOTPByEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verification",
    html: `<p>Your OTP code is ${otp}</p>`,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}
const sendVerificationCode = (to, code) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // your email address
      pass: process.env.PASS, // your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: "2FA AUTHENTICATION CODE",
    html: `<div style="padding: 30px; background-color: #3758F9; box-shadow: 0 4px 8px #3758F9; text-align: center;">
          <p style="color: white; font-size: 28px;">${to}: ${code}</p>
       </div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  console.log(`Verification code sent to ${to}: ${code}`);
};

const sendVerificationEmail = (to, link) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // your email address
      pass: process.env.PASS, // your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: "Email Verification",
    html: `<div style="padding: 30px; background-color: #3758F9; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); text-align: center;">
          <p style="fontSize: 28px; color: #fff;"><a style="color: #fff; textDecoration: underline" href="${link}">LOGIN WITH THIS LINK TO VERIFY YOUR EMAIL</a></p>
       </div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export { router as UserRouter };
