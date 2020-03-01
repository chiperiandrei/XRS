const router = require('express').Router();
const verifyToken = require('./verifyToken');
const fs = require('fs');
router.post('/setup', verifyToken, (req, res) => {

    const appcfg = {
        "appName": req.body.appname,
        "operatorFname": req.body.opfname,
        "operatorLname": req.body.oplname,
        "email": req.body.email,
        "password": req.body.password,
        "lauchDay": Date.now()
    };
    const data = JSON.stringify(appcfg);
    try {
        fs.writeFileSync('./settings.json', data)
    } catch (e) {
        res.status(400).send(e)
    }
    res.send({
        status: "Company has been set up."
    });
});
router.get('/setup', (req, res) => {
    const path = './settings.json';

    try {
        if (fs.existsSync(path)) {
            let rawdata = fs.readFileSync(path);
            let infos = JSON.parse(rawdata);
            const date_obj = new Date(infos.lauchDay);
            const year = date_obj.getFullYear();

            res.status(200).send({
                value: true,
                "company_name": infos.appName,
                "operatorLname": infos.operatorLname,
                "operatorFname": infos.operatorFname,
                "email": infos.email,
                "date_created": year,
                "NFCADMINID": infos.NFCADMINID
            })
        } else
            res.status(404).send('File not exists!')
    } catch (err) {
        res.status(400).send(e)
    }
});

module.exports = router;
