var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User_id = require('./users');
var wordsSchema = new Schema({
  user_id: {
    type: Schema.ObjectId,
    ref: 'User_id',
    required: 'User_id is null.',
  },
  words:[
    {
      name: String,
      count: { type: Number, default: 0 },
      last_update: { type: Date, default: Date.now },
      understand:{ type: Boolean, default: false }
    }
  ],
  last_update: { type: Date, default: Date.now },

});

module.exports = mongoose.model('Word', wordsSchema);
