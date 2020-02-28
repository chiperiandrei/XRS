const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();
const mongose = require('mongoose');
const morgan = require('morgan');
const logfile = fs.createWriteStream('access.log', {flags: 'a'});

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

//CERTIFICATES
var options = {
    key: fs.readFileSync(path.resolve('certificates/server.key')),
    cert: fs.readFileSync(path.resolve('certificates/server.cert'))
};


//USE ROUTES
const authRoute = require('./routes/auth');

//CONNECT TO DATABASE
mongose.connect(process.env.DBCONNSTRINNG, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connected to db.')
});

//MIDDLEWARE
app.use(express.json());
app.use(morgan('combined', {stream: logfile}));

//MIDDLEWARE ROUTES

app.use(process.env.API_URL, authRoute);


var httpsServer = https.createServer(options, app);


httpsServer.listen(process.env.PORT, () => {
    console.log("Https server listing on port : " + process.env.PORT)
});
