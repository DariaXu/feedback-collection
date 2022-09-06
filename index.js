// commonjs module
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

require('./models/User');
require('./services/passport');

const keys = require('./config/keys');

// connect the database
mongoose.connect(keys.mongoURI);

// application(running express app)
const app = express();

// assign body to req.body
app.use(bodyParser.json());
app.use(cookieSession({
    // last 30 days in ms
    maxAge: 30*24*60*60*1000,
    // used to encryot the cookie
    keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

// route
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if(process.env.NODE_ENV == 'production')
{
    // Express will serve up production assets (main.js)
    app.use(express.static('client/build'));

    // Express will serve up index.html fie
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// telling node js to listen to port 8000
const PORT = process.env.PORT || 8000
app.listen(PORT);

