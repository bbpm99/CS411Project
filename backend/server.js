// Importing express
const express = require('express');
const app = express();

// Importing express-session for session handling
// In requests, session variables can be accessed through req.session.varName
const session = require('express-session');

// Import dotenv package which allows us to interact with .env
const dotenv = require('dotenv');
dotenv.config();

// Just a testing port
const port = process.env.PORT;

// Initialize unique secret for our session
app.use(session({'secret': '417il89iop34e75rs190asea'}))

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