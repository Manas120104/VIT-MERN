import userComplain from "../models/userComplaint.js";

//GET /viewagentcomplaints
export const viewComplaints=async(req,res)=>{
    try{
        console.log("/viewagentcomplaints");
        const {agentId}=req.params;
        const result=await userComplain.find({agentId,status: { $ne: 'Resolved' }});
        if(result){
            return res.status(200).json({complaints:result});
        }
        else{
            return res.status(401).json({complaints:"Complaints doesnt exist"});
        }
    } catch(err){
        res.status(500).send("Internal Server Error");
        console.log(err);
    }
}

// POST /updatecomplaintstatus

export const updateComplaintStatus=async(req,res)=>{
    try{
        console.log("/updatecomplaintstatus");
        const {ticketId}=req.body;
        const ticket = await userComplain.findOneAndUpdate(
            { ticketId },
            { $set: {  status: 'Resolved' } },
            { new: true } // This option ensures the updated document is returned
        );
        if (ticket && ticket.status!="resolved") {
            return res.status(201).json({message:'Ticket updated successfully:', ticket});
        } else {
            return res.status(404).json({message:"Ticket not found"});
        }
    } catch(err){
        res.status(500).send("Internal Server Error");
        console.log(err);
    }
}


