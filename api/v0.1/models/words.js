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
      understand:{ type: Boolean, default: false },
      history:[
        {
          url: String,
          title: String,
          action: { type: Number, default: 0 }, // 0 read, 1 understand, 2 do not understand
          read_date: { type: Date, default: Date.now }
        }
      ]
    }
  ],
  last_update: { type: Date, default: Date.now },

});

module.exports = mongoose.model('Word', wordsSchema);
