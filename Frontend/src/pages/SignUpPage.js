import React, { useState } from 'react';
import './SignUpPage.css';
import { signUp } from '../api/apiservices'; 
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState(''); // Default role
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    };

    const validateMobileNumber = (mobileNumber) => {
        const mobileNumberRegex = /^[0-9]{10}$/;
        return mobileNumberRegex.test(mobileNumber);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name || !email || !username || !password || !confirmPassword || !mobileNumber || !address || !role) {
            setError('All fields are mandatory.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Invalid email format.');
            return;
        }

        if (!validatePassword(password)) {
            setError('Not a strong password. Password must be at least 8 characters long and contain both letters and numbers.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (!validateMobileNumber(mobileNumber)) {
            setError('Invalid mobile number. It should be a 10-digit number.');
            return;
        }

        const userData = {
            name,
            email,
            username,
            password,
            mobileNumber,
            address,
            role
        };

        try {
            const response = await signUp(userData);

            if (response.message) {
                alert(response.message); // Show success message
                navigate('/Sign-in');
            } else if (response.error) {
                setError(response.error); // Set error state
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
        }
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    return (
        <div className="sign-up-page">
            <div className="sign-up-container">
                <h1>Sign Up to Register</h1>
                {error && <div className="error-message">{error}</div>}
                <form id="signUpForm" onSubmit={handleSubmit} method="POST">
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="mobile-number">Mobile Number</label>
                        <input
                            type="text"
                            id="mobile-number"
                            name="mobile-number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="role">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={role}
                            onChange={handleRoleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="user">User</option>
                            <option value="agent">Agent</option>
                        </select>
                    </div>
                    <button id="generate-otp-btn" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
