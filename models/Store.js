const mongoose = require("mongoose");
const moment = require('moment');
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
  store_image: Buffer,

  max_customer: {
    type: Number,
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
      user_id: String,
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
 * @param {number} minDistance minimum distance in meter
 * @param {callback} (error, result)
 */
Store.statics.findNearestStore = function (
  longtitude,
  latitude,
  limit,
  minDistance,
  cb
) {
  var minDistance = minDistance | 0;
  var date = new Date()
  var lastPart = date.getHours()*2
  if(date.getMinutes()>=30){
    lastPart += 1
  }
  var timestamp = moment().format("YYYYMMDD")+lastPart
  console.log(timestamp)
  this.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [Number(longtitude), Number(latitude)],
        },
        distanceField: "distance",
        minDistance: minDistance,
        spherical: true,
      },
    },
    { $limit: limit },
    {
      $project: {
        _id: 0,
        store_id: 1,
        name: 1,
        distance: 1,
        queue: {
          $filter: {
            input: "$queue",
            as: "q",
            cond: {
              $gte: ["$$q.time_slot", Number(timestamp)],
            },
          },
        },
      },
    },
  ]).exec(cb);
};

var model = mongoose.model("Store", Store);

module.exports = model;
