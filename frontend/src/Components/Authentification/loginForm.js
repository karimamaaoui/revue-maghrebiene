import React, { useEffect, useState } from 'react'
import './login.css'
import first from '../../../src/assets/first.jpg'
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { login } from '../../redux/Actions/actions';
import { useNavigate } from "react-router-dom";
import Loading from '../Authentification/Loading';
import ErrorMessage from '../Authentification/ErrorMessage';

export default function LoginForm() {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    /***  const [loading, setLoading] = useState(false);
      const [error, setError] = useState(false);
   */
    const [isValid, setIsValid] = useState(false);
    const [isValidUsername, setIsValidUsername] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [messageUsername, setMessageUsername] = useState('');
    const [messagePassword, setMessagePassword] = useState('');
  
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

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const history = useNavigate();


  useEffect(() => {
    if (userInfo) {

      //{userInfo.roleuser === "Author" ?
        if (userInfo.roleuser === "Author")
        {
          history("/article");

        }
        else   if (userInfo.roleuser === "Reader")
        {
          history("/adminpanel");

        }
        else if (userInfo.roleuser === "User")
        {
          history("/search");

        }
    
        else if (userInfo.roleuser === "Editor")
        {
          history("/respond");

        }
    
    }
  }, [history, userInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(username, password);
    dispatch(login(username, password))
  }
    return (
        <>
         {loading && <Loading />}
        {error && <ErrorMessage variant="danger">
          Username Or Password Incorrect</ErrorMessage>}
     
            <div className='main' style={{height: "730px",backgroundColor:'#FEE5CF'}}>

                <div className='container mx-auto' style={{ marginTop: '-18px' }} >
                    <div className='sub-container' style={{ marginTop: '40px',borderRadius:'15px', marginBottom: '32px',height:'600px' }}>


                        <div className='login-formm'>
                          
                      <form onSubmit={submitHandler} >
                        <h1 style={{ color: 'black' }}> Login</h1>
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
                        <br />
                        <p style={{ fontSize: '14px' }}>
                          <a href='/forgotpassword' style={{ color: '#D68082'}}>  Forgot Password ?
                          </a>
                        </p>
                      </form></div>
                           <div className="form-img" >
                            
                            <p className="banner-img"    >
                                Don't have an account ?
                            </p>
                            <Link to="/register">
                                <p className="img-btn" >
                                    <span className="m-up"  >
                                        Register
                                    </span>
                                </p></Link>       </div>

                    </div>
                </div></div>
        </>
    );
}
