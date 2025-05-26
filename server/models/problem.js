const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const problemSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    set: v => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() // Normalize case
    },
    tags: [{
        type: String,
        trim: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;