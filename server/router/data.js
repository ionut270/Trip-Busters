const utils = require("../utils/utils");
module.exports = (app) => {
  app.get("/profile/data", utils.ensureAuthenticated, (req, res) => {
    res.send(req.user._json);
  });
};
