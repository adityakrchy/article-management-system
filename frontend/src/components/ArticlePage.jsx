import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';

const articlesData = [
  {
    id: 1,
    title: 'First Article',
    description: 'This is the description of the first article.',
    publishDate: '2024-09-22',
    likes: 12,
    author: 'John Doe',
  },
  {
    id: 2,
    title: 'Second Article',
    description: 'This is the description of the second article.',
    publishDate: '2024-09-20',
    likes: 20,
    author: 'Jane Smith',
  },
  {
    id: 3,
    title: 'Third Article',
    description: 'This is the description of the third article.',
    publishDate: '2024-09-18',
    likes: 5,
    author: 'Emily Jones',
  },
  {
    id: 4,
    title: 'Third Article',
    description: 'This is the description of the third article.',
    publishDate: '2024-09-18',
    likes: 5,
    author: 'Emily Jones',
  },
  {
    id: 5,
    title: 'Third Article',
    description: 'This is the description of the third article.',
    publishDate: '2024-09-18',
    likes: 5,
    author: 'Emily Jones',
  },
];

const ArticlePage = () => {
  
  const [articles, setArticles] = useState(articlesData);
  const [sortCriteria, setSortCriteria] = useState('date');
  const [filterText, setFilterText] = useState('');

  const handleLike = (id) => {
    const updatedArticles = articles.map((article) => {
      if (article.id === id) {
        return { ...article, likes: article.likes + 1 };
      }
      return article;
    });
    setArticles(updatedArticles);
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  useEffect(() => {
    let sortedArticles = [...articles];
    if (sortCriteria === 'title') {
      sortedArticles.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortCriteria === 'likes') {
      sortedArticles.sort((a, b) => b.likes - a.likes);
    } else {
      sortedArticles.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    }
    setArticles(sortedArticles);
  }, [sortCriteria]);

  const filteredArticles = articles.filter(
    (article) => article.title.toLowerCase().includes(filterText.toLowerCase())
  );
  return (
    <>
      
      <div className="min-h-screen bg-gray-100">
        <div className="w-full mx-auto bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Articles</h2>

          {/* Filter and Sort Controls */}
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              value={filterText}
              onChange={handleFilterChange}
              placeholder="Filter by title..."
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 w-1/2"
            />

            <select
              onChange={(e) => handleSort(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 w-1/4"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="likes">Sort by Likes</option>
            </select>
          </div>

          {/* Article List */}
          <ul className="space-y-6">
            {filteredArticles.map((article) => (
              <li key={article.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h3 className="text-xl font-semibold text-gray-800">{article.title}</h3>
                <p className="text-gray-600 mt-2">{article.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Published on: {article.publishDate}</p>
                    <p className="text-sm text-gray-500">Author: {article.author}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleLike(article.id)}
                      className="flex items-center text-indigo-600 hover:text-indigo-800 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 9l-3 3m0 0l-3-3m3 3V4m0 5l3-3m-6 3v7.5a3 3 0 006 0V9m-6 3h6"
                        />
                      </svg>
                      Like
                    </button>
                    <span className="ml-2 text-sm text-gray-700">{article.likes} likes</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default ArticlePage
