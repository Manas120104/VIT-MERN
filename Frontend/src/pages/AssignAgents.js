import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Grid, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { allAgents, assignAgent, getPendingComplaints } from '../api/apiservices';

function AssignAgentsToComplaints() {
  const [pendingComplaintsData, setPendingComplaintsData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedAgents, setSelectedAgents] = useState({});
  const [agentList, setAgentList] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPendingComplaints = async () => {
      try {
        const response = await getPendingComplaints();
        setPendingComplaintsData(response.status);
      } catch (err) {
        setError('An unexpected error occurred in fetching complaints. Please try again.');
      }
    };

    fetchPendingComplaints();
  }, []);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await allAgents();
        setAgentList(response.agentList);
      } catch (err) {
        setError('An unexpected error occurred in fetching agents. Please try again.');
      }
    };

    fetchAgents();
  }, []);

  const handleAssignAgent = async (ticketId) => {
    const data = {
      agentId: selectedAgents[ticketId],
      ticketId,
    };
    try {
      const response = await assignAgent(data);
      setMessage(response.message);
    } catch (error) {
      setError('An unexpected error occurred in assigning agent.');
    }
  };

  const handleAgentChange = (ticketId, agentId) => {
    setSelectedAgents((prevSelectedAgents) => ({
      ...prevSelectedAgents,
      [ticketId]: agentId,
    }));
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

  if (pendingComplaintsData.length === 0) {
    return (
      <Container sx={{ mt: '5vh', overflowY: 'auto', maxHeight: '80vh' }}>
        <Paper elevation={3} sx={{ p: 3, backgroundColor: '#FFFFFF', borderRadius: 0 }}>
          <Typography variant="h6" sx={{ color: '#000000' }}>No Complaints</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: '5vh', overflowY: 'inherit', maxHeight: '80vh', maxWidth: '100vh' }}>
      <Paper elevation={3} sx={{ p: 3, backgroundColor: '#008ae6', borderRadius: 9 }}>
        <Typography variant="h6" sx={{ color: '#FFFFFF' }}>Assign Agents</Typography>
      </Paper>
      {pendingComplaintsData.map((complaint) => (
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
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Select Agent</InputLabel>
                <Select
                  value={selectedAgents[complaint.ticketId] || ''}
                  onChange={(e) => handleAgentChange(complaint.ticketId, e.target.value)}
                >
                  {agentList.map((agent) => (
                    <MenuItem key={agent._id} value={agent._id}>{agent.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleAssignAgent(complaint.ticketId)}>
                Assign Agent
              </Button>
            </Grid>
          </Grid>
        </Paper>
      ))}
      {message && (
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Typography variant="body1">{message}</Typography>
        </Paper>
      )}
    </Container>
  );
}

export default AssignAgentsToComplaints;
