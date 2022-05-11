import React from 'react'
import homeLogo from '../../../assets/homeLogo.gif'
import './navbar.css'
import { Dropdown } from 'react-bootstrap';
import HeaderTran from '../../adminPanel/views/ui/TRANSLATE/headerTrans';

export default function NavbarsPage() {
  return (

    <header>

<nav className="navbar navbar-expand-lg py-3 navbar-light bg-light" >
      <div class="container-fluid">

  <a className="navbar-brand" href="#">
      <img src={homeLogo} alt="homeLogo" height="130px" width="400px" style={{marginTop:"-50%"}}/>
      </a>
  {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button> */}
  <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
     
  <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{marginTop:"-5%"}}>
    <ul className="navbar-nav ms-auto">
      <li className="nav-item ">
        <div className='scroll-to-top'>
        <a className="nav-link" href="#home" >Home </a>
        </div>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#services">Services</a>
      </li>
      <li className="nav-item ">
        <a className="nav-link" href="#" >Features </a>
      </li>
    
      <li className="nav-item ">
        <a className="nav-link" href="#aboutus" >About </a>
      </li>
    
      <li className="nav-item ">
        <a className="nav-link" href="#" >Team </a>
      </li>
    
      <li className="nav-item ">
        
      <div className='scroll-to-top'>
        <a className="nav-link" href="#contact" >Contact </a>
      </div>
      </li>
    </ul>

    <Dropdown>
  <Dropdown.Toggle variant="primary ms-lg-3" id="dropdown-basic">
    Join us
  </Dropdown.Toggle>

  <Dropdown.Menu>

    <Dropdown.Item href="/login">Login</Dropdown.Item>
    <Dropdown.Item href="/register">Register</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
    
  </div>    
  </div>

</nav>
    
    </header>    
    )
}
