const passport = require('passport');

module.exports = app => {
    // authentication with google OAuth
    app.get('/auth/google', passport.authenticate(
        // finds the strategy google
        'google', 
        // asking google for scope information (google has a list of scope can be access)
        {scope: ['profile', 'email']})
    );

    // give google the return code and get the profile
    app.get('/auth/google/callback', passport.authenticate('google'), 
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    // logout
    app.get('/api/logout', (req, res) => {
        req.logout();
        // should be no content
        // res.send(req.user);
        res.redirect('/');
    });

    // get current login user
    app.get('/api/current_user', (req, res) => {
        // res=>request, res => responds
        res.send(req.user);
    });
}



