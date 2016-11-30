var apiRoute = require('./api');

module.exports = function(app) {
  app.use('/api', apiRoute);
}