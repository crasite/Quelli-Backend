const mongoose = require('mongoose')

var User = new mongoose.Schema({
    name:String,
    user_id:String,
    queue:[{
        queue_id:String,
        store_id:String,
        time_slot:Number,
        status:String,
        confirmation_code:String
    }]
})

mongoose.model('User', User);



