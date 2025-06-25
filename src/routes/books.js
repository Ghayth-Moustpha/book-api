const express = require('express');
const Book = require('../models/Book');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const router = express.Router();

// Add book (first author only)
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  const { title, type, price, publisherId, authorId } = req.body;
  const book = new Book({
    title, type, price,
    publisher: publisherId,
    author: authorId
  });
  await book.save();
  res.json(book);
});

// List all books
router.get('/', async (req, res) => {
  const books = await Book.find()
    .populate('publisher')
    .populate('author');
  res.json(books);
});

// Get book details
router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id)
    .populate('publisher')
    .populate('author');
  if (!book) return res.status(404).json({ msg: 'Not found' });
  res.json(book);
});

// Search by title
router.get('/search/:q', async (req, res) => {
  const books = await Book.find({ title: { $regex: req.params.q, $options: 'i' } })
    .populate('publisher')
    .populate('author');
  res.json(books);
});

module.exports = router;
