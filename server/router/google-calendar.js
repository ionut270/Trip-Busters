const utils = require('../utils/utils');
const gcal = require('../utils/GoogleCalendar');

module.exports = (app) => {
    app.all('/calendar',utils.ensureAuthenticated, function (req, res) {

        var mockup = {"kind":"calendar#calendarList","etag":"\"p334etdksrnauu0g\"","nextSyncToken":"CMjutpzd1e8CEhdvYW5jZWFpb251dDE1QGdtYWlsLmNvbQ==","items":[{"kind":"calendar#calendarListEntry","etag":"\"1617023384088000\"","id":"classroom105210657448756981749@group.calendar.google.com","summary":"PSGBD_CosminVârlan","timeZone":"UTC","colorId":"16","backgroundColor":"#1967d2","foregroundColor":"#ffffff","accessRole":"reader","defaultReminders":[],"conferenceProperties":{"allowedConferenceSolutionTypes":["hangoutsMeet"]}},{"kind":"calendar#calendarListEntry","etag":"\"1617023384845000\"","id":"ro.romanian#holiday@group.v.calendar.google.com","summary":"Sărbători în România","description":"Zile nelucrătoare și sărbători religioase în România","timeZone":"Europe/Bucharest","colorId":"7","backgroundColor":"#42d692","foregroundColor":"#000000","accessRole":"reader","defaultReminders":[],"conferenceProperties":{"allowedConferenceSolutionTypes":["hangoutsMeet"]}},{"kind":"calendar#calendarListEntry","etag":"\"1617023385777000\"","id":"classroom115113447283526516030@group.calendar.google.com","summary":"Seminar FAI - Ioana Leahu","timeZone":"UTC","colorId":"2","backgroundColor":"#b80672","foregroundColor":"#ffffff","accessRole":"reader","defaultReminders":[],"conferenceProperties":{"allowedConferenceSolutionTypes":["hangoutsMeet"]}},{"kind":"calendar#calendarListEntry","etag":"\"1617023387178000\"","id":"addressbook#contacts@group.v.calendar.google.com","summary":"Birthdays","description":"Displays birthdays, anniversaries and other event dates of people in Google Contacts.","timeZone":"Europe/Bucharest","colorId":"17","backgroundColor":"#9a9cff","foregroundColor":"#000000","accessRole":"reader","defaultReminders":[],"conferenceProperties":{"allowedConferenceSolutionTypes":["hangoutsMeet"]}},{"kind":"calendar#calendarListEntry","etag":"\"1617028671453000\"","id":"oanceaionut15@gmail.com","summary":"oanceaionut15@yahoo.com","timeZone":"Europe/Bucharest","colorId":"12","backgroundColor":"#fad165","foregroundColor":"#000000","selected":true,"accessRole":"owner","defaultReminders":[{"method":"popup","minutes":30},{"method":"email","minutes":30}],"notificationSettings":{"notifications":[{"type":"eventCreation","method":"email"},{"type":"eventChange","method":"email"},{"type":"eventCancellation","method":"email"},{"type":"eventResponse","method":"email"}]},"primary":true,"conferenceProperties":{"allowedConferenceSolutionTypes":["hangoutsMeet"]}}]}
        res.send(mockup);
        return;
        
        var accessToken = req.session.passport.user.accessToken;
        gcal(accessToken).calendarList.list(function (err, data) {
            if (err) return res.send(500, err);
            return res.send(data);
        });
    });

    app.all('/calendar/:calendarId',utils.ensureAuthenticated, function (req, res) {
        var accessToken = req.session.passport.user.accessToken;
        var calendarId = req.params.calendarId;

        gcal(accessToken).events.list(calendarId, { maxResults: 1 }, function (err, data) {
            if (err) return res.send(500, err);
            if (data.nextPageToken) {
                gcal(accessToken).events.list(calendarId, { maxResults: 1, pageToken: data.nextPageToken }, function (err, data) {
                    console.log(data.items)
                })
            }

            return res.send(data);
        });
    });

    app.all('/calendar/:calendarId/:eventId',utils.ensureAuthenticated, function (req, res) {

        var accessToken = req.session.passport.user.accessToken;
        var calendarId = req.params.calendarId;
        var eventId = req.params.eventId;

        gcal(accessToken).events.get(calendarId, eventId, function (err, data) {
            if (err) return res.send(500, err);
            return res.send(data);
        });
    });
}