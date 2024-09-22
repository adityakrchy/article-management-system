const bcrypt = require('bcrypt');
const User = require('../model/user.schema.js'); // Import the User model from your schema file

const registerUser = async ({ name, email, password }) => {
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return { error: 'User already exists' };
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user instance
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      // Save the user to the database
      const savedUser = await newUser.save();
  
      // Return the saved user (you might want to exclude the password when returning)
      const { password: _, ...userWithoutPassword } = savedUser._doc; // Remove password field before sending
      console.log(userWithoutPassword)
      return userWithoutPassword;
    } catch (error) {
      console.error('Error registering user:', error);
      return { error: 'Error registering user' };
    }
  };
  
  module.exports = registerUser;