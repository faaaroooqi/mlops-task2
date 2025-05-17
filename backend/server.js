const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const User = require('./user'); // User model

mongoose.connect('mongodb+srv://farooqi:farooqi123@cluster0.xp0xbrf.mongodb.net/signin?retryWrites=true&w=majority&tls=true')

app.use(cors());
app.use(express.json());

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ error: 'User already exists' });

  const user = new User({ username, password });
  await user.save();
  res.status(201).json({ message: 'User created' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ message: 'Login successful' });
});

app.listen(5000, () => console.log('Backend running on port 5000'));
