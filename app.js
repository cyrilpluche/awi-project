require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const bodyParser = require('body-parser');

const indexRouter = require('./routes');
const end = require('./controllers').End;
const fileUpload = require('express-fileupload');

const app = express();

// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(fileUpload());

// API Sequelize
app.use('/api', indexRouter);
app.use('/api', end.sendRes);

// GraphQL
//app.use('/graphql', require('./routes/GraphQL'));

// Use React App
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, './client/build')));
    app.get('*', function(request, response) {
        response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
    });
}

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
