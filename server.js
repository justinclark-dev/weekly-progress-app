const dotenv = require('dotenv');
dotenv.config({ quiet: true });
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

// Connect to Database
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Get DB Controllers
const weeksController = require('./controllers/weeks');

// Routes
app.get('/', weeksController.home);
app.get('/weeks', weeksController.index);
app.get('/weeks/new', weeksController.newItem);
app.get('/weeks/:id', weeksController.showItem);
app.post('/weeks', weeksController.createItem);
app.put('/weeks/:id', weeksController.updateItem);
app.delete('/weeks/:id', weeksController.deleteItem);
app.get('/weeks/:id/edit', weeksController.editItem);

app.listen('3000', () => {
    console.log(`Listening on port 3000!`);
});
