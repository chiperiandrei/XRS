const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongose = require('mongoose')
const logfile = fs.createWriteStream('access.log', { flags: 'a' });

if (process.env.NODE_ENV !== 'production') require('dotenv').config();


//USE ROUTES
const crud_borrows = require('./routes/crud_borrows');

//CONNECT TO DATABASE
mongose.connect(process.env.DBCONNSTRINNG, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to db.')
});

//MIDDLEWARE
app.use(express.json());
app.use(morgan('combined', { stream: logfile }));
app.use(cors());
//MIDDLEWARE ROUTES
app.use(process.env.BORROW_API_URL, crud_borrows);


app.get(process.env.BORROW_API_URL, (req, res) => res.send('Welcome to Borrow api'));

app.listen(process.env.PORT_BORROW, () => console.log(`File management listening on port ${process.env.PORT_BORROW}!`));
