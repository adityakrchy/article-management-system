/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login data to the backend
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      // Handle successful login
      if (response.status === 200) {
        console.log('Login successful', response.data);
        const userData = response.data.user;

        // Set user data in sessionStorage (You can also use localStorage)
        sessionStorage.setItem('user', JSON.stringify(userData));
        
        navigate("/articles")

        // Redirect or show a success message
        // navigate('/dashboard') or setSuccess(true)
      }
    } catch (error) {
      if (error.response) {
        // Server error
        console.error('Error:', error.response.data.error);
        // Display error to the user, e.g., setError(error.response.data.error)
      } else {
        console.error('Error:', error.message);
      }
    }
    console.log('Login clicked');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
        <p className="text-gray-500 text-center mb-6">Welcome back! Please login to your account</p>
        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>

          <div className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="/register" className="text-indigo-600 hover:text-indigo-500">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
