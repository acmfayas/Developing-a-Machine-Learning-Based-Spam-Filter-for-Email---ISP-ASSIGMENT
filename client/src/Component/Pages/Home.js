import React, { useState } from 'react'
import { Col} from 'react-bootstrap';
import "./login.css"
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import logo from  "../../img/logo.png"



const Home = () => {
    const [type, settype] = useState("login")
  return (
    <div className='login-page'>
        <Col className='left-side d-flex flex-column text-primary' xs={6} >
            <div className='content'>
                <h3 className='display-5 pt-3'> Spam Detactor for Email </h3>
            </div>
            <div className='f-content'>
                <span> Created By FAYAS ACM </span>
                <span> BSc (Hons) in Information Technology Specialising in Cyber Security </span>
                <span> SLIIT Malabe Campus, New Kandy Road, Malabe. </span>
            </div>
        </Col>
        <Col className={`right-side ${type === "login"?'pt-5':'pt-5'} `} xs={6}>
            <img className='img' src={logo} alt='logo' width={200} height={150} />
            <div className='content mt-5'>
                <div className='login mt-5'>
                    <h1 className="text-center pb-3">{type === "login" ?  'Sign In' : 'Sign Up'}</h1>
                     {type === "login" ?
                     <>
                     <LoginComponent /> 
                     <div className="text-center mt-2 d-flex gap-1">
                        <p className="text-secondary">Don't have an account?</p>
                        <span  style={{cursor:"pointer"}} onClick={()=>settype("register")}> Register here</span>
                    </div>
                     </>  
                     :
                     <>
                     <RegisterComponent />
                     <div className="text-center mt-2 d-flex gap-1">
                        <p className="text-secondary">Already have an account?</p>
                        <span style={{cursor:"pointer"}} onClick={()=>settype("login")}> login</span>
                    </div>
                     </> 
                      }
                </div>
            </div>
        </Col>
    </div>
  )
}

export default Home