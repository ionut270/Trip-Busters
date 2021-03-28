const fs = require('fs');
const utils = require('../utils/utils');

module.exports = (app) => {
    app.get(['/', '/login'], (req, res) => {
        res.sendFile(path.join(__dirname + '../client/build/index.html'));
    })
    app.get('/profile', utils.ensureAuthenticated, function(req,res){
        res.send(req.user);
    })
}