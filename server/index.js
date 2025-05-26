//create a basic express server
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');   
const userRoutes = require('./routes/user'); // Import user routes
const problemRoutes = require('./routes/problems'); // Import problem routes
dotenv.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// use the auth routes
app.use('/api/user', userRoutes); // Use user routes under /api/user
app.use('/api/problems', problemRoutes); // Use problem routes under /api/problems

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



