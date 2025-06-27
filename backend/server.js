const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Routes
const moviesRouter = require('./routes/movies');
const tvRouter = require('./routes/tv');
app.use('/api/movies', moviesRouter);
app.use('/api/tv', tvRouter);

app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
