import React,{useState} from 'react';
import { Card, CardContent, CardHeader, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography'; // Import Typography for text
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import backgroundImage from './assets/RAG.png';
import { Dashboard } from './Dashboard';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Signup } from './Signup';
import { loginAPI } from './APIs/loginAPI';

export function Login() {
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
  });
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [token,setToken]=useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await loginAPI(password,email);

      
      sessionStorage.setItem("token",response.data)
      // Pass the token to the parent component
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
        <CardHeader>
          <Typography variant="h5" component="div">
            Login
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your email below to log in to your account
          </Typography>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                style={{
                   // Adjust padding as needed
                   backgroundColor: 'rgba(233, 216, 212, 0.8)'}} // White background with 80% opacity
                   onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required style={{
                   // Adjust padding as needed
                  backgroundColor: 'rgba(233, 216, 212, 0.8)'}}  onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
                <Link to="/Signup">
            Don&apos;t have an account?{' '}</Link>
            {/* Add link or button for sign-up here if needed */}
          </div>
          
        </CardContent>
        <CardActions>
          {/* Optional: Add actions like buttons here if needed */}
        </CardActions>
      </Card>
    </section>
  );
}
