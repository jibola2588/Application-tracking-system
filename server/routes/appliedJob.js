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

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const appliedJobs = await AppliedJob.find({ user: userId });
    res.status(200).json({ success: true, data: appliedJobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to get applied jobs for the user' });
  }
});

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

    // Update job status and interview date
    await AppliedJob.findByIdAndUpdate(jobId, { $set: { interviewDate, status: 'scheduled' } });

    // Find the email associated with the job ID
    const appliedJob = await AppliedJob.findById(jobId);

    // Check if job application exists
    if (!appliedJob) {
      return res.status(404).json({ success: false, message: 'Job application not found' });
    }

    // Get the email from the found job application
    const applicantEmail = appliedJob.email;

    // Send interview scheduled email
    sendEmail(applicantEmail, 'Interview Scheduled', 'Your interview has been scheduled.');

    // Respond with success message
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

    // Find the job application by ID
    const appliedJob = await AppliedJob.findById(jobId);

    // Check if job application exists
    if (!appliedJob) {
      return res.status(404).json({ success: false, message: 'Job application not found' });
    }

    // Get the email from the found job application
    const email = appliedJob.email;

    // Update status to 'rejected'
    await AppliedJob.findByIdAndUpdate(jobId, { $set: { status: 'rejected' } });

    // Send rejection email
    sendEmail(email, 'Application Rejected', 'Your job application has been rejected.');

    // Respond with success message
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
