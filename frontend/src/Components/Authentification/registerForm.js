import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import NavbarsPage from '../LandingPage/Navbars/NavbarsPage';
import './login.css'
import { validEmail, validPassword, validUsername } from './regex.js';
import axios from 'axios'
import { register } from '../../redux/Actions/actions';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';


export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const emailRegex = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
  );

  const [isValid, setIsValid] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageUsername, setMessageUsername] = useState('');
  const [messagePassword, setMessagePassword] = useState('');

//  console.log("state",userRegister)

  const dispatch = useDispatch();
  const history= useNavigate();
  
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
 
  useEffect(() => {
    if (userInfo) {
      history("/login");
  //    console.log("user info from register",userInfo)
    }
  }, [history, userInfo]);

  
  
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(username, password,email);
    dispatch(register(username,email,password))
  }
  const validateEmail = (event) => {
    setEmail(event.target.value);
    if (emailRegex.test(event.target.value)) {
      setIsValid(true);
      setMessage('Your email looks good!');
    } else {
      setIsValid(false);
      setMessage('Please enter a valid email!');
    }
  };

  const validateUsername = (event) => {
    setUsername(event.target.value);
    if (event.target.value.length >= 3) {
      setIsValidUsername(true);
      setMessageUsername('Your username looks good!');

    }
    else {
      setIsValidUsername(false);
      setMessageUsername('Please enter a valid username!');
    }
  };
  const validatePassword = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length >= 4) {
      setIsValidPassword(true);
      setMessagePassword('Your password looks good!');

    }
    else {
      setIsValidPassword(false);
      setMessagePassword('Please enter a valid password!');
    }
  };


  return (
    <>
         {loading && <Loading />}
        {error && <ErrorMessage variant="danger">
          Username Or Email Already exists</ErrorMessage>}
     
      <div className='main' style={{height: "730px",backgroundColor:'#FEE5CF'}} >

<div className='container mx-auto' style={{ marginTop: '-18px' }} >
    <div className='sub-container ' style={{ marginTop: '40px',borderRadius:'15px', marginBottom: '32px',height:'670px' }}>


        <div className='login-formm'>
          
      <form onSubmit={submitHandler} >
        <h1 style={{ color: 'black' }}> Register</h1>
        <div >
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            style={{
              height: '20%',
              width: "30%", borderRadius: "10px"
            }}
          /> </div>
        <div className="form-group">

          <label className="labelsign">Username</label>
          <input
            required
            type="text"
            name="username"
            value={username}
            onChange={validateUsername}
          />
        </div>
        <div className={`message ${isValidUsername ? 'success' : 'error'}`}>
          {messageUsername}
        </div>
        <div >
          <label className="labelsign">Email</label>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={validateEmail}
          />
                   <div className={`message ${isValid ? 'success' : 'error'}`}>
                          {message}
                        </div>
            
        </div>
    
        <div >
          <label className="labelsign">Password</label>
          <input
            required
            type="password"
            name="password"
            value={password}
            onChange={validatePassword}
          />
          <div className={`message ${isValidPassword ? 'success' : 'error'}`}>
            {messagePassword}
          </div>

        </div>

      <div className="d-grid mt-3">
          <button type="submit" value="submit"  >submit</button>
        </div>
      </form></div>
           <div className="form-img" marginRight="500px" >
            
            <p className="banner-img"   >
                Already have an account ?
            </p>
            <Link to="/login">
                <p className="img-btn">
                    <span className="m-up"  >
                        Login
                    </span>
                </p></Link>       </div>

    </div>
</div></div>

    </>
  )
}
