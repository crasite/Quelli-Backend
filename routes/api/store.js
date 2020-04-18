const router = require('express').Router();
const mongoose = require('mongoose')
const StoreController = require('../../modules/store')
const QueueController = require('../../modules/queue')


var StoreModel = mongoose.model('Store');

router.get('/', (req, res) => {
    text = req.query.text
    limit = parseInt(req.query.limit)
    console.log("search text" + text)
    stores = StoreController.searchStoreName(StoreModel, text, limit, (err, result) => {
        return res.json({
            "search_text": text,
            "stores": result,
        })
    })
})

router.put('/', (req, res) => {
    store = new StoreModel({
        store_name: req.body.store_name,
        store_id: req.body.store_id,
        auth_key: req.body.auth_key,
        location: {
            coordinates: req.body.location.coordinates,
            type: req.body.location.type
        }
    })

    store.save().then((result) => {
        return res.json({ saved: result._id });
    }).catch((err) => {
        return res.json({ error: err });

    })

})

//model,store_id,user_id,time_slot,cb
router.put("/queue", (req, res) => {
    QueueController.reserveSlot(
        StoreModel,
        req.body.store_id,
        req.body.user_id,
        req.body.time_slot,
        (err,result)=>{
            if(err){
                return res.json({ error: err });
            }
            console.log(result)
            return res.json({ queue_id: result._id });
        }
    )
})

router.get("/queue", (req, res) => {
    return res.json({ error: "implementing :D" });
})




module.exports = router;