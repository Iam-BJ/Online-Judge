const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  language: {
    type: String,
    enum: ['cpp', 'python', 'java'],
    required: true
  },
  code: {
    type: String,
    required: true
  },
  verdict: {
    type: String,
    default: 'Pending'
  },
  output: {
    type: String,
    default: ''
  }
}, { timestamps: true });

const Submission= mongoose.model('Submission', submissionSchema);
module.exports=Submission;