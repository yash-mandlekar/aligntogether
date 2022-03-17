const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/Align');


const authSchema = mongoose.Schema({
  username: String,
  email:String,
  password: String,
  posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"posts"
  }],
  CreatedDate: Date
})

authSchema.plugin(plm);

module.exports = mongoose.model('user',authSchema);