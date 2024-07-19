import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import UserNavBar from './components/UserNavBar';
import { Container } from '@mui/material';
import SubmitComplaint from './pages/SubmitComplaint';
import UserComplaintDetails from './pages/UserComplaintDetails';
import UserProfile from './components/UserProfile';
import AdminNavbar from './components/AdminNavbar';
import AdminComplaintDetails from './pages/AdminComplaintDetails';
import Home from './pages/Home';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import AgentNavbar from './components/AgentNavbar';
import AgentComplaintDetails from './pages/AgentComplaintDetails';
import AssignAgentsToComplaints from './pages/AssignAgents';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [userRole, setUserRole] = useState(sessionStorage.getItem('userRole') || null);
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    setUserRole(role);
    if (role) {
      sessionStorage.setItem('userRole', role);
    } else {
      sessionStorage.removeItem('userRole');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userRole');
    setUserRole(null);
    navigate('/Sign-in');
  };

  return (
    <div className="App">
      {!userRole && <NavBar />}
      {userRole === 'user' && <UserNavBar handleLogout={handleLogout} />}
      {userRole === 'agent' && <AgentNavbar handleLogout={handleLogout} />}
      {userRole === 'admin' && <AdminNavbar handleLogout={handleLogout} />}

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submitcomplaint" element={<ProtectedRoute element={SubmitComplaint} allowedRoles={['user']} handleRoleChange={handleRoleChange} />} />
          <Route path="/agentcomplaintdetails" element={<ProtectedRoute element={AgentComplaintDetails} allowedRoles={['agent']} handleRoleChange={handleRoleChange} />} />
          <Route path="/usercomplaintdetails" element={<ProtectedRoute element={UserComplaintDetails} allowedRoles={['user']} handleRoleChange={handleRoleChange} />} />
          <Route path="/userprofile" element={<ProtectedRoute element={UserProfile} allowedRoles={['user','agent']} handleRoleChange={handleRoleChange} />} />
          <Route path="/assignagents" element={<ProtectedRoute element={AssignAgentsToComplaints} allowedRoles={['admin']} handleRoleChange={handleRoleChange} />} />
          <Route path="/admincomplaintdetails" element={<ProtectedRoute element={AdminComplaintDetails} allowedRoles={['admin']} handleRoleChange={handleRoleChange} />} />
          <Route path="/Sign-in" element={<SignInPage handleRoleChange={handleRoleChange} />} />
          <Route path="/Sign-up" element={<SignUpPage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
