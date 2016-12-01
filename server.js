
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');
mongoose.connect(config.mongoURI, function(err){
  if(err) console.log('DB connection failed');
});

var route = require('./routes');

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.enable('trust proxy');

route(app);

// listen for requests :)
var listener = app.listen(config.port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
