const express = require('express');
const Author = require('../models/Author');
const Book = require('../models/Book');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const router = express.Router();

// Add author (admin)
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  const author = new Author(req.body);
  await author.save();
  res.json(author);
});

// Search authors
router.get('/', async (req, res) => {
  const q = req.query.q;
  const authors = await Author.find({
    $or: [
      { firstName: { $regex: q, $options: 'i' } },
      { lastName: { $regex: q, $options: 'i' } }
    ]
  });
  res.json(authors);
});

// Get author + their books
router.get('/:id/books', async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (!author) return res.status(404).json({ msg: 'Not found' });
  const books = await Book.find({ author: author._id })
    .populate('publisher')
    .populate('author');
  res.json({ author, books });
});

module.exports = router;
