const dotenv = require('dotenv');
dotenv.config({ quiet: true });

const express = require('express');
const app = express();

// GET /
app.get('/', (req, res) => {
    res.render('index.ejs', {
        page: { title: 'Home' }
    })
});


// app.get('/', (req, res) => {
//     res.render('index.ejs', { 
//         page: { title: 'Welcome to my blog!' }
//     });
// });


app.listen('3000', () => {
    console.log(`Listening on port 3000!`);
});
