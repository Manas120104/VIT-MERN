import mongoose from "mongoose";

const userComplaintSchema= new mongoose.Schema({
    ticketId:{type:String,required:true}, 
    name:{type:String, required:true},
    phoneNum:{type:Number,required:true},
    email:{type:String,required:true},
    complaintTitle:{type:String,required:true},
    complaintDescription:{type:String,required:true},
    status:{type:String,required:true},
    userId:{type:String,required:true},
    agentId:{type:String,required:false}

});

const userComplain=mongoose.model("usercomplaint",userComplaintSchema);

export default userComplain;