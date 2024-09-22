const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true, // The name is required
    trim: true,     // Automatically trim whitespace from the name
  },
  email: {
    type: String,
    required: true,
    unique: true,   // Ensure that the email is unique across all users
    trim: true,
    lowercase: true, // Converts email to lowercase before saving
  },
  password: {
    type: String,
    required: true, // The hashed password is required
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date to the current time
  },
});



// Export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
