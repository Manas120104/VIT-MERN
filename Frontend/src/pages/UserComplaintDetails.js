import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';
import { userComplaintDetails } from '../api/apiservices';

const UserComplaintDetails = () => {
  const [complaintsData, setComplaintsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      const userId = sessionStorage.getItem('userId');
      try {
        const response = await userComplaintDetails(userId);
        if (response && Array.isArray(response.status)) {
          setComplaintsData(response.status);
        } else {
          setComplaintsData([]); // Ensure complaintsData is an empty array if no complaints
        }
      } catch (err) {
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  if (complaintsData.length === 0) {
    return (
      <Container sx={{ mt: '5vh', overflowY: 'auto', maxHeight: '100vh' }}>
        <Paper elevation={3} sx={{ p: 3, backgroundColor: '#FFFFFF', borderRadius: 0, width:"120vh", height:'80vh' }}>
          <Typography variant="h6" sx={{ color: '#000000', textAlign:"center"}}>No Complaints</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: '5vh', overflowY: 'inherit', maxHeight: '80vh' }}>
      <Paper elevation={3} sx={{ p: 3, backgroundColor: '#008ae6' }}>
        <Typography variant="h6" sx={{ color: '#FFFFFF' }}>My Complaints</Typography>
      </Paper>
      {complaintsData.map(complaint => (
        <Paper key={complaint._id} elevation={3} sx={{ p: 3, mt: '5vh' }}>
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
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Container>
  );
}

export default UserComplaintDetails;
