import express from 'express';
import { signup,signin, getProfile } from '../controllers/userController.js';
import { complaintReg } from '../controllers/userComplaintController.js';
import { getUserComplaints } from '../controllers/userComplaintController.js';
import { get } from 'mongoose';
import {getAgents,getAllComplaints,assignAgent, pendingComplaints} from '../controllers/adminController.js'
import {viewComplaints,updateComplaintStatus} from '../controllers/agentController.js'
const router = express.Router();

router.post('/signup', signup);
router.post('/signin',signin);
router.get('/getprofile/:userId',getProfile);
router.post('/complaintReg',complaintReg);
router.get('/getusercomplaints/:userId',getUserComplaints);
router.get('/getagents',getAgents);
router.get('/getallcomplaints',getAllComplaints);
router.get('/pendingcomplaints',pendingComplaints);
router.post('/assignagent',assignAgent);
router.get('/viewagentcomplaints/:agentId',viewComplaints);
router.post('/updatecomplaintstatus',updateComplaintStatus);


export default router;
