// backend/api/auth.js
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken'; // For token-based authentication
import bcrypt from 'bcryptjs';   // For password hashing

const app = express();
const SECRET_KEY = 'your_secret_key'; // Secret key for signing JWT tokens

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
}));

// Mocked user data (replace with a database in real-world applications)
const users = [
  { name: 'John Doe', email: 'johndoe@example.com', password: bcrypt.hashSync('password123', 10) }, // Hashed password
];

// Login endpoint
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Compare the hashed password
  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (isPasswordValid) {
    // Generate JWT token for authenticated user
    const token = jwt.sign({ name: user.name, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ success: 'Login successful!', token });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
});

// Middleware to check JWT token (protected routes)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(403); // If there's no token, return 'Forbidden'

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

// Logout route (In real-world cases, client-side just deletes the token)
app.get('/auth/logout', (req, res) => {
  res.json({ success: 'Logout successful!' });
});

app.listen(5000, () => {
  console.log('API running on http://localhost:5000');
});

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});
