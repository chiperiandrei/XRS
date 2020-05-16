module.exports = function (req, res, next) {
    const token = req.header('token');
    if (!token) return res.status(401).send('Access Denied');
    if (token !== process.env.TOKEN_MOBILE) {
        res.status(400).send('Invalid token');
    }
    else {
        next();
    }
};
