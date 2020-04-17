const router = require('express').Router();

router.use('/ping', require('./api/ping'));
router.use('/error', require('./api/error'));


module.exports = router;