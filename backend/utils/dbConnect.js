const mongoose = require('mongoose');

// MongoDB Connection Utility Function
const dbConnect = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/article-management-system'; // MongoDB URI from environment variables or default
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
   
  }
};

// Export the connection function
module.exports = dbConnect;
