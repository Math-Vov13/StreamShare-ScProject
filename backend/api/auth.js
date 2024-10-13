// backend/api/auth.ts
import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.post('/auth/login', (req, res) => {
  const { name, email, password } = req.body;

  // Logique de vérification des utilisateurs ici
  if (name === 'John Doe' && email === 'johndoe@example.com' && password === 'password123') {
    return res.json({ success: 'Login successful!' });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

app.listen(5000, () => {
  console.log('API running on http://localhost:5000');
});
