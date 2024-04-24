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
      // Create a new instance of AppliedJob using req.body
      const appliedJob = new AppliedJob(req.body);

      // Save the applied job to the database
      await appliedJob.save();

      // Send email to user
      sendEmail(req.body.email);

      // Respond with success message
      return res.status(200).json({ message: 'Job application submitted successfully' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
  }
});

// Function to send email
function sendEmail(userEmail) {
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
      subject: 'Job Application Confirmation',
      text: 'Your job application has been received.'
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