import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Avatar, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import { Email, Phone } from '@mui/icons-material';
import { getUserProfile } from '../api/apiservices';

function UserProfile() {
  const [name, setName] = useState('');
  const [firstLetter, setFirstLetter] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    console.log(userId);
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile( userId );
        setName(response.name);
        setEmail(response.emailId);
        setPhoneNum(response.phno);
        if(response.role==='user'){
          setRole('User');
        }
        else if(response.role==='agent'){
          setRole('Agent');
        }
        setFirstLetter(name[0]);
      } catch (error) {
        setError("An unexpected error occurred, please try again!");
      }
    };
    fetchProfile();
  }, []);

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
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          background: 'linear-gradient(135deg, #e0f7fa, #ffffff)',
          borderRadius: '15px',
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)' // Adding subtle shadow for depth
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Avatar
            sx={{
              width: 160, // Increased avatar size
              height: 160, // Increased avatar size
              bgcolor: '#3f51b5',
              fontSize: '3.5rem', // Increased font size for avatar text
              margin: '0 auto'
            }}
          >
           {firstLetter}
          </Avatar>
          <Typography
            variant="h4"
            sx={{
              mt: 2,
              fontWeight: 'bold',
              color: '#3f51b5'
            }}
          >
            {name}
          </Typography>
        </Box>

        <List sx={{ textAlign: 'left' }}>
          <ListItem>
            <Phone sx={{ mr: 2, color: '#3f51b5' }} />
            <ListItemText
              primary="Phone Number"
              secondary={phoneNum} // Using state variable
              primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.3rem' }} // Increased font size
              secondaryTypographyProps={{ fontSize: '1.2rem' }} // Increased font size
            />
          </ListItem>
          <Divider />
          <ListItem>
            <Email sx={{ mr: 2, color: '#3f51b5' }} />
            <ListItemText
              primary="Email"
              secondary={email} // Using state variable
              primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.3rem' }} // Increased font size
              secondaryTypographyProps={{ fontSize: '1.2rem' }} // Increased font size
            />
          </ListItem>
          <Divider />
          <ListItem>
            <Email sx={{ mr: 2, color: '#3f51b5' }} />
            <ListItemText
              primary="Role"
              secondary={role} // Using state variable
              primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.3rem' }} // Increased font size
              secondaryTypographyProps={{ fontSize: '1.2rem' }} // Increased font size
            />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
}

export default UserProfile;
