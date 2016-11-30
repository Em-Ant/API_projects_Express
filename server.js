
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

route(app);
app.enable('trust proxy');

app.get("/:selector?", function (req, res) {
  var view = req.params.selector;
  var status = 200;
  if(view &&
    ['timestamp', 'whoami', 'shurl', 'imgsearch', 'fileanalyse']
      .indexOf(view) == -1) {
        status = 404;
  }
  res.status(status).render('index', {
    selector : view,
    home: req.protocol +' ://' + req.hostname
  });
});

app.use(function(req, res, next){
  res.status(404).json({error: 'Not Found'});
})

// listen for requests :)
var listener = app.listen(config.port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
