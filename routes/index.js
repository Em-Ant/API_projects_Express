var apiRoute = require('./api');
var indexHandler = require('../controllers/indexHandler');
module.exports = function(app) {
  app.use('/api', apiRoute);
  app.get('/:selector?', indexHandler);
}
