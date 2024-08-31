const mongoose = require('mongoose');

const mongoDBUrl = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    mongoose
      .connect(mongoDBUrl)
      .then(() => console.log('DB connection established'))
      .catch((err) => console.error('Failed to connect to DB', err)); // Handle connection error here if needed)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = connectDB;
