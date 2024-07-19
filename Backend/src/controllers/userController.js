import { hash } from 'bcrypt';
import User from '../models/User.js';
import { hashPassword } from '../utils/bcryptUtils.js';
import { comparePassword } from '../utils/bcryptUtils.js';
// POST /signup
export const signup = async (req, res) => {
    try {
        console.log("/signup")
        const { name, email ,mobileNumber, address, role , username, password } = req.body;
        const existingEmailId = await User.findOne({ email });
        const existingUser = await User.findOne({ username });
        const existingPhone = await User.findOne({ mobileNumber });

        if (existingUser) {
            return res.status(400).json({ error: "Username already exists. Please choose a different username." });
        }
        if (existingPhone) {
            return res.status(400).json({error: "Phone number already exists. Please choose a different username."});
        }
        if (existingEmailId) {
            return res.status(400).json({ error: "Email ID already exists. Please choose a different username." });
        }

        const hashedPassword = await hashPassword(password);
        let id;
        if (role === "user") {
            const randomNumber = Math.floor(Math.random() * 900) + 100; // Generates a random number between 100 and 999
            id = `USER${randomNumber}`;
        } else if(role==="agent"){
            const randomNumber = Math.floor(Math.random() * 900) + 100; // Generates a random number between 100 and 999
            id = `AGENT${randomNumber}`;
        }else{
            const randomNumber = Math.floor(Math.random() * 900) + 100; // Generates a random number between 100 and 999
            id = `ADMIN${randomNumber}`;
        }
        
        const newUser = new User({
            _id:id,
            name: name,
            email,
            mobileNumber: parseInt(mobileNumber),
            address,
            role,
            username,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(200).json({message:"User registered successfully"});
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal Server Error");
    }
};

// POST /signin
export const signin = async(req, res)=>{
    try{
        console.log("/signin")
        const { role , username, password } = req.body;
        var hashInDb=await User.findOne({username});
        if(!hashInDb){
            return res.status(401).json({error:"Username does not exist!!!!"});
            
        }
        const result=await comparePassword(password,hashInDb.password);
        if(result && role== hashInDb.role){
            return res.status(200).json({message:"Authorized",role:role,id:hashInDb._id});
        }else{
           return res.status(401).json({error:"Unauthorized"});
        }
    }catch(err){
        res.status(500).send("Internal Server Error");
    }
};

//GET /getprofile

export const getProfile = async(req, res) => {
    try{
        console.log('/getprofile');
        const {userId}= req.params;
        const result= await User.findOne({_id:userId});
        if(result){
            return res.status(200).json({message:"Profile Found",role:result.role,name:result.name,emailId:result.email,phno:result.mobileNumber});
        }
        else{
            return res.status(404).json({mesage:"Profile not found"});
         }
    } catch(err){
        res.status(500).send("Internal Server Error");
    }
}
    