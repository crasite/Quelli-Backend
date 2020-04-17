const express = require('express')
const app = express()
const port = 3000
const qr = require('./modules/qr/qr')

app.get('/', (req, res) => {
    res.setHeader("content-type","image/png")
    qr.generateQR(res, "u1", "lo1", "qu1")
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))