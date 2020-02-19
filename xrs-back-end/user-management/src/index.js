const express = require('express');
var morgan = require('morgan');
const app = express();
const port = 4000;
app.use(morgan('dev'));
app.use(express.static('public'));
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}`));