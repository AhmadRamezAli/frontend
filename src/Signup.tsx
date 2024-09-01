
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardActions } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import backgroundImage from './assets/RAG.png';
import { Login } from './Login';
import { Dashboard } from './Dashboard';
import { Link } from 'react-router-dom';
import { signupAPI } from './APIs/signupAPI';
// Shared constants for repeated Tailwind class strings
const CONTAINER_CLASSES = '  p-4 pt-6 md:p-6 lg:p-12';
const INPUT_CLASSES = 'w-full p-2 pl-10 text-sm text-muted-foreground bg-input border border-border rounded-lg focus:ring-2 focus:ring-ring';
const BUTTON_CLASSES = 'bg-primary text-primary-foreground hover:bg-primary/80 w-full p-2 rounded-lg';

export function Signup  () {
    const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkpassword, setCheckpassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (password !== checkpassword) {
      alert('Passwords do not match');
      return;
    }
    // TO DO: Implement your sign up logic here
    console.log(`Username: ${username}, Password: ${password}`);
    try {
        const response = await signupAPI(password,username);
        
            
              sessionStorage.setItem("token",response.data)
              navigate('/Dashboard');
          
  
  
      } catch (error) {
        setError(error.message); // Set error message if login fails
      }
  
  };

  return (
    <section
      style={{
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      className="flex items-center justify-center"
    >
        <Card
        style={{
          width: '400px', // Adjust width as needed
          padding: '2rem', // Adjust padding as needed
          backgroundColor: 'rgba(240, 128, 128, 0.4)', // White background with 80% opacity
          boxShadow: '0px 4px 8px rgba(220, 215, 214, 0.5)', // Optional: add a subtle shadow for better visibility
        }}
      >
    <div className={CONTAINER_CLASSES}>
      <h2 className="text-2xl font-bold text-primary-foreground mb-4">Sign Up</h2>
  
        <InputField
          label="Username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          label="Confirm Password"
          id="checkpassword"
          type="password"
          value={checkpassword}
          onChange={(e) => setCheckpassword(e.target.value)}
        />
        <button type="submit" className={BUTTON_CLASSES} onClick={handleSubmit}>
          Sign Up
        </button>
    
      <Link to="/login">
      <p className="text-muted-foreground text-sm mt-4">
        
        Already have an account? <a href="#" className="text-secondary-foreground hover:text-secondary-foreground/80">Log In</a>
      </p>
      </Link>
    </div>
    </Card>
    </section>
  );
};

const InputField = ({ label, id, value, onChange, type = 'text' }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-muted-foreground mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={INPUT_CLASSES}
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
    </div>

  );
};
