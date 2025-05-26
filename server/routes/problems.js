const express = require('express');
const Problem = require('../models/problem'); // Import the Problem model
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth'); // Import both authentication and authorization middleware

const router = express.Router();
// Create a new problem
router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
    // console.log('Request Body:', req.body); 

    const { title, description, difficulty, tags } = req.body;

    // Optional: if tags is string, convert to array
    let tagsArray = tags;
    if (typeof tags === 'string') {
        tagsArray = tags.split(',').map(t => t.trim());
    }

    try {
        const newProblem = new Problem({
            title,
            description,
            difficulty,
            tags: tagsArray
        });

        await newProblem.save();
        res.status(201).json({ message: 'Problem created successfully', problem: newProblem });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all problems
router.get('/', authenticateToken, async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json(problems);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get a problem by ID
router.get('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const problem = await Problem.findById(id);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.status(200).json(problem);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}); 


// Update a problem by ID
router.put('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    const { id } = req.params;
    const { title, description, difficulty, tags } = req.body;

    try {
        const updatedProblem = await Problem.findByIdAndUpdate(id, {
            title,
            description,
            difficulty,
            tags,
            updatedAt: Date.now()
        }, { new: true });

        if (!updatedProblem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        res.status(200).json({ message: 'Problem updated successfully', problem: updatedProblem });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


// Delete a problem by ID
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProblem = await Problem.findByIdAndDelete(id);
        if (!deletedProblem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.status(200).json({ message: 'Problem deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


module.exports = router; // Export the router to use in the main app