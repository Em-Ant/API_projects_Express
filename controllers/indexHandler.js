module.exports = function(req, res) {

  var view = req.params.selector;
  var title;

  switch(view) {
    case undefined :
      view = 'index';
      title = "API Challenges - Express";
      break;
    case "timestamp" :
      title = "Timestamp Microservice";
      break;
    case "whoami" :
      title = "Request Headers Parser";
      break;
    case "shurl" :
      title = "URL Shortener";
      break;
    case "imgsearch" :
      title = "Image Search Abstraction Layer";
      break;
    case "fileanalyse" :
      title = "File Analyser";
      break;
    default :
      title = "Not Found";
      view = "not_found";
  }

  res.render(view, {
    selector: view,
    title: title,
    home: req.protocol + '://' + req.hostname
  });
}
