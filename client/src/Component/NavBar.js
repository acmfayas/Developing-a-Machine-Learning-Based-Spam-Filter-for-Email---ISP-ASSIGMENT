import React from 'react'
import {Container,Navbar} from 'react-bootstrap';
import { FiLogOut } from "react-icons/fi";
import {useNavigate} from "react-router-dom"

const NavBar = () => {
const navigate = useNavigate();
const logout =()=>{
    localStorage.clear();
    navigate("/");
}

  return (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">SpamDetector</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end gap-3">
          <Navbar.Text>
            Signed in as: {localStorage.getItem('name')&&localStorage.getItem('name')}
          </Navbar.Text>
          <span onClick={logout} style={{cursor:"pointer"}}> <FiLogOut size={24} color='white' /></span>
        </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavBar