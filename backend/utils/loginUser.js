const bcrypt = require('bcrypt');
const User = require('../model/user.schema.js'); // Import the User model

const loginUser = async ({ email, password }) => {
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return { error: 'User does not exist' };
      }
  
      // Compare the hashed password with the provided password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return { error: 'Invalid password' };
      }
  
      // Return the user data (excluding the password)
      const { password: _, ...userWithoutPassword } = user._doc; // Remove password before returning user info
      return userWithoutPassword;
    } catch (error) {
      console.error('Error logging in user:', error);
      return { error: 'Error logging in user' };
    }
  };
  
  module.exports = loginUser;