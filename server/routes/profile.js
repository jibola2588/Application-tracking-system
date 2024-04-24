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
    const applicant = new Applicant(req.body);
    try {
      const newApplicant = await applicant.save();
      res.status(201).json(newApplicant);
    } catch (error) {
      res.status(400).json({ message: error.message });
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
        // Check if the resume exists
        if (req.files && req.files.resume) {
            const resume = req.files.resume;
            const applicant = res.applicant;

            // Update the resume field in the applicant document
            applicant.resume = {
                name: resume.name,
                data: resume.data.toString('base64'), // Convert Buffer to base64
                contentType: resume.mimetype
            };

            // Save the applicant document
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
        // Check if the resume exists
        if (req.files && req.files.resume) {
            const resume = req.files.resume;
            const applicant = res.applicant;

            // Update the resume field in the applicant document
            applicant.resume = {
                name: resume.name,
                data: resume.data.toString('base64'), // Convert Buffer to base64
                contentType: resume.mimetype
            };

            // Save the applicant document
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