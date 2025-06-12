const express = require('express');
const Submission = require('../models/Submission');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

// POST /submissions - Submit code
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { problem, language, code } = req.body;

    if (!problem || !language || !code) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const submission = new Submission({
      user: req.user.userId,
      problem,
      language,
      code
    });

    await submission.save();
    res.status(201).json(submission);
  } catch (err) {
    console.error('Submission Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /submissions - Get all submissions for current user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const submissions = await Submission.find({ user: req.user.userId  })
      .populate('problem', 'title')
      .sort({ createdAt: -1 });

    res.status(200).json(submissions);
  } catch (err) {
    console.error('Get Submissions Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /submissions/:id - Get a specific submission by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const submission = await Submission.findOne({ _id: req.params.id, user: req.user.userId  })
      .populate('problem', 'title');

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.status(200).json(submission);
  } catch (err) {
    console.error('Get Submission Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
