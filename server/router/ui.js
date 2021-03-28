const utils = require('../utils/utils');
const path = require('path');

module.exports = (app) => {
    app.get(['/', '/login'], (req, res) => {
        res.sendFile(path.join(__dirname + '/../../client/build/index.html'));
    })
    app.get('/profile', utils.ensureAuthenticated, function(req,res){
        res.send(req.user);
    })
}