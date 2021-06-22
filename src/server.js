const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
// create express app

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


require('./app/routes/question.routes.js')(app);
// listen for requests
app.listen(dbConfig.port, () => {
    console.log("Server is listening on port ",dbConfig.port);
});
