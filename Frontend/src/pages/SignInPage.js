import React, { useState } from 'react';
import './SignInPage.css';
import { signIn } from '../api/apiservices';
import { useNavigate } from 'react-router-dom';

const SignInPage = ({ handleRoleChange }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
      role,
    };

    try {
      const response = await signIn(userData);
      if (response.message === "Authorized") {
        sessionStorage.setItem('userId', response.id);
        handleRoleChange(response.role);
        navigate("/");
      } else if (response.error) {
        alert("Invalid credentials, try again");
      }
    } catch (error) {
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSignIn}>
        <h2>Sign In</h2>
        <div className="form-group">
          <label htmlFor="email">Username:</label>
          <input
            type="text"
            id="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" id='sel'>Select</option>
            <option value="user">User</option>
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="signin-button">Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;
