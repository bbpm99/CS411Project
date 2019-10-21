const express = require('express');
const router = express.Router();
var request = require('request');

// Import dotenv package which allows us to interact with .env
const dotenv = require('dotenv');
dotenv.config();

router.get('/:location', (req, res, next) => {
    var options = {
        method: 'GET',
        url: 'https://api.yelp.com/v3/businesses/search',
        qs: { location: req.params.location },
        headers:
        {
            Host: 'api.yelp.com',
            'Postman-Token': 'c290d52d-8c00-434f-bda8-7a6c6659d46b,187ba103-eef1-4aa1-a5c7-0a95cddcddbf',
            'Cache-Control': 'no-cache',
            Authorization: 'Bearer 6AQnIyMC6jUeNkE4eGvqW7BSOpdLrEvp4bIgmmsN_3Vgc8tABwNQ9QHmsMavZ5Z9ZWzgoLrx30tCEXxZyLFxtbUZlBmSFrYWxhOZspIXByZJoCC-geQi1fkAXCCuXXYx'
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        // sends back the json file returned from yelp's API
        res.status(200).json(body.businesses[0]);
        console.log(body);
    });
});

module.exports = router;
