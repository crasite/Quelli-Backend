
isSlotAvailable = (model,store_id,user_id,time_slot,cb)=>{
    model.findOne({"store_id":store_id},(err,result)=>{
        if (!result || err){
            return cb(false)
        }
        current_timeslot = result.queue.filter((item)=>item.time_slot == time_slot)
    
        isQueueFree = current_timeslot.length < result.max_customer
        isAlreadyInQueue = current_timeslot.some((item)=>item.user_id==user_id)

        console.log("isQueueFree: " + isQueueFree)
        console.log("isAlreadyInQueue: " + isAlreadyInQueue)
        return cb(isQueueFree && !isAlreadyInQueue)

    })
    
}

reserveSlot = (model,store_id,user_id,time_slot,cb)=>{
    isSlotAvailable(model,store_id,user_id,time_slot,(isAvailable)=>{
        if (!isAvailable){
            console.log("not avaliable")
            cb("unable to join queue",{})
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


getQueue = (model,user_id,cb)=>{
    model.find({"queue.user_id":user_id},cb)
}

module.exports.reserveSlot = reserveSlot;
module.exports.getQueue = getQueue;
