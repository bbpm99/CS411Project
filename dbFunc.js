//npm install  mongodb

const {MongoClient} = require('mongodb');

async function main() {
	const uri = "mongodb+srv://nicki:thisisthepassword@travlr-oyibi.mongodb.net/test?retryWrites=true&w=majority";
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	try {
		await client.connect();
		var newUser = {"username":"gorillaboy","password":"monkey"}
		// await createNewUser(client, newUser);
		// var newItinerary = {itineraries: "butts"};
		//await addUserItin(client, "gorillaboy" ,  newItinerary);
		// await remUserItin(client, "gorillaboy" ,  newItinerary);
		// await allUsers(client);
		//var x = await findUser(client, newUser);
	} catch(e) {
		console.log(e);
	} finally {
		await client.close();
	}
}

main().catch(console.err);


//create
async function createNewUser(client, data) {
	const user = client.db("userData").collection("users").insertOne(data)
	.then(function(x) {
		console.log(`New user created: ${x.insertedId}`);
	});
}

async function createMultipleUsers(client, data){
	const user = client.db("userData").collection("users").insertMany(data);
	console.log(`${result.insertedCount} new users`)
	console.log(`New user created: ${user.insertedId}`);
}

//read
async function findUser(client, data) {
	//pull data, get username and password
	var x = client.db("userData").collection("users").findOne(data)
	.then(function(user) {
		if (user) {
			// console.log(`A user found: ${data}`)
			// console.log(user);
			return user;
		} else {
			console.log(`No users found`)
		}
	});
	return await x;
}

//update user information
async function updateUser(client, userName, updateData) {
	client.db("userData").collection("users").updateOne( 
		{username: userName},
		{ $set: updateData}
	).then(function(x) {
		console.log(`${x.modifiedCount} documents modified`)
	});
}

//add itinerary to user
//newItin is {itineraries: [{information}]}
async function addUserItin(client, userName, newItin) {
	client.db("userData").collection("users").updateOne( 
		{username: userName},
		{ $addToSet: newItin},
		{upsert: true}
	).then(function(x) {
		console.log(`${x.modifiedCount} user added itineraries`)
	});
}

//delete users
async function deleteUser(client, userName) {
	const user = client.db("userData").collection("users").deleteOne( 
		{username: userName});
	console.log(`${userName} user was deleted`);
}

//remove itineraries
async function remUserItin(client, userName, itin) {
	client.db("userData").collection("users").updateOne( 
		{username: userName},
		{$pull: itin}
	).then(function(x) {
		console.log(`${x.modifiedCount} user removed itineraries`)
	});
}


//misc functions; qol functions
//all databases
async function listDatabases(client) {
	const databasesList = await client.db().admin().listDatabases();
	console.log("Databases:");
	databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

//all users
async function allUsers(client) {
	var user = client.db("userData").collection("users").find();
	user.forEach(iterateFunc,errorFunc);
}

function iterateFunc(doc) {
   console.log(JSON.stringify(doc, null, 4));
}

function errorFunc(error) {
   console.log(error);
}

