// Importing express
const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

// request allows us to interact more easily with APIs
var request = require('request-promise');

// Takes in id token as specified by
// https://developers.google.com/identity/sign-in/web/backend-auth
router.get('/', (req, res, next) => {
    const clientid = process.env.client_id;
    res.redirect("https://accounts.google.com/o/oauth2/v2/auth?scope=profile email&access_type=offline&redirect_uri=http://localhost:3000/signIn/callback&response_type=code&client_id=" + clientid);
});

router.get('/callback', (req, res, next) => {
    const authCode = req.query.code;
    var options = {
        method: 'POST',
        url: 'https://oauth2.googleapis.com/token',
        qs:
        {
            code: authCode,
            client_id: '757815679005-n6aqgbpfohgfrjj77iabs1fpqngfic60.apps.googleusercontent.com',
            client_secret: '8p7wKKByjcyfqFCLLDQdrIyd',
            redirect_uri: 'http://localhost:3000/signIn/callback',
            grant_type: 'authorization_code'
        },
        headers:
        {
            'cache-control': 'no-cache',
            Connection: 'keep-alive',
            'Content-Length': '0',
            Host: 'oauth2.googleapis.com',
            'Postman-Token': '40c632fe-c77e-48f1-946a-4a02e291013f,2246d055-1ce8-4f8a-8cee-5b33a832046d',
            'Cache-Control': 'no-cache',
            Accept: '*/*',
            'User-Agent': 'PostmanRuntime/7.19.0',
            Authorization: 'Bearer 6AQnIyMC6jUeNkE4eGvqW7BSOpdLrEvp4bIgmmsN_3Vgc8tABwNQ9QHmsMavZ5Z9ZWzgoLrx30tCEXxZyLFxtbUZlBmSFrYWxhOZspIXByZJoCC-geQi1fkAXCCuXXYx'
        },
        json: true
    };

    request(options).then(function (response) {

        const accessToken = response.access_token;

        var options = {
            method: 'GET',
            url: 'https://www.people.googleapis.com/v1/people/me',
            qs: { personFields: "names,emailAddresses" },
            headers:
            {
                'cache-control': 'no-cache',
                Connection: 'keep-alive',
                Host: 'people.googleapis.com',
                'Postman-Token': '4512ba8b-86a6-4669-ab3b-5f0782557cf0,e8f21cbf-326d-40ee-868c-41dd90977788',
                'Cache-Control': 'no-cache',
                Accept: '*/*',
                'User-Agent': 'PostmanRuntime/7.19.0',
                Authorization: 'Bearer ' + accessToken,
            },
            json: true
        };

        request(options).then(function (response) {
            req.session.name = response.names[0].displayName;
            req.session.email = response.emailAddresses[0].value;
            res.status(200).json({name: response.names[0].displayName, email:response.emailAddresses[0].value});//,response.emailAddresses[0].value];
        }).catch(function (err) {
            console.log("Error Occurred: " + err);
        });
    }).catch(function (err) {
        console.log("Error Occurred: " + err);
    });
});
module.exports = router;