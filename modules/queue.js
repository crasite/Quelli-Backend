
isSlotAvailable = (model,store_id,time_slot)=>{
    model.find({"store_id":store_id})
        .exec((err,results)=>{
            if (results.length==0){
                return false
            }
            console.log("storequeue: "+results) //  ตรงนี้นะ
            console.log("storequeue: "+results.id) // 
            console.log("serr "+err)

            return true
            taken = results.queue.filter(q => q.time_slot == time_slot).count
            return taken<results.max_customer
        })

}

reserveSlot = (model,store_id,user_id,time_slot,cb)=>{
    isAvaliable = isSlotAvailable(model,store_id,time_slot)
    if (!isAvaliable){
        cb("store not found",{})
        return
    }
    queueItem = {
        user_id:user_id,
        time_slot:time_slot,
        status:"reserved"
    }
    model.findOneAndUpdate(
        {store_id:store_id},
        {new:true},
        {$push:{queue:queueItem}}
    ).exec(cb)
}


getQueue = (model,user_id,cb)=>{
    model.find({"queue.user_id":user_id},cb)
}

module.exports.reserveSlot = reserveSlot;
module.exports.getQueue = getQueue;
