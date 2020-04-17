const router = require('express').Router()
const mongoose = require('mongoose')


var Test = mongoose.model('Test');

router.get('/error', (req, res) => {
    throw "TEST"
})

router.get('/ping', (req, res) => res.send('Hello World!'))

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