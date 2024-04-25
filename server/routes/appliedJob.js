import express from 'express';
import { AppliedJob } from '../models/AppliedJob.js';
import nodemailer from 'nodemailer';



const router = express.Router();

// Route to list all applications
router.get('/list', async (req, res) => {
  try {
    const applications = await AppliedJob.find();
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to post a new application
router.post('/post', async (req, res) => {
  try {
    const {
      user,
      job,
      firstName,
      lastName,
      email,
      about,
      companyName,
      designation,
      phoneNumber,
      cv,
      status,
      appliedAt
    } = req.body;

    const newAppliedJob = new AppliedJob({
      user,
      job,
      firstName,
      lastName,
      email,
      about,
      companyName,
      designation,
      phoneNumber,
      cv,
      status,
      appliedAt
    });

    await newAppliedJob.save();
    sendEmail(req.body.email, 'Job Application Confirmation', 'Your job application has been received.');

    res.status(201).json({ success: true, message: 'Job application submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to submit job application' });
  }
});

// Route to schedule interview
router.put('/schedule/:id', async (req, res) => {
  try {
    const jobId = req.params.id;
    const { interviewDate, email } = req.body;

    await AppliedJob.findByIdAndUpdate(jobId, { $set: { interviewDate, status: 'scheduled' } });

    // sendEmail(email, 'Interview Scheduled', 'Your interview has been scheduled.');

    res.status(200).json({ success: true, message: 'Interview scheduled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to schedule interview' });
  }
});

// Route to reject applicant
router.put('/reject/:id', async (req, res) => {
  try {
    const jobId = req.params.id;
    // const { email } = req.body;

    await AppliedJob.findByIdAndUpdate(jobId, { $set: { status: 'rejected' } });

    // sendEmail(req.body.email, 'Application Rejected', 'Your job application has been rejected.');

    res.status(200).json({ success: true, message: 'Applicant rejected successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to reject applicant' });
  }
});

// Function to send email
function sendEmail(userEmail, subject, text) {
  // Create a transporter
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  // Define email options
  let mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject,
    text
  };

  // Send email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

export {router as AppliedJobRouter}