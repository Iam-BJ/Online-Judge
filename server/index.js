//create a basic express server
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');   
const cors = require('cors'); // Import CORS middleware
const userRoutes = require('./routes/user'); // Import user routes
const problemRoutes = require('./routes/problems'); // Import problem routes
const submissionRoutes = require('./routes/submission'); // Import submission routes

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', userRoutes); // Use user routes under /api/user
app.use('/api/problems', problemRoutes); // Use problem routes under /api/problems
app.use('/api/submissions', submissionRoutes); //  Use submission routes under /api/submissions

app.get('/', (req, res) => {
  res.send('heloo bale');
});

const port = process.env.PORT || 3000;

// Connect to MongoDB       
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
