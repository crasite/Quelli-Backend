const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

var User = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  queue: [
    {
      queue_id: String,
      store_id: String,
      time_slot: Number,
      status: String,
      verification_code: String,
    },
  ],
});

//TODO add callback
User.methods.addQueue = function (queue_id, store_id, time_slot, status) {
    var queueItem = {
      queue_id: queue_id,
      store_id: store_id,
      time_slot: time_slot,
      status: status,
      verification_code: uuidv4(),
    }
  this.model("User")
    .find({ _id: this.id })
    .update({ $push: { queue: queueItem } }).exec();
};

mongoose.model("User", User);