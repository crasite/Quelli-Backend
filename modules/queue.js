
isSlotAvailable = (model,store_id,user_id,time_slot,cb)=>{
    model.findOne({"store_id":store_id},(err,result)=>{
        if (!result || err){
            return cb("store not found",false)
        }
        current_timeslot = result.queue.filter((item)=>item.time_slot == time_slot)
    
        isQueueFree = current_timeslot.length < result.max_customer
        isAlreadyInQueue = current_timeslot.some((item)=>item.user_id==user_id)

        console.log("isQueueFree: " + isQueueFree)
        console.log("isAlreadyInQueue: " + isAlreadyInQueue)

        if (!isQueueFree){
            cb("time slot is full",false)
        }

        if(isAlreadyInQueue){
            cb("aleady in queue on timeslot")
        }

        return cb(null,true)

    })
    
}

reserveSlot = (model,store_id,user_id,time_slot,cb)=>{
    isSlotAvailable(model,store_id,user_id,time_slot,(err,isAvailable)=>{
        if (!isAvailable){
            console.log("not avaliable")
            cb(err,{})
        }else{
            console.log("avaliable")
            queueItem = {
                user_id:user_id,
                time_slot:time_slot,
                status:"reserved"
            }

            model.findOneAndUpdate(
                {store_id:store_id},
                {$push:{queue:queueItem}}
            ).exec(cb)
        }
    })
    
}


getQueue = (model,user_id,from,cb)=>{
    // model.find({"queue.user_id":user_id},cb)
    model.find({"queue.user_id":user_id,"queue.time_slot":{$gte:from}},cb)

}

module.exports.reserveSlot = reserveSlot;
module.exports.getQueue = getQueue;
