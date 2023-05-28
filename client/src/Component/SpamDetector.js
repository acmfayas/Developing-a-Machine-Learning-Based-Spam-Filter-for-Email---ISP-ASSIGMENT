import React, { useState,useEffect } from 'react'
import axios from "axios"
import { Button, Form,Alert } from 'react-bootstrap';
import {useNavigate} from "react-router-dom"
import NavBar from './NavBar';
import "./spam.css"
import Loader from './Loader';
import {  toast } from 'react-toastify';

const SpamDetector = () => {
  const [firstName, setFirstName] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isload, setisload] = useState(false)
  const[result,SetResults] = useState("")
  const[status,setStatus] = useState(null)


  useEffect(()=>{
    if(!localStorage.getItem("name")){
      navigate("/");
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

  const loadData = async ()=>{

    const errors = {};
    if (!firstName) {
      errors.firstName = 'Please enter your first name';
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setisload(true)
      await axios.post('http://127.0.0.1:5000/api/data', {
        msg: firstName,
      })
      .then(function (response) {
        setisload(false)
        if(response){
          const speech = new SpeechSynthesisUtterance(response.data.result);
          if(response.data.status === true){
            SetResults(response.data.result);
            setStatus(true);
            
          }else{
            SetResults(response.data.result);
            setStatus(false);
          }
          window.speechSynthesis.speak(speech);
          setFirstName('')

        }else{
          toast.error(response.data.message)
        }
      })
      .catch(function (error) {
        toast.error(error.response.data.messagee)
      });
    }else{
      toast.error("Please enter your text field")
      const speech = new SpeechSynthesisUtterance("Please enter your text field'");
      window.speechSynthesis.speak(speech);
    }
   
  }

  return (
    <div>
      <NavBar />
      <div className='spamchecker-body'>
      
        <div className='content'>
        <h1 className='text-center'>Spam Checker</h1>
          <Form.Group controlId="formBasicEmail" className='section'>
              <Form.Control
                type="text"
                placeholder="Enter your text"
                value={firstName}
                onChange={handleFirstNameChange}
                onBlur={handleFirstNameChange}
                style={{width:"400px"}}
                size='lg'
              />
            </Form.Group>
            <Button variant='primary'  size='lg' style={{width:"400px"}} onClick={loadData}>Check</Button>
          {
            result && <Alert show={true}  onClick={()=>SetResults("")} variant={`${status === true?"success" :"danger"}` } dismissible>
              <Alert.Heading>{result}</Alert.Heading>
          </Alert>
          }  
        </div>
      </div>
     {isload?<Loader />:""} 
    </div>
  )
}

export default SpamDetector