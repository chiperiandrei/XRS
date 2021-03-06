const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');
const mongose = require('mongoose');
const morgan = require('morgan');
const logfile = fs.createWriteStream('access.log', { flags: 'a' });
const bodyParser = require('body-parser');
const swagger= require('swagger-generator-express');
const options = {
	title: "Users Management Service",
	version: "1.0.0",
	host: "localhost:5000",
	basePath: "/",
	schemes: ["http", "https"]};

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// //CERTIFICATES
// var options = {
//     key: fs.readFileSync(path.resolve('certificates/server.key')),
//     cert: fs.readFileSync(path.resolve('certificates/server.cert'))
// };

app.use(bodyParser.urlencoded({ extended: true }))
//USE ROUTES
const authRoute = require('./routes/auth');
const borrowRoute = require('./routes/borrowObject');
const profileRoute = require('./routes/profile');
const usersRoute = require('./routes/users');
const asignNFCtags = require('./routes/assign_tags');
const get_user_by_tag = require('./routes/get_user_by_tag');
const crud_cards = require('./routes/crud_cards');
const contact = require('./routes/contact');


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

app.use(process.env.USER_API_URL, authRoute);
app.use(process.env.USER_API_URL + '/borrow', borrowRoute);
app.use(process.env.USER_API_URL + '/profile', profileRoute);
app.use(process.env.USER_API_URL + '/users', usersRoute);
app.use(process.env.USER_API_URL + '/nfctags', asignNFCtags);
app.use(process.env.USER_API_URL + '/getuserbytag', get_user_by_tag);
app.use(process.env.USER_API_URL + '/tags', crud_cards);
app.use(process.env.USER_API_URL + '/contact', contact);




// var httpsServer = https.createServer(options, app);

// if (process.env.NODE_ENV !== 'production')
//     httpsServer.listen(process.env.PORT, () => {
//         console.log("Https server listing on port : " + process.env.PORT)
//     });
//

app.get('/', (req, res) => res.send('Hello World!'));

swagger.serveSwagger(app, "/swagger", options, {routePath : './src/routes/'});

app.listen(process.env.PORT, () => console.log(`User management listening on port ${process.env.PORT}!`))
