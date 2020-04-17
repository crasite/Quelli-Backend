const mongoose = require('mongoose')

var Store = new mongoose.Schema({
    name:String,
    auth_key:String,
    max_customer:Number,

    location:{
        lat:String,
        long:String
    },
    queue:[{
        queue_id:String,
        time_slot:Number,
        in_queue:[{
            user_id:String
        }],
        status:String
    }]
})

mongoose.model('Store', Store);



