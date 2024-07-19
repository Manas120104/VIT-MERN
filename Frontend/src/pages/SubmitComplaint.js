import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Box } from '@mui/material';
import { complaintRegister } from '../api/apiservices';
import { useNavigate } from 'react-router-dom';

function SubmitComplaint() {
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintDescription, setComplaintDescription] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [ticketId,setTicketId] = useState(null);

  const navigate=useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission here (e.g., send data to backend)
    const userId=sessionStorage.getItem('userId');
    console.log(userId);
    const formData = {
      name,
      phoneNumber,
      email,
      complaintTitle,
      complaintDescription,
      userId,
    };
    try {
      const response = await complaintRegister(formData);
      if (response.message === "Your complaint has been registered") {
        setTicketId(response.ticketId);
      } else if (response.error) {
        alert("Server Error, try again");
      }
    } catch (error) {
      alert('An unexpected error occurred. Please try again.');
    }
  };
  const handleGoBack=async (event)=>{
    setTicketId(null);
    navigate("/");

  } 
  return (
    
    <Container>
      <Paper elevation={12} sx={{ p: 5, mt: 5, boxShadow: '0px 16px 30px rgba(0, 0, 0, 0.4)', borderRadius:2 }}>
      {ticketId && 
     <>
     <Typography variant="h4" sx={{ color: '#3f51b5', mb: 3, textAlign: 'center' }}>
       Ticket Registered Successfully
     </Typography>
     <Box sx={{ textAlign: 'center', p: 2 }}>
       <Typography variant="h6" sx={{ color: '#3f51b5', m: 1 }}>
         Your Ticket ID:
       </Typography>
       <Typography variant="h5" sx={{ color: '#3f51b5', fontWeight: 'bold',m:2.5 }}>
         {ticketId}
       </Typography>
       <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ backgroundColor: '#1976d2', color: '#fff', fontSize: '1.2rem', padding: '10px 20px' }}
              onClick={()=>{handleGoBack()}}
            >
              Go to Home
        </Button>
     </Box>
   </>}
      {!ticketId && <> <Typography variant="h4" sx={{ color: '#3f51b5', mb: 2 }}>Submit Complaint</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mt: 2 }}
            InputLabelProps={{ sx: { fontSize: '1.2rem', fontWeight: 'bold' } }}
            InputProps={{ placeholder: 'Enter your name' }}
          />
          <TextField
            fullWidth
            required
            label="Phone Number"
            variant="outlined"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            sx={{ mt: 2 }}
            InputLabelProps={{ sx: { fontSize: '1.2rem', fontWeight: 'bold' } }}
            InputProps={{ placeholder: 'Enter your phone number' }}
          />
          <TextField
            fullWidth
            required
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mt: 2 }}
            InputLabelProps={{ sx: { fontSize: '1.2rem', fontWeight: 'bold' } }}
            InputProps={{ placeholder: 'Enter your email' }}
          />
          <TextField
            fullWidth
            required
            label="Complaint Title"
            variant="outlined"
            value={complaintTitle}
            onChange={(e) => setComplaintTitle(e.target.value)}
            sx={{ mt: 2 }}
            InputLabelProps={{ sx: { fontSize: '1.2rem', fontWeight: 'bold' } }}
            InputProps={{ placeholder: 'Enter complaint title' }}
          />
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            label="Complaint Description"
            variant="outlined"
            value={complaintDescription}
            onChange={(e) => setComplaintDescription(e.target.value)}
            sx={{ mt: 2 }}
            InputLabelProps={{ sx: { fontSize: '1.2rem', fontWeight: 'bold' } }}
            InputProps={{ placeholder: 'Enter complaint description' }}
          />
          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ backgroundColor: '#1976d2', color: '#fff', fontSize: '1.2rem', padding: '10px 20px' }}
            >
              Submit
            </Button>
          </Box>
        </form></>}
      </Paper>
    </Container>
  );
}

export default SubmitComplaint;
