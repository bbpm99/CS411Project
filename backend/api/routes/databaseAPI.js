
// Importing express
const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://nicki:thisisthepassword@travlr-oyibi.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// request allows us to interact more easily with APIs
var request = require('request-promise');

// Test
router.get('/', (req, res, next) => {
    test();
});

// accessed through our.url/data/save
// Will save the last generated itinerary into the user's account
router.get('/save', (req, res, next) => {
    console.log(req.session.email);

    if (typeof req.session.email !== 'undefined') {
        save(req.session.email, req.session.currentPlan);
        res.status(200).json({});
    } else {
        res.json({})
    }
});

// accessed through our.url/data/read, will return data from current user
// If the current user never logged in, will return empty json '{}'
router.get('/read', async (req, res, next) => {
    console.log(req.session.email);

    if (typeof req.session.email !== 'undefined') {

        console.log('here');
        var temp = await find(req.session.email);

        req.session.itineraries = temp.itineraries;
        console.log(temp);
        res.status(200).json(temp);

    } else {
        res.json({})
    }
});

// Accessed through our.url/data/remove/<array index of itinerary to be removed>
// Removes itin at that index from the database
router.get('/remove/:removeId', (req, res, next) => {
    if (typeof req.session.email !== 'undefined') {
        var itinToRemove = req.session.itineraries[req.params.removeId];
        console.log(itinToRemove);
        remove(req.session.email, itinToRemove);
        res.status(200);
    } else {
        res.json({})
    }
});


// Following functions taken from dbFunc.js

async function test() {
    try {
        await client.connect();
        var newUser = { "username": "gorillaboy" }
        //await createNewUser(client, newUser);
        //var newItinerary = {itineraries: "AnotherOne"};
        //await addUserItin(client, "gorillaboy" ,  newItinerary);
        // await remUserItin(client, "gorillaboy" ,  newItinerary);
        // await allUsers(client);
        var x = await findUser(client, newUser);
    } catch (e) {
        console.log(e);
    } finally {
        //await client.close();
        console.log(x);
    }
}

async function save(userEmail, itinToSave) {
    try {
        await client.connect();
        var user = { "username": userEmail }
        var userExists = await findUser(client, user);
        console.log(userExists);

        if (userExists === "none") {
            console.log('New user ' + userEmail + ' wants to save, creating new user...');
            await newUser(userEmail);
        }

        var newItinerary = { itineraries: itinToSave };
        await addUserItin(client, userEmail, newItinerary);
    } catch (e) {
        console.log(e);
    } finally {
        //await client.close();
    }
}

async function find(userEmail) {
    try {
        await client.connect();
        var user = { "username": userEmail }
        var x = await findUser(client, user);
    } catch (e) {
        console.log(e);
    } finally {
        //await client.close();
        console.log
        return x;
    }
}

async function newUser(userEmail) {
    try {
        await client.connect();
        var user = { "username": userEmail };
        await createNewUser(client, user);
    } catch (e) {
        console.log(e);
    } finally {
        //await client.close();
    }
}

async function remove(userEmail, itinToRemove) {
    try {
        await client.connect();
        console.log('client connected');
        await remUserItin(client, userEmail, itinToRemove);
    } catch (e) {
        console.log(e);
    } finally {
        //await client.close();
    }
}

//create
async function createNewUser(client, data) {
    const user = client.db("userData").collection("users").insertOne(data)
        .then(function (x) {
            console.log(`New user created: ${x.insertedId}`);
        });
}

async function createMultipleUsers(client, data) {
    const user = client.db("userData").collection("users").insertMany(data);
    console.log(`${result.insertedCount} new users`)
    console.log(`New user created: ${user.insertedId}`);
}

//read
async function findUser(client, data) {
    console.log('client data: ' + data)
    //pull data, get username and password
    var x = client.db("userData").collection("users").findOne(data)
        .then(function (user) {
            if (user) {
                // console.log(`A user found: ${data}`)
                // console.log(user);
                return user;
            } else {
                console.log(`No users found`)
                return "none";
            }
        });
    return await x;
}

//add itinerary to user
//newItin is {itineraries: [{information}]}
async function addUserItin(client, userName, newItin) {
    client.db("userData").collection("users").updateOne(
        { username: userName },
        { $addToSet: newItin },
        { upsert: true }
    ).then(function (x) {
        console.log(`${x.modifiedCount} user added itineraries`)
    });
}

//remove itineraries
async function remUserItin(client, userName, itin) {
    client.db("userData").collection("users").updateOne(
        { username: userName },
        { $pull: { "itineraries" : itin } }
    ).then(function (x) {
        console.log(`${x.modifiedCount} user removed itineraries`)
    });
}

function iterateFunc(doc) {
    console.log(JSON.stringify(doc, null, 4));
}

function errorFunc(error) {
    console.log(error);
}


module.exports = router;