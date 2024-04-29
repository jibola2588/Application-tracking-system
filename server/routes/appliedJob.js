import express from 'express';
import { AppliedJob } from '../models/AppliedJob.js';
import nodemailer from 'nodemailer';



const router = express.Router();

const calendlyLink = 'https://calendly.com/sugutlynn/interswitch-interview-schedule';

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
    sendEmail(req.body.email, 'Job Application Confirmation', 
    
   `Thanks for your interest in Interswitch. Your application has been received and we will get back to you as soon as possible.

If you have any questions, please do get in touch with us. We'll also gladly call you back.

Best regards,
Interswitch HR Team
`);

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

    const appliedJob = await AppliedJob.findById(jobId);

    if (!appliedJob) {
      return res.status(404).json({ success: false, message: 'Job application not found' });
    }

    const applicantEmail = appliedJob.email;

    // Send interview scheduled email
    sendEmail(applicantEmail, 'Congratulations! Schedule Your Interview', 
    `    Congratulations! We have reviewed your CV and would like to invite you to schedule an interview.
    Please use the following link to select a time that works for you: ${calendlyLink}.
    We look forward to meeting you!
    
    Best regards,
    Interswitch HR Team`);


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

    const appliedJob = await AppliedJob.findById(jobId);

    if (!appliedJob) {
      return res.status(404).json({ success: false, message: 'Job application not found' });
    }

    const email = appliedJob.email;

    await AppliedJob.findByIdAndUpdate(jobId, { $set: { status: 'rejected' } });

    // Send rejection email
    sendEmail(email, 'Application Rejected', 
    
   `Thank you for your interest in Interswitch. We have carefully reviewed your application, and unfortunately, we have decided not to move forward with it at this time.
   
We encourage you to continue exploring opportunities with us and to keep an eye out for other roles that may be a better fit.

Best regards,
Interswitch HR Team
`);

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

  let mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject,
    text
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

export {router as AppliedJobRouter}
