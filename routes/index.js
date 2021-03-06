const router = require("express").Router();
const QR = require("../modules/qr");
const _ = require("lodash");

router.use("/test", require("./api/test"));

/// test this route with
/// http://localhost:3000/qrtest/requestQR?user_id=u1&location_id=lo1&queue_id=qu1gff
router.use("/qrtest", require("./api/qrtest"));

router.use("/store",require("./api/store"))

router.get("/requestQR/:user_id/:location_id/:queue_id", (req, res) => {
  res.setHeader("content-type", "image/png");
  QR.generateQR(
    res,
    req.params.user_id,
    req.params.location_id,
    req.params.queue_id
  );
});

router.get("/nearestStore/:long/:lat/:lim/:minDistance?", (req, res) => {
  req.app.get("storeModel").findNearestStore(
    req.params.long,
    req.params.lat,
    Number(req.params.lim),
    Number(req.params.minDistance) | 0,
    (err, data) => {
      res.send(data);
    }
  );
});

router.post("/requestQueue", (req, res) => {
    var store = req.app.get("storeModel")
    store.findOne({_id:req.body.store_id}, (err, r) => {
        if(err){
            req.next(err)
        } else {
            res.send(r)
        }
    })
})

module.exports = router;
