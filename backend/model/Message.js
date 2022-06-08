const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema;

const Message = new MessageSchema({
  content: String,
  from: Object,
  socketid: String,
  time: String,
  date: String,
  to: String
});

module.exports = mongoose.model("Message", Message);