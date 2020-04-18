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
        (error,result)=>{
            if(error || !result){
                return res.json({ error: error });
            }
            return res.json({ queue_id: result._id });
        }
    )
})

router.post("/queue/", (req, res) => {
    from = 0
    if (req.body.from){
        from = req.body.from
    }
    QueueController.getQueue(
        StoreModel,
        req.body.user_id,
        parseInt(from),
        (err,result)=>{
            filter_result = result.map((item)=>{
                item.queue = item.queue.filter((item2)=>{
                    return item2.user_id == req.body.user_id &&
                            item2.time_slot >= from
                })
            })
            res.json({ result: result });

        }
    )
})




module.exports = router;