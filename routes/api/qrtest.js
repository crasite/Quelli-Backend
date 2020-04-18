const router = require("express").Router();
const QR = require("../../modules/qr");
const mongoose = require("mongoose");

var UserModel = mongoose.model("User");
var StoreModel = mongoose.model("Store");

router.get("/requestQR", (req, res, next) => {
  res.setHeader("content-type", "image/png");
  QR.generateQR(
    res,
    next,
    UserModel,
    req.query.user_id,
    req.query.queue_id
  );
});

router.put("/verify", (req, res, next) => {
  UserModel.updateOne(
    {
      user_id: req.body.user_id,
      "queue.queue_id": req.body.queue_id,
      "queue.verification_code": req.body.verification_code,
    },
    { "queue.$.status": "verified" },
    (err, data) => {
      if (err) {
        return next(err);
      } else if (data.nModified == 0) {
          return next("Authentification Failed")
      }
      StoreModel.updateOne(
        {
          store_id: req.body.store_id,
          auth_key: req.body.auth_key,
          "queue.queue_id": req.body.queue_id,
        },
        { "queue.$.status": "verified" }
      ).exec((err, doc) => {
        if (err || !data) {
          return next(err);
        }
        res.json({status:"ok"});
      });
    }
  );
});

module.exports = router;
