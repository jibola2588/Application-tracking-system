import Job from '../models/Job.js'; // Import the Job model/schema

const router = express.Router();

// Route for creating a new job
router.post('/post', async (req, res) => {
    try {
        const {
            user,
            title,
            description,
            salary,
            company,
            email,
            job_category,
            job_type,
            job_experience,
            job_vacancy,
            job_deadline
        } = req.body; // Assuming you're sending these fields in the request body

        // Create a new job object
        const newJob = new Job({
            user,
            title,
            description,
            salary,
            company,
            email,
            job_category,
            job_type,
            job_experience,
            job_vacancy,
            job_deadline
        });

        // Save the job to the database
        const savedJob = await newJob.save();

        res.status(201).json(savedJob); // Respond with the created job object
    } catch (error) {
        res.status(400).json({ message: error.message }); // Handle errors
    }
});

// Route for getting all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route for updating a job
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { user, title, description, salary, company, email, job_category, job_type, job_experience, job_vacancy, job_deadline } = req.body;

    try {
        const updatedJob = await Job.findByIdAndUpdate(id, { user, title, description, salary, company, email, job_category, job_type, job_experience, job_vacancy, job_deadline }, { new: true });

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json(updatedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route for deleting a job
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedJob = await Job.findByIdAndRemove(id);

        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;