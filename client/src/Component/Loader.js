import React from 'react'
import loader from "../img/loader.gif"
import { Modal } from 'react-bootstrap'
import "./loader.css"
const Loader = () => {
  return (
    <Modal centered  className='loader' show={true}   backdrop="static">
    <Modal.Body>
      <img src={loader} alt="My GIF"  width={200} height={200}/>
    </Modal.Body>
  </Modal>
  )
}

export default Loader