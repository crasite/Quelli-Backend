const router = require('express').Router();

router.use('/ping', require('./api/ping'));

module.exports = router;