import axios from 'axios';
import React, { useState } from 'react';

const AddArticlePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [articleText, setArticleText] = useState('');
  const [media, setMedia] = useState(null);

  const handleMediaUpload = (e) => {
    setMedia(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const userData = JSON.parse(sessionStorage.getItem('user') || '{}');

    const autherId = userData._id
    const autherName = userData.name

    try {
      const response = await axios.post('http://localhost:8000/api/articles', {
        title, description, publishDate, articleText, autherId, autherName
      });

      if (response.status === 201) {
        console.log('Article submitted successfully:', response.data);
        // Reset form or redirect as needed
      } else {
        console.error('Error submitting article:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add New Article</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Article title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Short description of the article"
            ></textarea>
          </div>

         

          {/* Publish Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Publish Date</label>
            <input
              type="date"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Article Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Article Text</label>
            <textarea
              value={articleText}
              onChange={(e) => setArticleText(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Write your article here"
              rows={5}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Publish Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArticlePage;
