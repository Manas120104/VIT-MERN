import userComplain from "../models/userComplaint.js";
import {v4 as uuidv4} from 'uuid';

//POST complaintReg
export const complaintReg=async (req,res)=>{
    try{
        console.log("In complaintReg");
        const {name, phoneNumber, email, complaintTitle, complaintDescription, userId}=req.body;
        var compTicketId=uuidv4()
        const newComplaint=new userComplain({
            name,
            phoneNum:parseInt(phoneNumber),
            email,
            complaintDescription,
            complaintTitle,
            status:"Pending",
            ticketId: compTicketId,
            userId
        });
        await newComplaint.save();
        return res.status(201).json({message:"Your complaint has been registered",ticketId:compTicketId});
    } catch(err){
        res.status(501).json({error:"Internal Server Error"});
    }
};

// GET /getusercomplaints
export const getUserComplaints = async (req, res) => {
    try {
        console.log("/getusercomplaints");
        const { userId } = req.params;
        const result = await userComplain.find({ userId });

        if (result.length > 0) { // Check if result array has items
            return res.status(200).json({ message: "Fetched all complaints", status: result });
        } else {
            return res.status(404).json({ message: "No complaints found", status: "Request is not registered" });
        }
    } catch (err) {
        console.error("Error!! ", err);
        return res.status(500).send("Internal Server Error");
    }
}
