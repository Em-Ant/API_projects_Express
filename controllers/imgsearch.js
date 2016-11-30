var Searches = require('../models/searches.js');
var request = require('request');

var config = require('../config');
var cx = config.googleCx;
var apiKey = config.googleKey;

exports.searchImages = function (req, res) {

  var searchTerm = req.params.what;

  // Using Google API
  var searchUrl = "https://www.googleapis.com/customsearch/v1?searchType=image&key="
    + apiKey + "&cx=" + cx + "&q=" + searchTerm;

  // check if the 'offset' query param is there and is a positive number
  if (req.query.offset) {
    var offset = parseInt(req.query.offset, 10);
    if (offset && offset > 0) {
      searchUrl += ('&start=' + offset);
    }
  }

  var searchResult = [];

  request(searchUrl, {json: true}, function(searchErr, searchRes, data) {
    if (searchErr) {
      res.status(400);
      res.json(searchErr);
    } else {

      // map google returned data to the required output format
      searchResult = data.items.map(function(item){
        return {
          'url' : item.link,
          'snippet' : item.snippet ,
          'thumbnail' : item.image.thumbnailLink,
          'context' : item.image.contextLink
        }
      });

      // create a new search item and store it in the db
      var currentSearch = new Searches ({'term': searchTerm});
      currentSearch.save(function (saveErr) {
        if (saveErr) {
          res.json(saveErr)
          return
        }
        res.status(200).json(searchResult);
      })
    }
  });
};

exports.getLatestSearches = function (req, res) {

  // return the last 10 searches, ordered by date
  Searches
    .find({},{'_id':false}).sort('-when').limit(10).exec(function (err, recentSearches){
      if (err) {
        res.json({'error': 'db query error'});
        return;
      }
      res.json(recentSearches);
    })
};
