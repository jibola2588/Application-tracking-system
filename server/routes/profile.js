import express from 'express';
import { Applicant } from '../models/Profile.js';

const router = express.Router();

// GET all applicants
router.get("/applicants", async (req, res) => {
    try {
      const applicants = await Applicant.find();
      res.json(applicants);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // GET one applicant
  router.get("/applicants/:id", getApplicant, (req, res) => {
    res.json(res.applicant);
  });
  
  // POST new applicant
  router.post("/applicants", async (req, res) => {
    try {
      const {
        personal,
        skills,
        resume,
        schoolData,
        workData
      }= req.body;

      const applicant = new Applicant({ 
        personal,
        skills,
        resume,
        schoolData,
        workData,});

      await applicant.save();
      res.status(201).json(applicant);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.get('/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log('User ID:', userId); // Log the userId
      const applicant = await Applicant.find({ user: userId });
      res.status(200).json({ success: true, data: applicant });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to get applied jobs for the user' });
    }
  });
  
  // Middleware function to get applicant by ID
  async function getApplicant(req, res, next) {
    let applicant;
    try {
      applicant = await Applicant.findById(req.params.id);
      if (applicant === null) {
        return res.status(404).json({ message: "Applicant not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  
    res.applicant = applicant;
    next();
  }
  
  // PUT update applicant
  router.put("/applicants/:id", getApplicant, async (req, res) => {
    try {
      await res.applicant.set(req.body).save();
      res.json({ message: "Applicant updated" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // DELETE one applicant
  router.delete("/applicants/:id", getApplicant, async (req, res) => {
    try {
      await res.applicant.remove();
      res.json({ message: "Deleted applicant" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // POST or PUT resume for applicant
router.put("/applicants/:id/resume", getApplicant, async (req, res) => {
    try {
        if (req.files && req.files.resume) {
            const resume = req.files.resume;
            const applicant = res.applicant;

            applicant.resume = {
                name: resume.name,
                data: resume.data.toString('base64'),
                contentType: resume.mimetype
            };

            await applicant.save();

            res.json({ message: "Resume updated" });
        } else {
            res.status(400).json({ message: "No resume file found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post("/applicants/:id/resume", getApplicant, async (req, res) => {
    try {
        if (req.files && req.files.resume) {
            const resume = req.files.resume;
            const applicant = res.applicant;

         
            applicant.resume = {
                name: resume.name,
                data: resume.data.toString('base64'), 
                contentType: resume.mimetype
            };

            await applicant.save();

            res.status(201).json({ message: "New resume uploaded" });
        } else {
            res.status(400).json({ message: "No resume file found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
  
  export {router as ApplicantsRouter}