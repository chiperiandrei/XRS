const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const port = 3000;
const path = require('path');
app = express();

var options = {
    key: fs.readFileSync(path.resolve('certificates/server.key')),
    cert: fs.readFileSync(path.resolve('certificates/server.cert'))
};


//GET home route
app.get('/', (req, res) => {
    res.send('Hello World.');
});

var httpsServer = https.createServer(options, app);


httpsServer.listen(port, () => {
    console.log("Https server listing on port : " + port)
});
