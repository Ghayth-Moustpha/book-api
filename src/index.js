require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const { connect } = require('./config/db');

const authRoutes = require('./routes/auth');
const authorRoutes = require('./routes/authors');
const publisherRoutes = require('./routes/publishers');
const bookRoutes = require('./routes/books');
const healthRoutes = require('./routes/health');

const app = express();
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());

connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bookdb');

app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/publishers', publisherRoutes);
app.use('/api/books', bookRoutes);

app.listen(34723, () => console.log('Server running on port 34723'));
