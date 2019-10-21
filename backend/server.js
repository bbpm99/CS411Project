// Importing express
const express = require('express');
const app = express();

// Import dotenv package which allows us to interact with .env
const dotenv = require('dotenv');
dotenv.config();

// Just a testing port
const port = process.env.PORT;

// Start listening on assigned port
app.listen(port, () => {
    console.log('now listening on http://localhost:' + port)
});

// Sets the path for when we want to access the yelp API
const yelpAPIRoute = require('./api/routes/yelpAPI');
// When path is our.url/yelp, use the yelpAPIRoute (yelpAPI.js)
app.use('/yelp', yelpAPIRoute);