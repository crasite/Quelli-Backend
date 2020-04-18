const router = require('express').Router();
const mongoose = require('mongoose')
const StoreController = require('../../modules/store')

var StoreModel = mongoose.model('Store');

router.get('/', (req, res) => {
    text = req.query.text
    limit = parseInt(req.query.limit)
    console.log("search text"+text)
    stores = StoreController.searchStoreName(StoreModel,text,limit,(err,result)=>{
        return res.json({
            "search_text":text,
            "stores":result,
            "err":err
        })
    })
})

router.put('/',(req,res)=>{
    store = new StoreModel({
        store_name:req.body.store_name,
        store_id:req.body.store_id,
    })

    store.save().then((result)=>{
        return res.json({saved: result._id});
    }).catch((err)=>{
        return res.json({err: err});

    })

})



module.exports = router;