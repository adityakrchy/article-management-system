const express = require("express");
const dbConnect = require("./utils/dbConnect");
const cors = require("cors");
const registerUser = require("./utils/registerUser");
const loginUser = require("./utils/loginUser")

const Article = require("./model/article.schema.js")
const app = express();
// Apply CORS middleware to allow cross-origin requests
app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// You can optionally configure CORS to allow specific origins, headers, methods
// Example: Allow only requests from http://localhost:3000
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL (React, etc.)
  methods: 'GET,POST,PUT,DELETE',  // Specify the allowed HTTP methods
  credentials: true,               // Allow cookies to be sent with requests
}));

app.use(express.json())
// app.use(express.urlencoded())



dbConnect()

app.get("/", (req, res)=>{
    res.json({
        message: "Hello world"
    })
})

app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password)
  
    // Perform validation and save user data
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Simulate saving the user
    const newUser = registerUser({name, email, password})
    
    // Send back success response
    res.status(201).json({
      message: 'User registered successfully',
      user: newUser,
    });
  });

  // POST /api/login - Login the user
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Call the loginUser function and pass login credentials
  const result = await loginUser({ email, password });

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  // If login is successful, return the user data (without password)
  return res.status(200).json({
    message: 'Login successful',
    user: result, // User details (without password)
  });
});

// Route to handle article submission
app.post('/api/articles',  async (req, res) => {
  try {
    const { title, description, publishDate, articleText, autherId, autherName } = req.body;
    console.log(title, description, publishDate, articleText, autherId)
    

    const newArticle = new Article({
      title,
      description,
      publishDate,
      articleText,
     
      likes: 0, // Default likes
      author: autherId
    });

    await newArticle.save();
    res.status(201).json({ message: 'Article created successfully', data: newArticle });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ message: 'Error creating article', error });
  }
});

// route to fetch all articles
app.get('/api/getAllArticles', async (req, res) => {
  try {
    const articles = await Article.find().sort({ publishDate: -1 }).populate('author')
    console.log(articles)
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Error fetching articles', error: error.message });
  }
});


app.listen(8000, ()=>{
    console.log("Server is running on port 8000")
})