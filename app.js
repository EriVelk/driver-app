const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const app = express();
require('./database');
require('./config/passport');

//Importing routes
const indexRoutes = require('./routes/index.router');
const reservationRoutes = require('./routes/reservation.router');
const userRoutes = require('./routes/user.router');
const reportsRoutes = require('./routes/reports.router');

//Config
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'shhhhh'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global variables
app.use((req, res, next) => {
    res.locals.logout_msg = req.flash("logout_msg");
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


//Routes
app.use('/', indexRoutes);
app.use('/', reservationRoutes);
app.use('/', userRoutes);
app.use('/', reportsRoutes);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Start server
app.listen(app.get('port'), () => {
    console.log('Server on port: ', app.get('port'));
});