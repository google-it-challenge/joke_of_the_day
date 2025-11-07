const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve static files (index.html, app.js, style.css)
app.use(express.static(path.join(__dirname, 'public')));

// Jokes data file
const JOKES_PATH = path.join(__dirname, 'jokes.json');

function loadJokes() {
  return JSON.parse(fs.readFileSync(JOKES_PATH, 'utf-8'));
}

// REST: Return all jokes
app.get('/api/jokes', (req, res) => {
  res.json(loadJokes());
});

// REST: Return a random joke
app.get('/api/jotd', (req, res) => {
  const jokes = loadJokes();
  if (!Array.isArray(jokes) || jokes.length === 0) {
    return res.status(404).json({ detail: 'No jokes available.' });
  }
  const idx = Math.floor(Math.random() * jokes.length);
  res.json(jokes[idx]);
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
