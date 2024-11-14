import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');

        let valid = true;

        if (!email) {
            setEmailError('Email is required.');
            valid = false;
        }

        if (!password) {
            setPasswordError('Password is required.');
            valid = false;
        }

        if (valid) {
            console.log('Login successful with:', { email, password });
            navigate('/chatbot');
        }
    };

    return (
        <div className="auth-container"> {/* Apply auth-container class here */}
            <div className="form-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <label>Email</label>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <p className="error-text">{emailError}</p>}
                    </div>
                    <div className="input-box">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <p className="error-text">{passwordError}</p>}
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                </form>
                <Link to="/signup" className="toggle-text">Don't have an account? Sign up here.</Link>
            </div>
        </div>
    );
};

export default Login;
