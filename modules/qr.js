const QRCode = require("qrcode");

/**
 *
 * Generate a png and write it to a stream
 * !! This does not set the response header
 * @param {Response<any>} res
 * @param {string} user_id
 * @param {string} location_id
 * @param {string} queue_id
 */
const generateQR = (res, next, userModel, user_id, queue_id) => {
  userModel.findOne(
    { user_id: user_id, "queue.queue_id": queue_id },
    { queue: { $elemMatch: { queue_id: queue_id } } },
    (err, data) => {
      if (err || !data) {
        return next();
      }
      var text = `{"user_id":"${user_id}", "queue_id":"${queue_id}", "verification_code":"${data.queue[0].verification_code}"}`;
      QRCode.toFileStream(res, text);
    }
  );
};

module.exports.generateQR = generateQR;
