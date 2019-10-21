// Importing express
const express = require('express');
const app = express();

// Just a testing port
const port = 3000;

// Start listening on assigned port
app.listen(port, () => {
    console.log('now listening on http://localhost:' + port)
});

const locationRoutes = require('./api/routes/products');

app.use('/locations', locationRoutes);