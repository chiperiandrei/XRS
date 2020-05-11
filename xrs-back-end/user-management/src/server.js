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

// //CERTIFICATES
// var options = {
//     key: fs.readFileSync(path.resolve('certificates/server.key')),
//     cert: fs.readFileSync(path.resolve('certificates/server.cert'))
// };


//USE ROUTES
const authRoute = require('./routes/auth');
const borrowRoute = require('./routes/borrowObject');
const profileRoute = require('./routes/profile');
const usersRoute = require('./routes/users')

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

app.use(process.env.USER_API_URL, usersRoute);
// app.use(process.env.USER_API_URL + '/borrow', borrowRoute);
// app.use(process.env.USER_API_URL + '/profile', profileRoute);
// app.use(process.env.USER_API_URL + '/users', usersRoute);



// var httpsServer = https.createServer(options, app);

// if (process.env.NODE_ENV !== 'production')
//     httpsServer.listen(process.env.PORT, () => {
//         console.log("Https server listing on port : " + process.env.PORT)
//     });
//

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(process.env.PORT, () => console.log(`User management listening on port ${process.env.PORT}!`))
