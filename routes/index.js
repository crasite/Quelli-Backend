const router = require('express').Router();

router.use('/test', require('./api/test'));

module.exports = router;