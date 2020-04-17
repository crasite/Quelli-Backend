const router = require('express').Router();

router.use('/test', require('./api/test'));

/// test this route with
/// http://localhost:3000/qrtest/requestQR?user_id=u1&location_id=lo1&queue_id=qu1gff
router.use('/qrtest', require('./api/qrtest'));

module.exports = router;