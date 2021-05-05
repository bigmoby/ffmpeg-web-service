var express = require('express'),
    cors = require('cors'),
    errorhandler = require('errorhandler'),
    compression = require('compression'),
    session = require('express-session'),

    winston = require('winston'),
    bodyParser = require('body-parser'),
    consts = require(__dirname + '/app/constants.js');

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, { 'timestamp': true });

var app = express();

require('express-readme')(app, {
    filename: 'README.md',
    routes: ['/', '/readme'],
});

app.use(cors());
app.use(compression());

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use(errorhandler());

app.use(require(__dirname + '/app/routes'));

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {

    let log = JSON.stringify({
        type: 'ffmpeg',
        message: err.message,
    });

    winston.error(log);

    res.status(err.status || 500);

    res.json({
        'errors': {
            message: err.message,
            error: err
        }
    });
});

var server = app.listen(consts.port, function () {

    let host = server.address().address;
    let port = server.address().port;
    winston.info(JSON.stringify({
        action: 'listening',
        url: 'http://' + host + ':' + port,
    }));
});
