const dotenv = require('dotenv');
dotenv.config({ quiet: true });
const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const path = require("path");

const app = express();

// Connect to Database
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// Get DB Model
const Week = require('./models/weeks');

// GET /
app.get('/', (req, res) => {
    res.render('index.ejs', {
        page: { title: 'Home' }
    });
});

// GET /weeks/new
app.get('/weeks/new', (req, res) => {
    res.render('weeks/new.ejs', {
        page: { title: 'Create a New Weekly Report' }
    });
});

// POST /weeks
app.post("/weeks", async (req, res) => {
  await Week.create(req.body);
  console.log('*************')
  console.log(req.body)
  res.redirect("/weeks/new");
});

app.listen('3000', () => {
    console.log(`Listening on port 3000!`);
});
