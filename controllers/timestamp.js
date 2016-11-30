module.exports = function(req, res) {
  
  var dateObj = response = {};
  var dateString = req.params.date;
  if(dateString == undefined) {
    dateObj = new Date(Date.now());
  } else {
    if (isNaN(Number.parseInt(dateString))) {
      // date param is a date string
      dateObj = new Date(dateString);
    } else {
      // date param is a unix timestamp (in seconds)
      // Date constructor needs milliseconds
      dateObj = new Date(req.params.date * 1000);
    }
  }
  
  if (!isNaN(dateObj.getTime())) {
    // dateObj is a valid Date Object
    response = {
      "unix": Math.floor(dateObj.getTime()/1000),
      "natural": dateObj.toUTCString()
    }

  } else {
    response = { error : 'Invalid Date' };
  }
  
  res.json(response);
}