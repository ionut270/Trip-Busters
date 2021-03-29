const utils = require("../utils/utils");
module.exports = (app) => {
  app.get("/profile/data", utils.ensureAuthenticated, (req, res) => {
    var mockup = {"sub":"117961154625452728308","name":"Ionut Oancea","given_name":"Ionut","family_name":"Oancea","picture":"https://lh3.googleusercontent.com/a-/AOh14GihP46a2Zulx4otg77aB4L_yDTJjH8vvd3I-MsXOg=s96-c","email":"oanceaionut15@gmail.com","email_verified":true,"locale":"en-GB"}
    //res.send(req.user._json);
    res.send(mockup)
  });
};
