import React ,{useState}from 'react';
import {GiHamburgerMenu} from 'react-icons/gi';
import {MdOutlineRestaurantMenu} from 'react-icons/md';

import './Navbar.css';
import images from '../../../../assets/revuemagh.png';


const Navbar = () =>{
  const [toggle, setToggle] = useState(false);

  return(
  <nav className='app__navbar' >
      <div className="app__navbar-logo">
        <img src={images} alt="app logo" />
      </div>
      <ul className="app__navbar-links">
        <li className="p__opensans"><a href='#home' style={{color:'#D68082'}}>Home</a>
        </li>
        <li className="p__opensans"><a href='#about'  style={{color:'#D68082'}}>About</a>
        </li>
        <li className="p__opensans"><a href='#service' style={{color:'#D68082'}}>Service</a>
        </li>
        <li className="p__opensans"><a href='#contact' style={{color:'#D68082'}}>Contact</a>
        </li>
        <li>
       <a href="/login" className="p__opensans"  style={{color:'#D68082'}}>Log In / Register</a>
        </li>
    
      </ul>
    
           <div className="app__navbar-smallscreen">
          <GiHamburgerMenu color="#fff" fontSize={27} onClick={()=>{ setToggle(true)}}/>
            {toggle && (   
          <div className="app__navbar-smallscreen-overlay flex__center slide-bottom">
          <MdOutlineRestaurantMenu fontSize={27} className="overlay__close" onClick={()=>{setToggle(false)}}/>
          <ul className="app__navbar-smallscreen-links">
            <li className="p__opensans"><a href='#home' style={{color:'#D68082'}}>Home</a>
            </li>
            <li className="p__opensans"><a href='#about' style={{color:'#D68082'}}>About</a>
            </li>
            <li className="p__opensans"><a href='#service' style={{color:'#D68082'}}>Service</a>
            </li>
            <li className="p__opensans"><a href='#contact' style={{color:'#D68082'}}>Contact</a>
            </li>
            <li className="p__opensans"><a href='/login' style={{color:'#D68082'}}>Log In / Register</a>
            </li>
         
        </ul>
          </div>
        )}
      </div>


  </nav>
  
  )};

export default Navbar;
