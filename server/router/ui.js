const utils = require('../utils/utils');
const path = require('path');
const fs = require('fs');

module.exports = (app) => {
    app.get(['/', '/login'], (req, res) => {
        console.log(`Retrieving file ${path.join(__dirname + '/../../client/build/index.html')}`)
        var exists = fs.existsSync(path.join(__dirname + '/../../client/build/index.html'))
        console.log(exists);
        res.sendFile(path.join(__dirname + '/../../client/build/index.html'));
    })
    app.get(['/profile'],utils.ensureAuthenticated, (req, res) => {
        console.log('folder')
        res.sendFile(path.join(__dirname + '/../../client/build/index.html'));
    })
}