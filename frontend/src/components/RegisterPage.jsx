import axios from 'axios';
import React, { useState } from 'react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password, confirmPassword)

    // Add your registration logic here
    // Basic front-end validation (optional)
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      // Sending registration data to the backend
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
      });

      // Handle successful registration
      if (response.status === 201) {
        console.log('Registration successful', response.data);
        // Redirect the user to a login page or dashboard
        // e.g., navigate('/login') or set a success message in the state
      }
    } catch (error) {
      // Handle any error responses
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error response:', error.response.data);
        // You can display the error to the user, e.g., setError(error.response.data.message);
      } else if (error.request) {
        // No response was received from the server
        console.error('No response from server:', error.request);
      } else {
        // Something else happened during the request
        console.error('Error:', error.message);
      }
    }
    console.log('Register clicked');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Register</h2>
        <p className="text-gray-500 text-center mb-6">Create your new account</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>

          <div className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 hover:text-indigo-500">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
