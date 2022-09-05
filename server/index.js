// commonjs module
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/User');
require('./services/passport');

const keys = require('./config/keys');

// connect the database
mongoose.connect(keys.mongoURI);

// application(running express app)
const app = express();

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

// telling node js to listen to port 8000
const PORT = process.env.PORT || 8000
app.listen(PORT);

