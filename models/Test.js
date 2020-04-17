const mongoose = require('mongoose')

var Test = new mongoose.Schema({
    msg:String,
    id:String
})

mongoose.model('Test', Test);



