const dotenv = require('dotenv');
dotenv.config({ quiet: true });
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');

const app = express();

const port = process.env.PORT ? process.env.PORT : '3001';

// Connect to Database
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// View engine (assumes views/error.ejs exists)
app.set('view engine', 'ejs');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// app.use((req, res, next) => {
//     if (req.session.message) {
//         res.locals.message = req.session.message;
//         req.session.message = null;
//     }
//     next();
// });

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

// // 404 Page
// app.get("/*", function (req, res) {
//     res.status(404).render("error.ejs", { msg: "Page not found!" });
//     // res.status(404).render('error.ejs', {
//     //     msg: '404 Route not found!',
//     // });
// });


// 404 catch-all (Express 5 friendly): must be AFTER all routes
app.use((req, res) => {
    res.status(404).render('error', {
        page: { title: '404' },
        msg: 'Page not found!'
    });
});

// Error handler (for thrown/rejected errors in routes)
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).render('error', { 
        page: { title: 'Server Error' },
        msg: 'Something went wrong.' 
    });
});

// General Error Handling
const handleServerError = (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Warning! Port ${port} is already in use!`);
    } else {
        console.log('Error:', err);
    }
}

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
}).on('error', handleServerError);
