const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        if (token === process.env.SETUP_KEY) {
            next();
        }
    } catch (e) {
        res.status(400).send('Invalid token');
    }
};
