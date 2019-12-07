// Importing express
const express = require('express');
const router = express.Router();

// request allows us to interact more easily with APIs
var request = require('request-promise');

// Import dotenv package which allows us to interact with .env
const dotenv = require('dotenv');
dotenv.config();

// Takes in a location and returns the first business found there by Yelp, accessed with localhost:3000/<location name>/<start date>/<end date>
// dates should be in form YYMMDD
// See after this function for general return format
router.get('/:location/:startdate/:enddate', (req, res, next) => {


    // Get the dates from the values passed
    var startDay = req.params.startdate % 100;
    var startMonth = Math.floor(((req.params.startdate % 10000) - startDay) / 100);
    var startYear = Math.floor((req.params.startdate - (startMonth + startDay)) / 10000);

    var endDay = req.params.enddate % 100;
    var endMonth = Math.floor(((req.params.enddate % 10000) - endDay) / 100);
    var endYear = Math.floor((req.params.enddate - (endMonth + endDay)) / 10000);

    var days = endDay - startDay + 1;

    var startDayString = String(startDay).padStart(2, '0');
    var startMonthString = String(startMonth).padStart(2, '0');
    var startYearString = String(startYear).padStart(2, '0');

    var options = {
        method: 'GET',
        url: 'https://api.yelp.com/v3/businesses/search',
        qs: { location: req.params.location, limit: 1, sort_by: "rating", categories: "restaurants" },
        headers:
        {
            Host: 'api.yelp.com',
            'Postman-Token': 'c290d52d-8c00-434f-bda8-7a6c6659d46b,187ba103-eef1-4aa1-a5c7-0a95cddcddbf',
            'Cache-Control': 'no-cache',
            Authorization: 'Bearer ' + process.env.yelpID
        },
        json: true
    };

    request(options).then(function (response) {

        var latitude = response.businesses[0].coordinates.latitude;
        var longitude = response.businesses[0].coordinates.longitude;

        // Check how the weather will be when the person is planning on visiting
        var options = {
            method: 'GET',
            url: 'https://api.darksky.net/forecast/' + process.env.darkSkyKey + '/' + latitude + ',' + longitude + ',20' + startYearString + '-' + startMonthString + '-' + startDayString + 'T12:00:00',
            qs: { exclude: 'currently,flags,minutely,hourly' },
            headers:
            {
                'cache-control': 'no-cache',
                Connection: 'keep-alive',
                Host: 'api.darksky.net',
                'Postman-Token': 'fc9e6812-3266-4988-8a95-6105b195cdbc,5bd9ad22-ff7b-4d61-9cf5-11b7f4da2687',
                'Cache-Control': 'no-cache',
                Accept: '*/*',
                'User-Agent': 'PostmanRuntime/7.20.1',
                Authorization: 'Bearer 6AQnIyMC6jUeNkE4eGvqW7BSOpdLrEvp4bIgmmsN_3Vgc8tABwNQ9QHmsMavZ5Z9ZWzgoLrx30tCEXxZyLFxtbUZlBmSFrYWxhOZspIXByZJoCC-geQi1fkAXCCuXXYx'
            },
            json: true
        };

        request(options).then(function (response) {

            var temp = response.daily.data[0].apparentTemperatureLow;
            var precipChance = response.daily.data[0].precipProbability;

            var badweather = (temp < 50 || precipChance > .7);

            var options = {
                method: 'GET',
                url: 'https://api.yelp.com/v3/businesses/search',
                qs: { location: req.params.location, limit: 50, sort_by: "rating", categories: "restaurants" },
                headers:
                {
                    Host: 'api.yelp.com',
                    'Postman-Token': 'c290d52d-8c00-434f-bda8-7a6c6659d46b,187ba103-eef1-4aa1-a5c7-0a95cddcddbf',
                    'Cache-Control': 'no-cache',
                    Authorization: 'Bearer ' + process.env.yelpID
                },
                json: true
            };

            request(options).then(function (response) {

                var restaurants = response;

                var foodPlan = [];

                // Start building our plan by deciding what food people are going to eat
                for (let i = 0; i < days; i++) {
                    var day = [];

                    var randomIndexes = [];

                    while (randomIndexes.length < 3) {
                        var index = Math.floor(Math.random() * restaurants.businesses.length);
                        if (randomIndexes.indexOf(index) === -1) randomIndexes.push(index);
                    }

                    for (var num in randomIndexes) {
                        var place = restaurants.businesses[randomIndexes[num]]

                        day.push(randomIndexes[num]);
                    }
                    foodPlan.push(day);
                }

                // If the weather will not be nice, find indoor activities to do
                var category;
                if (badweather) {
                    category = "arts";
                } else {
                    category = "active";
                }


                var options = {
                    method: 'GET',
                    url: 'https://api.yelp.com/v3/businesses/search',
                    qs: { location: req.params.location, limit: 50, sort_by: "rating", categories: category },
                    headers:
                    {
                        Host: 'api.yelp.com',
                        'Postman-Token': 'c290d52d-8c00-434f-bda8-7a6c6659d46b,187ba103-eef1-4aa1-a5c7-0a95cddcddbf',
                        'Cache-Control': 'no-cache',
                        Authorization: 'Bearer ' + process.env.yelpID
                    },
                    json: true
                };

                request(options).then(function (response) {

                    var activities = response;

                    var activityPlan = [];

                    for (let i = 0; i < days; i++) {
                        var day = [];

                        var randomIndexes = [];

                        while (randomIndexes.length < 5) {
                            var index = Math.floor(Math.random() * activities.businesses.length);
                            if (randomIndexes.indexOf(index) === -1) randomIndexes.push(index);
                        }

                        for (var num in randomIndexes) {
                            var place = activities.businesses[randomIndexes[num]]

                            day.push(randomIndexes[num]);
                        }

                        activityPlan.push(day);
                    }

                    var plan = [];

                    for (let i = 0; i < days; i++) {
                        let day = [];
                        let currentTime = 7;

                        // Breakfast
                        day.push({
                            name: restaurants.businesses[foodPlan[i][0]].name,
                            startTime: currentTime,
                            endTime: currentTime + 1,
                            url: restaurants.businesses[foodPlan[i][0]].url
                        });
                        currentTime += 1.5;

                        for (j = 0; j < 2; j++) {
                            day.push({
                                name: activities.businesses[activityPlan[i][j]].name,
                                startTime: currentTime,
                                endTime: currentTime + 1,
                                url: activities.businesses[activityPlan[i][j]].url
                            });
                            currentTime += 1.5;
                        }

                        // Lunch
                        day.push({
                            name: restaurants.businesses[foodPlan[i][1]].name,
                            startTime: currentTime,
                            endTime: currentTime + 1,
                            url: restaurants.businesses[foodPlan[i][1]].url
                        });
                        currentTime += 1.5;

                        for (j = 2; j < activityPlan[i].length - 1; j++) {
                            day.push({
                                name: activities.businesses[activityPlan[i][j]].name,
                                startTime: currentTime,
                                endTime: currentTime + 1,
                                url: activities.businesses[activityPlan[i][j]].url
                            });
                            currentTime += 1.5;
                        }

                        // Dinner
                        day.push({
                            name: restaurants.businesses[foodPlan[i][2]].name,
                            startTime: currentTime,
                            endTime: currentTime + 1,
                            url: restaurants.businesses[foodPlan[i][2]].url
                        });
                        currentTime += 1.5;

                        day.push({
                            name: activities.businesses[activityPlan[0][activityPlan[0].length-1]].name,
                            startTime: currentTime,
                            endTime: currentTime + 1,
                            url: activities.businesses[activityPlan[0][activityPlan[0].length-1]].url
                        });


                        plan.push(day);
                    }


                    console.log(plan);
                    res.status(200).json(plan)

                    console.log(days);


                }).catch(function (err) {
                    console.log("Error Occurred: " + err);
                });

            }).catch(function (err) {
                console.log("Error Occurred: " + err);
            });

        }).catch(function (err) {
            console.log("Error Occurred: " + err);
        });

    }).catch(function (err) {
        console.log("Error Occurred: " + err);
    });

    console.log(req.session.name);
    console.log(req.session.email);
});

// Return format of the above API call
/**
 * [
 *      [
 *          { 
 *              name: name given by yelp API,
 * 
 *              startTime: When the user should go to this location,
 * 
 *              endtime: When the user should leave this location,
 * 
 *              url: link to the company page provided by yelp
 *          },
 *          { 
 *              name: name given by yelp API,
 * 
 *              startTime: When the user should go to this location,
 * 
 *              endtime: When the user should leave this location,
 * 
 *              url: link to the company page provided by yelp
 *          }
 *          and so on... (currently there are eight events in a day)
 *      ]
 * 
 *      [
 *          { 
 *              name: name given by yelp API,
 * 
 *              startTime: When the user should go to this location,
 * 
 *              endtime: When the user should leave this location,
 * 
 *              url: link to the company page provided by yelp
 *          },
 *          { 
 *              name: name given by yelp API,
 * 
 *              startTime: When the user should go to this location,
 * 
 *              endtime: When the user should leave this location,
 * 
 *              url: link to the company page provided by yelp
 *          }
 *          and so on... (currently there are eight events in a day)
 *      ]
 *      and so on...  (will do it for the number of days that the user specified)
 * ]
 */

module.exports = router;
