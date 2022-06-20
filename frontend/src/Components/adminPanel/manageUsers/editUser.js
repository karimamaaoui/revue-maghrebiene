import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register } from '../../../redux/Actions/actions'
import ErrorMessage from '../../Authentification/ErrorMessage'
import Loading from '../../Authentification/Loading'
import SidebarScreen from '../../sideBar/sidebarScreen'
import NavbarList from '../views/navbarList'
export default function AddNewUser() {
    const [username, setUsername] = useState('');
    const [rolesList, setRolesList] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState([]);

    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isValidUsername, setIsValidUsername] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [messageUsername, setMessageUsername] = useState('');
    const [messagePassword, setMessagePassword] = useState('');
    const dispatch = useDispatch();
    const history = useNavigate();

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;
    const emailRegex = new RegExp(
        '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
    );

    const getRole = async () => {
        
        return await axios.get(`http://localhost:5000/roles`)
            .then((res) => {
                    console.log(res.data);
                    setRolesList(res.data)
            }).catch(err => {
                console.log(err)
            })


    }
    
    useEffect(() => {
        if (userInfo) {
            history("/users");
        }
        else{
            getRole()
        }
    }, [history, userInfo]);


    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("user info",username, password, email,role);
        dispatch(register(username, email, password,role))
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
        <div>
            <div>

                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />

                <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
                    <div className="main-body">
                        <div className="row gutters-sm">
                            <SidebarScreen />

                            <div className="col-md-8" style={{ marginTop: '50px' }}>
                                <div className="contentArea">
                                    <NavbarList />
                                </div>
                                <br />

                                <h3 className="fieldset-title">Add New User</h3>
                                <div class="card" >
                                
                                    <div class="card-body">
                                        <form onSubmit={submitHandler}>

                                            <div class="row mb-3">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Username</h6>
                                                </div>


                                                <div class="col-sm-9 text-secondary">
                                                    <input type="text" className="form-control" value={username}
                                                        required
                                                        name="username"
                                                        onChange={validateUsername}
                                                    />
                                                </div>
                                                <div className={`message ${isValidUsername ? 'success' : 'error'}`}>
                                                    {messageUsername}
                                                </div>


                                            </div>


                                            <div class="row mb-3">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Email</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    <input type="email" className="form-control" value={email}
                                                        onChange={validateEmail}
                                                    />
                                                </div>
                                            </div>



                                            <div class="row mb-3">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Password : </h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    <input type="password" className="form-control" value={password}
                                                        onChange={validatePassword}
                                                    />
                                                </div>
                                            </div>


                                            <div class="row mb-3">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Role</h6>
                                                </div>


                                            <div class="col-sm-9 text-secondary">

                                                <select className="select" name="role"
                                                    required
                                                    onChange={(e) => {
                                                        setRole([e.target.value]);
                                                    }} >
                                                    <option value="">role</option>

                                                    { (rolesList && rolesList.length > 0) && rolesList.map((r, key) => {
                                                        return <option key={key} value={r.name}  > {r.name}</option>;
                                                    })}
                                                </select>
                                            </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-sm-3"></div>
                                                <div class="col-sm-9 text-secondary">
                                                    <input className="btn btn-danger" type="submit" value="Add New User" />
                                                </div>
                                            </div>
                                        </form>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
