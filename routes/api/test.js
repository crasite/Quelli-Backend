const router = require("express").Router();
const mongoose = require("mongoose");
const multer = require("multer")();
const FileType = require('file-type');

var Test = mongoose.model("Test");

router.get("/error", (req, res) => {
  throw "TEST";
});

router.get("/ping", (req, res) => res.send("Hello World!"));

router.get("/store/:long/:lat/:lim", (req, res) => {
  req.app
    .get("storeModel")
    .findNearestStore(
      req.params.long,
      req.params.lat,
      Number(req.params.lim),
      (err, data) => {
        var text = "";
        for (i = 0; i < req.params.lim; i++) {
          text += data[i].name + "</br>";
        }
        res.send(text);
      }
    );
});

router.get("/storeImage", (req, res, next) => {
  mongoose
    .model("Store")
    .findOne(
      { store_id: req.query.store_id },
    )
    .exec((err, data) => {
      if (err || !data) {
        next(err);
      } else {
        FileType.fromBuffer(data.store_image).then( mime => {
            res.setHeader("content-type", mime.mime);
            res.send(data.store_image);
        }).catch( err => next(err))
      }
    });
});

router.get("/:id", (req, res) => {
  Test.find({ id: req.params.id }, (error, object) => {
    res.send(object);
  });
});

router.post("/", (req, res) => {
  test = new Test({
    id: req.body.id,
    msg: req.body.msg,
  });

  test.save().then(function () {
    return res.json({ saved: test.id });
  });
});

router.post("/setStoreImage", multer.single("image"), (req, res, next) => {
  mongoose
    .model("Store")
    .updateOne(
      { store_id: req.body.store_id },
      { store_image: req.file.buffer }
    )
    .exec((err, data) => {
      if (err || !data) {
        next(err);
      } else {
          res.json({status:"OK"})
      }
    });
});

module.exports = router;
