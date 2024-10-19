// backend/api/auth.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'; // For token-based authentication
import bcrypt from 'bcryptjs';// For password hashing
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const SECRET_KEY = 'your_secret_key'; // Secret key for signing JWT tokens

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

mongoose.connect("mongodb+srv://thomashelbysigma01:F9kC3agPSlRLoUY4@streamsharecluster.vsxci.mongodb.net/?retryWrites=true&w=majority&appName=StreamShareCluster");

app.post('/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Cet utilisateur existe déjà' });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user in the database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, { expiresIn: '10h' });

    // Send the token as a response (for auto-login after registration)
    res.status(201).json({ success: 'Registration successful', token, user: { name: user.name, email: user.email } });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the hashed password stored in the database with the provided password
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token for authenticated user
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '10h' });

    return res.json({ success: 'Login successful!', token, user: { name: user.name, email: user.email } });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Middleware to check JWT token (protected routes)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) 
    return res.sendStatus(403);// If there's no token, return 'Forbidden'


  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // If token is invalid, return 'Forbidden'
    req.user = user;
    next();
  });
};

// Protected route to get user info
app.get('/auth/user', authenticateToken, (req, res) => {
  // Return authenticated user's info
  res.json({ name: req.user.name, email: req.user.email });
});

app.listen(5000, () => {
  console.log('API running on http://localhost:5000');
});

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});
