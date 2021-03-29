const utils = require('../utils/utils');
const gcal  = require('../utils/GoogleCalendar');

module.exports = (app) => {
    app.get('/calendar', utils.ensureAuthenticated, (req, res) => {
        var calendarId  = "oanceaionut15@gmail.com"
        var acess_token = req.session.passport.user.accessToken;
        gcal(acess_token).events.list(calendarId, { maxResults: 1 }, function (err, data) {
            if (err) return res.send(500, err);
            console.log(data)
            if (data.nextPageToken) {
                gcal(acess_token).events.list(calendarId, { maxResults: 1, pageToken: data.nextPageToken }, function (err, data) {
                    console.log(data.items)
                })
            }
            return res.send(data);
        });
    })
}