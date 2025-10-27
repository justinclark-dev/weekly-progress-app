const dotenv = require('dotenv');
dotenv.config();
// dotenv.config({ quiet: true });

const express = require('express');
const app = express();

app.listen('3000', () => {
    console.log(`Listening on port 3000!`);
});
