import React ,{useEffect, useState}from 'react'
import {Form,Button} from 'react-bootstrap';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import {  toast } from 'react-toastify';



function RegisterComponent() {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
      if(localStorage.getItem("name")){
        navigate("/spamcheck");
      }
    },[navigate])

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
        const errorsCopy = { ...errors };
        if (!event.target.value) {
          errorsCopy.firstName = 'Please enter your first name';
        } else {
          delete errorsCopy.firstName;
        }
        setErrors(errorsCopy);
      };
    
    
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
    
      const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        const errorsCopy = { ...errors };
        if (event.target.value !== password) {
          errorsCopy.confirmPassword = 'Passwords do not match';
        } else {
          delete errorsCopy.confirmPassword;
        }
        setErrors(errorsCopy);
      };

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const errors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!firstName) {
        errors.firstName = 'Please enter your first name';
      }
      if (!emailRegex.test(email)) {
        errors.email = 'Please enter a valid email address';
      }
      if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
      }
      if (confirmPassword !== password) {
        errors.confirmPassword = 'Passwords do not match';
      }
      setErrors(errors);

      // submit form if no errors
      if (Object.keys(errors).length === 0) {
        await axios.post('http://127.0.0.1:5000/register', {
          name: firstName,
          email:email,
          password:password
        })
        .then(function (response) {
          if(response.data.status === true){
            toast.success(response.data.message)
            navigate("/");
          }else{
            toast.error(response.data.message)
          }
        })
        .catch(function (error) {
          toast.error(error.response.data.messagee)
        });
      }
    };
  return (
    <Form onSubmit={handleSubmit}>

          <Form.Group controlId="formBasicEmail" className='section'>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your firstName"
              value={firstName}
              onChange={handleFirstNameChange}
              onBlur={handleFirstNameChange}
            />
            {errors.firstName && <Form.Text style={{ color: 'red' }}>{errors.firstName}</Form.Text>}
          </Form.Group>


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

          <Form.Group controlId="formBasicPassword" className='section'>
            <Form.Label>ConfirmPassword:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={handleConfirmPasswordChange}
            />
            {errors.confirmPassword && <Form.Text style={{ color: 'red' }}>{errors.confirmPassword}</Form.Text>}
          </Form.Group>

          <Button variant="primary" type="submit" className='w-100' block>
            Register
          </Button>
        </Form>
  )
}

export default RegisterComponent