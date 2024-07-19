import axios from "axios";

const API_URL = 'http://localhost:5500';

//POST /signup
export const signUp = async (userSignUpData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userSignUpData);
        return response.data; // Return the entire response data object
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data; // Return error response data
        } else {
            return { error: 'An unknown error occurred. Please try again.' }; // Return a generic error message
        }
    }
};

//POST /signin
export const signIn = async (userSignInData) => {
    try {
        const response = await axios.post(`${API_URL}/signin`, userSignInData);
        return response.data; // Return the entire response data object
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data; // Return error response data
        } else {
            return { error: 'An unknown error occurred. Please try again.' }; // Return a generic error message
        }
    }
};

//GET /getprofile

export const getUserProfile = async (data) => {
    try {
        const response = await axios.get(`${API_URL}/getprofile/${data}`);
        console.log(response.data);
        return response.data; // Return the entire response data object
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data; // Return error response data
        } else {
            return { error: 'An unknown error occurred. Please try again.' }; // Return a generic error message
        }
    }
}

//POST /complaintReg
export const complaintRegister=async (complaintFormData)=>{
    try{
        const response = await axios.post(`${API_URL}/complaintReg`, complaintFormData);
        return response.data; // Return the entire response data object
    } catch(error){
        if (error.response && error.response.data) {
            return error.response.data; // Return error response data
        } else {
            return { error: 'An unknown error occurred. Please try again.' }; // Return a generic error message
        }
    }
}

//GET /getusercomplaints

export const userComplaintDetails = async (data) => {
    try {
        const response = await axios.get(`${API_URL}/getusercomplaints/${data}`);
        return response.data; // Return the entire response data object
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data; // Return error response data
        } else {
            return { error: 'An unknown error occurred. Please try again.' }; // Return a generic error message
        }
    }
}
//GET /getallcomplaints
export const userAllComplaints = async () => {
    try {
        const response = await axios.get(`${API_URL}/getallcomplaints`);
        return response.data; // Return the entire response data object
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data; // Return error response data
        } else {
            return { error: 'An unknown error occurred. Please try again.' }; // Return a generic error message
        }
    }
}

//GET /pendingcomplaints
export const getPendingComplaints = async () => {
    try {
        const response = await axios.get(`${API_URL}/pendingcomplaints`);
        return response.data; // Return the entire response data object
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data; // Return error response data
        } else {
            return { error: 'An unknown error occurred. Please try again.' }; // Return a generic error message
        }
    }
}

//GET /getagents
export const allAgents = async () => {
    try{
        const response= await axios.get(`${API_URL}/getagents`);
        console.log(response.data);
        return response.data;
    } catch(error){
        if(error.response && error.response.data){
            return error.response.data;
        } else{
            return {error:"An unknown error occured. Please try again. "};
        }
    }
}

//POST /assignagent
export const assignAgent = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/assignagent`,data);
        console.log(response.data);
        return response.data;
    } catch(error) {
        if(error.response && error.response.data){
            return error.response.data;
        } else{
            return {error:"An unknown error occured. Please try again. "};
        }
    }
}

//GET /viewagentcomplaints
export const agentAssignedComplaints = async (data) => {
    try {
        const response = await axios.get(`${API_URL}/viewagentcomplaints/${data}`);
        console.log(response.data);
        return response.data; // Return the entire response data object
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data; // Return error response data
        } else {
            return { error: 'An unknown error occurred. Please try again.' }; // Return a generic error message
        }
    }
}

//POST /updatecomplaintstatus
export const updateComplaintStatus = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/updatecomplaintstatus`,data);
        console.log(response.data);
        return response.data; // Return the entire response data object
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data; // Return error response data
        } else {
            return { error: 'An unknown error occurred. Please try again.' }; // Return a generic error message
        }
    }
}