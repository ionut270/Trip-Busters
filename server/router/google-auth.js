const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser  (function (user , done) { done(null, user); });
passport.deserializeUser(function (obj  , done) { done(null, obj);  });

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER}/auth/google/callback`,
    passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) =>
    done(null,profile)
));


module.exports = (app) => {
    app.get('/auth/google',
        passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
        ));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/login'
        }))
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });
}