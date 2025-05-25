//create a basic express server
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');   
const authRoutes = require('./routes/auth'); // Import auth routes
dotenv.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// use the auth routes
app.use('/api/auth', authRoutes); 


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



