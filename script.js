const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// Serve index.html directly
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// In-memory card storage
let cards = [];
let nextId = 1;

// List all cards
app.get('/cards', (req, res) => {
  res.json(cards);
});

// Add a new card
app.post('/cards', (req, res) => {
  const { suit, value } = req.body;
  if (!suit || !value) {
    return res.status(400).json({ message: 'Suit and value are required.' });
  }
  const card = { id: nextId++, suit, value };
  cards.push(card);
  res.status(201).json(card);
});

// Delete a card by ID
app.delete('/cards/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = cards.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Card not found.' });
  }
  const deleted = cards.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(port, () => {
  console.log(`🃏 Card app running at http://localhost:${port}`);
});
