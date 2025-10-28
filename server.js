const dotenv = require('dotenv');
dotenv.config({ quiet: true });
const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const path = require("path");
const methodOverride = require("method-override");

const app = express();

// Connect to Database
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// Get DB Model
const Week = require('./models/weeks');

// GET /
app.get('/', (req, res) => {
    res.render('index.ejs', {
        page: { title: 'Home' }
    });
});

// GET /weeks (1)
app.get("/weeks", async (req, res) => {
    const allWeeks = await Week.find();
    res.render("weeks/index.ejs", { 
        page: { title: 'All Weeks' },
        weeks: allWeeks 
    });
});

// GET /weeks/new (2)
app.get('/weeks/new', (req, res) => {
    res.render('weeks/new.ejs', {
        page: { title: 'Create a New Weekly Report' }
    });
});

// GET /weeks/:id (3)
app.get("/weeks/:id", async (req, res) => {
    const foundWeek = await Week.findById( req.params.id );
    res.render("weeks/show.ejs", { 
        page: { title: foundWeek.id },
        week: foundWeek
    });
});

// POST /weeks (4)
app.post("/weeks", async (req, res) => {
  await Week.create(req.body);
  res.redirect("/weeks");
});

// PUT /weeks/:id (5)
app.put("/weeks/:id", async (req, res) => {
    // Update the week in the database
    // ***********************************************************
    // DANGER!
    // TODO: figure out how to sanitize html before saving to DB!
    await Week.findByIdAndUpdate(req.params.id, req.body);
    // ***********************************************************

    // Redirect to the week's show page to see the updates
    res.redirect(`/weeks/${req.params.id}`);
});

// DELETE /weeks/:id (6)
app.delete("/weeks/:id", async (req, res) => {
    await Week.findByIdAndDelete(req.params.id);
    res.redirect("/weeks");
});

// GET /weeks/:id/edit (7)
app.get("/weeks/:id/edit", async (req, res) => {
    const foundWeek = await Week.findById(req.params.id);
   
    res.render("weeks/edit.ejs", {
        page: { title: 'Edit Week' },
        week: foundWeek,
    });
});

app.listen('3000', () => {
    console.log(`Listening on port 3000!`);
});
