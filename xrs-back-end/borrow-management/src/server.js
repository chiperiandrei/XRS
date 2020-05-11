const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');
const mongose = require('mongoose');
const morgan = require('morgan');
const logfile = fs.createWriteStream('access.log', { flags: 'a' });

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

//CERTIFICATES
var options = {
    key: fs.readFileSync(path.resolve('certificates/server.key')),
    cert: fs.readFileSync(path.resolve('certificates/server.cert'))
};


//USE ROUTES
const crud_borrows = require('./routes/crud_borrows');

//CONNECT TO DATABASE
mongose.connect(process.env.DBCONNSTRINNG, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to db.')
});

//MIDDLEWARE
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('combined', { stream: logfile }));
app.use(cors());
//MIDDLEWARE ROUTES

app.use(process.env.BORROW_API_URL, crud_borrows);


var httpsServer = https.createServer(options, app);

// if (process.env.NODE_ENV !== 'production')
//     httpsServer.listen(process.env.PORT, () => {
//         console.log("Https server listing on port : " + process.env.PORT)
//     });
//

app.get('/', (req, res) => res.send('Borrow microservice'));

app.listen(process.env.PORT_BORROW, () => console.log(`Borrow management listening on port ${process.env.PORT_BORROW}!`))
