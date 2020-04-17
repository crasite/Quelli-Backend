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
const generateQR = (res, user_id, location_id, queue_id) => {
  var text = `{"user_id":"${user_id}", "location_id":"${location_id}", "queue_id":"${queue_id}"}`;
  QRCode.toFileStream(res, text);
};


module.exports.generateQR = generateQR;
