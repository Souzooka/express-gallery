const express = require('express');
const app = express();
const db = require('./models');
const handlebars = require('express-handlebars');
const PORT = process.env.port || 3000;

// Routes
// app.use('/', indexRoutes);

// Initialize server
const server = app.listen(PORT, () => {
  db.sequelize.sync();
});

// For testing
module.exports = server;