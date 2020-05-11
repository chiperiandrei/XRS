const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const logfile = fs.createWriteStream('access.log', {flags: 'a'});

if (process.env.NODE_ENV !== 'production') require('dotenv').config();


//USE ROUTES
const setuppage = require('./routes/create-config-file');

//MIDDLEWARE
app.use(express.json());
app.use(morgan('combined', {stream: logfile}));
app.use(cors());
//MIDDLEWARE ROUTES
app.use(process.env.FILE_API_URL, setuppage);


app.get(process.env.FILE_API_URL, (req, res) => res.send('Welcome to FILE-MANAGEMENT-API'));

app.listen(process.env.PORT, () => console.log(`File management listening on port ${process.env.PORT}!`));
