require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { connect } = require('./config/db');

const authRoutes = require('./routes/auth');
const authorRoutes = require('./routes/authors');
const publisherRoutes = require('./routes/publishers');
const bookRoutes = require('./routes/books');

const app = express();
app.use(bodyParser.json());

connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bookdb');

app.use('/api/auth', authRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/publishers', publisherRoutes);
app.use('/api/books', bookRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
