const router = require('express').Router();

router.get('/error', (req, res) => {
    throw "TEST"
})

router.get('/ping', (req, res) => res.send('Hello World!'))


module.exports = router;