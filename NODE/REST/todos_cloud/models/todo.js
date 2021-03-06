const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    minlength: [5, 'Path `text` (`{VALUE}`) is shorter, then minimum allowed length (5).'],
    required: [true, 'Path `text` is required'],
  },
  date: Date,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner'
  }
})

module.exports = mongoose.model('Todo', todoSchema)