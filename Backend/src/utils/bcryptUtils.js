import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(parseInt(process.env.salt_rounds));
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async(plainTextPassword,hash)=>{
    try{
        return await bcrypt.compare(plainTextPassword,hash);
    }catch(err){
        console.error("Error in comparing the password",err);
    }
}

