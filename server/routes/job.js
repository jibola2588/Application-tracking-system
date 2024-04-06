import express from 'express';
import { Jobs } from '../models/Job.js';

const router = express.Router();

// Create a new job
router.post('/post', async (req, res) => {
    try {
      const job = new Jobs(req.body);
      await job.save(); // Corrected line
      res.status(201).send(job);
    } catch (error) {
      res.status(400).send(error);
    }
  });

// Get all jobs
router.get('/get', async (req, res) => {
  try {
    const jobs = await Jobs.find();
    res.send(jobs);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get job by ID
router.get('/get/:id', async (req, res) => {
  try {
    const job = await Jobs.findById(req.params.id);
    if (!job) {
      return res.status(404).send();
    }
    res.send(job);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Update job by ID
router.put('/update/:id', async (req, res) => {
    try {
      const job = await Jobs.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!job) {
        return res.status(404).send();
      }
      res.send(job);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
// Delete job by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const job = await Jobs.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).send();
    }
    res.send(job);
  } catch (error) {
    res.status(500).send(error);
  }
});

export {router as JobsRouter}