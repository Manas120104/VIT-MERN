import userComplain from "../models/userComplaint.js";
import User from "../models/User.js";
//POST /assignagent
export const assignAgent= async(req,res)=>{
    try{
        console.log("/assignagent");
        const {agentId,ticketId}=req.body;
        const ticket = await userComplain.findOneAndUpdate(
            { ticketId},
            { $set: { agentId, status: 'Processing' } },
            { new: true } // This option ensures the updated document is returned
        );
        if (ticket) {
            return res.status(201).json({message:'Ticket updated successfully:', ticket});
        } else {
            return res.status(404).json({message:"Ticket Not Found"});
        }
    } catch(err){
        return res.status(500).send("Internal Server Error");
        console.error(err);
    }
}
//GET /getagents
export const getAgents= async(req,res)=>{
    try{
        console.log("/getAgents");
        const result=await User.find({role:'agent'});
        if(result){
            return res.status(201).json({message:"Fetched all agents",agentList:result});
        }else{
            return res.status(404).json({message:"No Active agents found"});
        }
    } catch(err){
        return res.status(500).send("Internal Server Error");
        console.error(err);
    }
}

//GET /getallcomplaints
export const getAllComplaints= async(req,res)=>{
    try{
        console.log("/getallcomplaints");  
        const result=await userComplain.find({ status: { $ne: 'resolved' }});
        if(result){
            return res.status(201).json({message:"Fetched all usercomplaints",status:result});
        }else{
            return res.status(404).json({message:"No Active agents found"});
        }
    } catch(err){
        return res.status(500).send("Internal Server Error");
        console.error(err);
    }
}

//GET /pendingcomplaints
export const pendingComplaints= async(req,res)=>{
    try{
        console.log("/getallcomplaints");  
        const result=await userComplain.find({ status: 'Pending'});
        if(result){
            return res.status(201).json({message:"Fetched all usercomplaints",status:result});
        }else{
            return res.status(404).json({message:"No Active agents found"});
        }
    } catch(err){
        return res.status(500).send("Internal Server Error");
    }
}