const express = require('express');
const Publisher = require('../models/Publisher');
const Book = require('../models/Book');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const router = express.Router();

// Add publisher
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  const pub = new Publisher(req.body);
  await pub.save();
  res.json(pub);
});

// Search publishers
router.get('/', async (req, res) => {
  const q = req.query.q;
  const pubs = await Publisher.find({ name: { $regex: q, $options: 'i' } });
  res.json(pubs);
});

// Get publisher + books
router.get('/:id/books', async (req, res) => {
  const pub = await Publisher.findById(req.params.id);
  if (!pub) return res.status(404).json({ msg: 'Not found' });
  const books = await Book.find({ publisher: pub._id })
    .populate('publisher')
    .populate('author');
  res.json({ publisher: pub, books });
});

module.exports = router;
