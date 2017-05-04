var mongoose = require('mongoose')
var Schema = mongoose.Schema

var qiubaiSchema = new Schema({
  id: Number,
  author: String,
  authorImg: String,
  content: String,
  createdAt: Date,
  updatedAt: Date
});

// the schema is useless so far
// we need to create a model using it
var Qiubai = mongoose.model('Qiubai', qiubaiSchema);

// make this available to our users in our Node applications
module.exports = Qiubai;