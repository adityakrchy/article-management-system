// import React, { useState, useEffect } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ArticlePage from './components/ArticlePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Navbar from './components/Navbar';
import AddArticlePage from './components/AddArticlePage';



const App = () => {
  

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ArticlePage />} /> {/* Home route, showing articles */}
          <Route path="/articles" element={<ArticlePage />} />
          <Route path="/add-article" element={<AddArticlePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
