const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  user_id: String,
  status: String,
  CreatedDate: Date
})

module.exports = mongoose.model('posts',postSchema);