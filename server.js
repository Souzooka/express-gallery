const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const db = require('./models');
const handlebars = require('express-handlebars');
const PORT = process.env.port || 3000;

const indexRoutes = require('./routes/indexRoutes');
const galleryRoutes = require('./routes/galleryRoutes');

// Create Handlebars Engine
const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'main'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//To use bodyParser
app.use(bodyParser.urlencoded({extended: false}));

//To use static files
app.use('/static', express.static('public'));

//To use methodOverride
app.use(methodOverride('_method'));


// Routes
app.use('/', indexRoutes);
app.use('/gallery', galleryRoutes);

// Initialize server
const server = app.listen(PORT, () => {
  db.sequelize.sync();
});

// For testing
module.exports = server;