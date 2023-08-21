var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const errorHandler = require('./Middlewares/error-handler');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const bodyParser = require("body-parser");
const hotelRoutes = require('./routes/hotels');
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');
const searchHistoryRoutes = require('./routes/searchHistories');
const preferenceRoutes = require('./routes/preferences');
const notificationRoutes = require('./routes/notifications');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/hotels', hotelRoutes);
app.use('/bookings', bookingRoutes);
app.use('/reviews', reviewRoutes);
app.use('/search-histories', searchHistoryRoutes);
app.use('/preferences', preferenceRoutes);
app.use('/notifications', notificationRoutes);
app.use(errorHandler);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
