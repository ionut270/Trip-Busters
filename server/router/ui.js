const utils = require('../utils/utils');
const path = require('path');
const fs = require('fs');

module.exports = (app) => {
    app.get(['/', '/login'], (req, res) => {
        res.sendFile(path.join(__dirname + '/../../client/build/index.html'));
    })
    app.get(['/profile'], utils.ensureAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname + '/../../client/build/index.html'));
    })
    app.get(['/map'], utils.ensureAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname + '/../../client/build/location.html'));
    })

}