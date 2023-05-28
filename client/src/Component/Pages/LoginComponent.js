import React ,{useEffect, useState}from 'react'
import {Form,Button} from 'react-bootstrap';
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {  toast } from 'react-toastify';


const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

      useEffect(()=>{
        if(localStorage.getItem("name")){
          navigate("/spamcheck");
        }
      },[navigate])

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
      const errorsCopy = { ...errors };
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(event.target.value)) {
        errorsCopy.email = 'Please enter a valid email address';
      } else {
        delete errorsCopy.email;
      }
      setErrors(errorsCopy);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
      const errorsCopy = { ...errors };
      if (event.target.value.length < 8) {
        errorsCopy.password = 'Password must be at least 8 characters long';
      } else {
        delete errorsCopy.password;
      }
      setErrors(errorsCopy);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();

      const errors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = 'Please enter a valid email address';
      }
      if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
      }
      setErrors(errors);
  
      if (Object.keys(errors).length === 0) {
        await axios.post('http://127.0.0.1:5000/login', {
          email: email,
          password:password,
        })
        .then(function (response) {
          if(response.data.status === true){
            localStorage.setItem('name', response.data.message.name);
            localStorage.setItem('email', response.data.message.email);
            navigate("/spamcheck");
          }else{
            toast.error(response.data.message)
          }
        })
        .catch(function (error) {
          toast.error(error.data.message)
        });
      }

    };
  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail" className='section'>
        <Form.Label>Email:</Form.Label>
        <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailChange}
        />
        {errors.email && <Form.Text style={{ color: 'red' }}>{errors.email}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className='section'>
        <Form.Label>Password:</Form.Label>
        <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordChange}
        />
        {errors.password && <Form.Text style={{ color: 'red' }}>{errors.password}</Form.Text>}
        </Form.Group>
        <Button variant="primary" type="submit"  className='w-100 mt-2' block>
            Login
        </Button>
    </Form>
  )
}

export default LoginComponent