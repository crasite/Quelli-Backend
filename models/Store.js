const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

var Store = new mongoose.Schema({
  store_name: String,
  store_id: String,
  auth_key: String,
  max_customer: Number,

  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  queue: [
    {
      queue_id: String,
      time_slot: Number,
      in_queue: [
        {
          user_id: String,
        },
      ],
      status: String,
    },
  ],
});

Store.plugin(mongoose_fuzzy_searching,{fields:["store_name"]})

Store.index({ location: "2dsphere"});

var model = mongoose.model("Store", Store);

module.exports = model;

