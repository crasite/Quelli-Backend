const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");

var Store = new mongoose.Schema({
  store_name: {
    type: String,
    required: true,
  },
  store_id: {
    type: String,
    required: true,
    unique: true,
  },
  auth_key: {
    type: String,
    required: true,
  },

  max_customer: {
    type: String,
    default: 20,
  },

  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      // required: true,
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

Store.plugin(mongoose_fuzzy_searching, { fields: ["store_name"] });

Store.index({ location: "2dsphere" });

/**
 *
 * @param {Double} longtitude
 * @param {Double} latitude
 * @param {number} limit
 * @param {callback} (error, result)
 */
Store.statics.findNearestStore = function(longtitude, latitude, limit, cb) {
  // this.find({
  //   location: {
  //     $nearSphere: {
  //       $geometry: {
  //         type: "Point",
  //         coordinates: [longtitude, latitude],
  //       },
  //     },
  //   },
  // })
  this.aggregate([
    {
      $geoNear: {
        near: { 
          type: "Point", 
          coordinates: [Number(longtitude), Number(latitude)] 
        },
        distanceField: "distance",
        spherical: true,
      }
    },
    {$limit: limit}
  ])
    .exec(cb);
};

var model = mongoose.model("Store", Store);

module.exports = model;
