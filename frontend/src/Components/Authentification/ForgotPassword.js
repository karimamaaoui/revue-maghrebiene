import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userForgotPasswordReducer } from '../../redux/reducers/userReducer';
import Loading from './Loading';
import { Forgot } from '../../redux/Actions/actions';
import ErrorMessage from './ErrorMessage';


export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  const { loading, error, userInfo } = userForgotPassword;

  const emailRegex = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
  );

  const history = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');

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

  useEffect(() => {
    if (userInfo) {
      history("/restpassword");
    }
  }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(email,);
    dispatch(Forgot(email))
  }

  return (
    <>
      {loading && <Loading />}
      {error && <ErrorMessage variant="danger">
        Email Incorrect</ErrorMessage>}

      <div className="page-content" style={{ background: '#FEE5CF' }}>
        <div className="form-v5-content col-lg-6">
          <form className="form-detail" onSubmit={submitHandler}>
            <h2 style={{ color: 'black' }}>Forget Password</h2>
            <div className="form-row">
              <label >Your Email</label>
              <input type="email"
                name="email"
                value={email}
                onChange={validateEmail}
                className="input-text" placeholder="Your Email" required />
              <i className="fas fa-envelope"></i>
            </div>
            <div className="form-row-last">
              <input type="submit" className="register" value="Submit" />
            </div>
          </form>
        </div>
      </div>

    </>
  )
}
