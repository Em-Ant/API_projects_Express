
if(process.env != 'production') {
  require('dotenv').load();
}

module.exports = {
  googleKey: process.env.GOOGLE_API_KEY,
  googleCx: process.env.GOOGLE_SEARCH_ENGINE,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/micro-api',
  port: process.env.PORT || 3000
};
