const mongoose = require('mongoose');

const weekSchema = new mongoose.Schema({
    weekStart: String,
    assignments: String,
    wins: String,
    struggles: String,
    improvements: String
});

const Week = mongoose.model('Week', weekSchema);

module.exports = Week;