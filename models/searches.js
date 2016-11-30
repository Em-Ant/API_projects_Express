'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Searches = new Schema ({
  term : {type: String, required: true},
  when : {type: Date, default: Date.now, expires: 60*60*24*30}
}, {
  versionKey: false
});

module.exports = mongoose.model('Searches', Searches)
