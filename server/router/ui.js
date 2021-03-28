const fs = require('fs');
const utils = require('../utils/utils');
module.exports = (app) => {
    app.get(['/', '/login'], (req, res) => {
        res.end("Hello .......")
    })
    app.get('/account', utils.ensureAuthenticated, function (req, res) {
        res.render('account', { user: req.user });
    });
    app.get('/profile', utils.ensureAuthenticated, function(req,res){
        console.log(req);
        res.send("Authentificated");
    })
}