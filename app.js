'use strict';

var express = require('express');
var app = express();
app.enable('trust proxy');

// example
app.use(express.static('example'));

// extenal lib
app.use('/bootstrap/social', express.static('node_modules/bootstrap-social'))
app.use('/angular', express.static('node_modules/angular'))
app.use('/firebase', express.static('node_modules/firebase'))
app.use('/angularfire', express.static('node_modules/angularfire/dist'))

// [START listen]
var server = app.listen(process.env.PORT || 8080, function() {
    console.log('App listening on port %s', server.address().port);
    console.log('Press Ctrl+C to quit.');
})
