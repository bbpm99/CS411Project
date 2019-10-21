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

const yelpAPIRoute = require('./api/routes/yelpAPI');

app.use('/yelp', yelpAPIRoute);