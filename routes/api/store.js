const router = require("express").Router();
const mongoose = require("mongoose");
const StoreController = require("../../modules/store");
const QueueController = require("../../modules/queue");

var StoreModel = mongoose.model("Store");
var UserModel = mongoose.model("User");

router.get("/", (req, res) => {
  text = req.query.text;
  limit = parseInt(req.query.limit);
  console.log("search text" + text);
  stores = StoreController.searchStoreName(
    StoreModel,
    text,
    limit,
    (err, result) => {
      return res.json({
        search_text: text,
        stores: result,
      });
    }
  );
});

router.get("/:store_id", (req, res) => {
  StoreModel.findOne({ store_id: req.params.store_id }, (err, result) => {
    if (err) {
      res.json({ error: err });
    }
    return res.json(result);
  });
});

router.put("/", (req, res) => {
  store = new StoreModel({
    name: req.body.name,
    store_id: req.body.store_id,
    auth_key: req.body.auth_key,
    location: {
      coordinates: req.body.location.coordinates,
      type: req.body.location.type,
    },
    max_customer: req.body.max_customer,
  });

  store
    .save()
    .then((result) => {
      return res.json({ saved: result._id });
    })
    .catch((err) => {
      return res.json({ error: err });
    });
});

//model,store_id,user_id,time_slot,cb
router.put("/queue", (req, res) => {
  if (req.body.time_slot < 1000000000 || req.body.time_slot > 9999999999) {
    return res.json({
      error: "time_slot must be between 1000000000 & 9999999999",
    });
  }
  QueueController.reserveSlot(
    StoreModel,
    UserModel,
    req.body.store_id,
    req.body.user_id,
    req.body.time_slot,
    (error, result) => {
      if (error) {
        res.json({ error: error });
      } else {
        res.json({ queue_id: result});
      }
    }
  );
});

router.post("/queue/", (req, res) => {
  from = 0;
  if (req.body.from) {
    from = req.body.from;
  }
  QueueController.getQueue(
    StoreModel,
    req.body.user_id,
    parseInt(from),
    (err, result) => {
      filter_result = result.map((item) => {
        item.queue = item.queue.filter((item2) => {
          return item2.user_id == req.body.user_id && item2.time_slot >= from;
        });
      });
      res.json(result);
    }
  );
});

router.post("/queue/availability",(req,res)=>{
  QueueController.checkAvailability(StoreModel,req.body.store_id,req.body.time_slot,
    (err,result)=>{
      if (err){
        res.json({error:err})
      }else{
        res.json(result)

      }
    })
})

module.exports = router;
