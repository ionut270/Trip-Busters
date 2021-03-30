  const utils = require('../utils/utils');
  const path = require('path');
  const directions = require('../utils/directions');
  const stackdriver = require('../utils/stackdriver');
  const fs = require('fs');

  module.exports = (app) => {
      app.get(['/', '/login'], (req, res) => {
          res.sendFile(path.join(__dirname + '/../../client/build/index.html'));
      })
      app.get(['/profile', '/calendar'], utils.ensureAuthenticated, (req, res) => {
          res.sendFile(path.join(__dirname + '/../../client/build/index.html'));
      })
      app.get(['/map'], (req, res) => {
          res.sendFile(path.join(__dirname + '/../../client/build/location.html'));
      })
      app.get(['/directions'], async(req, res) => {
          res.send(await directions.findDirections(req.query.id1, req.query.id2));
      })
      app.get(['/api'], async(req, res) => {
          res.send(await directions.returnApi());
      })

  }