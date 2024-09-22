const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  
  description: {
    type: String,
    required: true
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  articleText: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;