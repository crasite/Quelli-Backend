const mongoose = require('mongoose')

var User = new mongoose.Schema({
    user_name: {
        type:String,
        required: true,
    },
    user_id: {
        type:String,
        required: true,
        unique:true
    },
    queue:[{
        queue_id:String,
        store_id:String,
        time_slot:Number,
        status:String,
        confirmation_code:String
    }]
})

mongoose.model('User', User);



