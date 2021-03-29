module.exports = {
    ensureAuthenticated : (req, res, next) => {
        //return next();
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/login');
    }
}