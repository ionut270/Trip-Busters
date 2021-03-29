const passport          = require('passport');
const GoogleStrategy    = require('passport-google-oauth2').Strategy;
const datastore         = require('../utils/datastore');

passport.serializeUser  (function (user , done) { done(null, user); });
passport.deserializeUser(function (obj  , done) { done(null, obj);  });

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER}/auth/google/callback`,
    passReqToCallback: true
}, async (request, accessToken, refreshToken, profile, done) =>{
        profile.accessToken = accessToken;
        //checks if user is registered or not. In case he is not registerd, register him
        if(!await datastore.userExists(profile._json.email)) datastore.register(profile._json.email,profile._json)
        done(null,profile)
    }
));

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile', 'https://www.googleapis.com/auth/calendar.readonly'] } ));
    app.get('/auth/google/callback', passport.authenticate('google',{ successRedirect: '/profile', failureRedirect: '/login' }));
    app.get('/logout', (req, res)=>{
        req.logout();
        res.redirect('/');
    });
}