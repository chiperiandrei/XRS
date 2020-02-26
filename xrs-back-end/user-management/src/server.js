const express = require('express');
var morgan = require('morgan');
var https = require('https');
var fs = require('fs');
const app = express();
const port = 4000;
const router = require('./routes');
var httpOptions = {

    key: fs.readFileSync("./privatekey.pem"),

    cert: fs.readFileSync("./certificate.pem")
}
var server = http.createServer(app);
var server = https.createServer(httpOptions, app);
app.use(morgan('dev'));
app.use('/usm', router);
app.use(express.static('public'));
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}`));