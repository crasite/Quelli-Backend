/**
 * 
 * @param {model} model Mongoose model
 * @param {Double} longtitude 
 * @param {Double} latitude 
 * @param {number} limit 
 * @param {callback} (error, result)
 */
const findNearestStore = (model, longtitude, latitude, limit, cb) => {
  model.find({
    location: {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: [longtitude, latitude],
        },
      },
    },
  })
  .limit(limit)
  .exec(cb);
}

module.exports.findNearestStore = findNearestStore