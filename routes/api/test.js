const router = require('express').Router()
const mongoose = require('mongoose')
const locationHelper = require('../../modules/location')


var Test = mongoose.model('Test');

router.get('/error', (req, res) => {
    throw "TEST"
})

router.get('/ping', (req, res) => res.send('Hello World!'))

router.get('/store/:long/:lat/:lim', (req, res) => {
    locationHelper.findNearestStore(req.app.get("storeModel"), req.params.long, req.params.lat, Number(req.params.lim), (err, data) => {
        var text = ""
        for(i = 0;i<req.params.lim;i++){
            text += data[i].name + "</br>"
        }
        res.send(text)
    })
})

router.get('/:id', (req, res) => {
    Test.find({id:req.params.id}, (error, object) => {
        res.send(object)
    })
})

router.post('/', (req, res) => {    
    test = new Test({
        id:req.body.id,
        msg:req.body.msg
    })

    test.save().then(function(){
        return res.json({saved: test.id});
    })

})

module.exports = router;