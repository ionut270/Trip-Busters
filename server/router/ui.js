  
const utils = require('../utils/utils');
const path = require('path');
const fs = require('fs');
const directions = require('../utils/directions');

module.exports = (app) => {
    app.get(['/', '/login'], (req, res) => {
        res.sendFile(path.join(__dirname + '/../../client/build/index.html'));
    })
    app.get(['/profile'], utils.ensureAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname + '/../../client/build/index.html'));
    })
    app.get(['/map'], (req, res) => {
        res.sendFile(path.join(__dirname + '/../../client/build/location.html'));
    })
    app.get(['/directions'], async(req, res) => {
        res.send(await directions.findDirections(req.query.id1, req.query.id2));
    })

}