// Get DB Models
const Week = require('../models/weeks');

// Get Helper Modules
const getMonday = require('../helpers/get-mondays.js');
const formatDate = require('../helpers/format-date.js');

// GET /
const home = async (req, res) => {

    const lastMonday = getMonday(-1);
    const thisMonday = getMonday(0);
    const nextMonday = getMonday(1);

    // leave in console logs to watch output for first couple of weeks
    console.log(`
        last mon: ${lastMonday}, formatted: ${formatDate(lastMonday)}
        last mon: ${thisMonday}, formatted: ${formatDate(thisMonday)}
        last mon: ${nextMonday}, formatted: ${formatDate(nextMonday)}
    `)

    const lastWeek = await Week.find({ weekStart: lastMonday });
    const thisWeek = await Week.find({ weekStart: thisMonday });
    const nextWeek = await Week.find({ weekStart: nextMonday });
   
    res.render('index.ejs', {
        page: { title: 'Home' },
        lastWeek: {
            monday: formatDate(lastMonday),
            week: lastWeek[0]
        },
        thisWeek: {
            monday: formatDate(thisMonday),
            week: thisWeek[0]
        },
        nextWeek: {
            monday: formatDate(nextMonday),
            week: nextWeek[0]
        }
    });
}

// GET /weeks (1)
const index = async (req, res) => {
    const allWeeks = await Week.find().sort({ weekStart: -1 });
    res.render('weeks/index.ejs', { 
        page: { title: 'All Weeks' },
        weeks: allWeeks 
    });
}

// GET /weeks/new (2)
const newItem = (req, res) => {
    res.render('weeks/new.ejs', {
        page: { title: 'Create a New Weekly Report' }
    });
}

// GET /weeks/:id (3)
const showItem = async (req, res) => {
    const foundWeek = await Week.findById( req.params.id );
    res.render('weeks/show.ejs', { 
        page: { title: 'Weekly Report' },
        week: foundWeek,
        weekStart: formatDate(foundWeek.weekStart)
    });
};

// POST /weeks (4)
const createItem = async (req, res) => {
  await Week.create(req.body);
  res.redirect('/weeks');
};

// PUT /weeks/:id (5)
const updateItem = async (req, res) => {
    // Update the week in the database
    await Week.findByIdAndUpdate(req.params.id, req.body);
    // Redirect to the week's show page to see the updates
    res.redirect(`/weeks/${req.params.id}`);
};

// DELETE /weeks/:id (6)
const deleteItem = async (req, res) => {
    await Week.findByIdAndDelete(req.params.id);
    res.redirect('/weeks');
};

// GET /weeks/:id/edit (7)
const editItem = async (req, res) => {
    const foundWeek = await Week.findById(req.params.id);
    res.render('weeks/edit.ejs', {
        page: { title: 'Edit Week' },
        week: foundWeek,
    });
};

module.exports = {
    home,
    index,
    newItem,
    showItem,
    createItem,
    updateItem,
    deleteItem,
    editItem
};
