const router = require('express').Router();
const QR = require('../../modules/qr/qr')

router.get('/requestQR', (req, res) => {
    res.setHeader("content-type","image/png")
    console.log(req.query)
    QR.generateQR(res,req.query.user_id,req.query.location_id,req.query.queue_id)
})



module.exports = router;