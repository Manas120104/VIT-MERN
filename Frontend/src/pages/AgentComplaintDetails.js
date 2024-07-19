import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Grid, Button } from '@mui/material';
import { agentAssignedComplaints, updateComplaintStatus } from '../api/apiservices';

function AgentComplaintDetails() {
  const [complaintsData, setComplaintsData] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchAgentComplaints = async () => {
      const agentId = sessionStorage.getItem('userId');
      try {
        const response = await agentAssignedComplaints(agentId);
        console.log(response);
        if (response && response.complaints) {
          setComplaintsData(response.complaints);
        } else {
          setError("No complaints found");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      }
    };
    fetchAgentComplaints();
  }, []);
  if (complaintsData.length === 0) {
    return (
      <Container sx={{ mt: '5vh', overflowY: 'auto', maxHeight: '100vh' }}>
        <Paper elevation={3} sx={{ p: 3, backgroundColor: '#FFFFFF', borderRadius: 0, width:"120vh", height:'80vh' }}>
          <Typography variant="h6" sx={{ color: '#000000', textAlign:"center"}}>No Complaints</Typography>
        </Paper>
      </Container>
    );
  }

  const handleButtonClick = async (ticketId) => {
    const data={
      ticketId,
    }
    try{
      const response= await updateComplaintStatus(data);
      setMessage(response.message);
      
    } catch(err){
      setError("An unexpected error occurred");
    }
  };

  if (error) {
    return (
      <Container sx={{ mt: '5vh', overflowY: 'auto', maxHeight: '80vh' }}>
        <Paper elevation={3} sx={{ p: 3, backgroundColor: '#FFFFFF', borderRadius: 0 }}>
          <Typography variant="h6" sx={{ color: '#000000' }}>{error}</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: '5vh', overflowY: 'inherit', maxHeight: '80vh', maxWidth: '100vh' }}>
      <Paper elevation={3} sx={{ p: 3, backgroundColor: '#008ae6', borderRadius: 9 }}>
        <Typography variant="h6" sx={{ color: '#FFFFFF' }}>Assigned Complaints</Typography>
      </Paper>
      {complaintsData.length > 0 ? (
        complaintsData.map(complaint => (
          <Paper key={complaint._id} elevation={3} sx={{ p: 3, mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1"><strong>Ticket ID:</strong> {complaint.ticketId}</Typography>
                <Typography variant="body1"><strong>Name:</strong> {complaint.name}</Typography>
                <Typography variant="body1"><strong>Phone Number:</strong> {complaint.phoneNum}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {complaint.email}</Typography>
                <Typography variant="body1"><strong>Status:</strong> {complaint.status}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Complaint Description:</strong></Typography>
                <Typography variant="body2">{complaint.complaintDescription}</Typography>
                {complaint.status === 'Processing' && (
                  <Button variant="contained" color="primary" onClick={() => handleButtonClick(complaint.ticketId)}>
                    Resolve
                  </Button>
                )}
              </Grid>
            </Grid>
          </Paper>
        ))
      ) : (
        <Typography variant="body1">No complaints assigned.</Typography>
      )}
      {message && (
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Typography variant="body1">{message}</Typography>
        </Paper>
      )}
    </Container>
  );
}

export default AgentComplaintDetails;
