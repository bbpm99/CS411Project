// Importing express
const express = require('express');
const app = express();

// Import cors so we don't get cors error
const cors = require('cors');
app.use(cors({
    origin: true,
    credentials: true,
    preflightContinue: true
}));

// Importing express-session for session handling
// In requests, session variables can be accessed through req.session.varName
const session = require('express-session');

// Import dotenv package which allows us to interact with .env
const dotenv = require('dotenv');
dotenv.config();

// Just a testing port
const port = process.env.PORT;

// Initialize unique secret for our session
app.use(session({
    'secret': '417il89iop34e75rs190asea',
    cookie: {
        httpOnly: false
    },
    'resave': true,
    'saveUninitialized': true
}));

// Start listening on assigned port
app.listen(port, () => {
    console.log('now listening on http://localhost:' + port)
});

// Sets the path for when we want to access the yelp API
const yelpAPIRoute = require('./api/routes/yelpAPI');
// When path is our.url/yelp, use the yelpAPIRoute (yelpAPI.js)
app.use('/yelp', yelpAPIRoute);

// Sets the path for when we want to access the sign in API
const signInAPIRoute = require('./api/routes/signInAPI');
// When path is our.url/singin, use the signInAPIRoute (signInAPI.js)
app.use('/signIn', signInAPIRoute);

// Sets the path for when we want to interact with the database
const databaseAPIRoute = require('./api/routes/databaseAPI');
// When path is our.url/data, use the databaseAPIRoute (signInAPI.js)
app.use('/data', databaseAPIRoute);