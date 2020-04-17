const mongoose = require("mongoose");

var Store = new mongoose.Schema({
  name: String,
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

Store.index({ location: "2dsphere" });

var model = mongoose.model("Store", Store);

module.exports = model;

