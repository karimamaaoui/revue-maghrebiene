import React, { useEffect, useState } from 'react'
import SidebarScreen from '../sideBar/sidebarScreen'
import './updateProfile.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { update, updateProfile, updateProfilePicture, userupdatePicture } from '../../redux/Actions/actions';
import Loading from '../Authentification/Loading';
import ErrorMessage from '../Authentification/ErrorMessage';
import axios from 'axios';
import NavbarList from '../adminPanel/views/navbarList';

export default function UpdateProfile() {

    const dispatch = useDispatch();

    const history = useNavigate();

    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    const [email, setEmail] = useState("");
    const [profilePic, setProfilePic] = useState();
    const [university, setUniversity] = useState("");

    const [placeofpractice, setPlaceOfPractice] = useState("");
    const [password, setPassword] = useState("");
    const [profilePicMessage, setProfilePicMessage] = useState();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading, error, success } = userUpdate;
    const [authorList, setAuthorList] = useState([]);

    
    const getAuthor = async () => {
      const config = {
          headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
  
          },
      };
  
      return await axios.get(`http://localhost:5000/api/author/get`, config)
          .then((res) => {
                  console.log("author",res.data);
              setAuthorList(res.data)
          }).catch(err => {
              console.log(err)
          })
  
  
  }
    useEffect(() => {
        if (!userInfo) {

            history("/");
        } else {
            setUsername(userInfo.user.username);
            setFirstname(userInfo.user.firstname);
            setLastname(userInfo.user.lastname);
           // setProfilePic(userInfo.user.profilePic);
            setUniversity(userInfo.user.university);
            setEmail(userInfo.user.email);
            setPlaceOfPractice(userInfo.user.placeofpractice);
            setPassword(userInfo.user.password);
            getAuthor();


        }
        console.log("userinfo", userInfo)

    }, [history, userInfo]);

    const token = userInfo.token;
   
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProfile({ username, firstname, lastname, university, placeofpractice }, token));
        history("/profile")
    };

  
    return (
        <React.StrictMode>        

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
         
                            <h3 className="fieldset-title">Personal Info</h3>
                            <div class="card" >
                                {loading && <Loading />}
                                {success && (
                                    <ErrorMessage variant="success">
                                        Updated Successfully
                                    </ErrorMessage>
                                )}
                                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

                                <div class="card-body">
                                    <form onSubmit={submitHandler}>
                                  
                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Username</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={username}
                                                    onChange={(e) => setUsername(e.target.value)} />
                                            </div>
                                        </div>


                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">First Name</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={firstname}
                                                    onChange={(e) => setFirstname(e.target.value)} />
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Last Name</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={lastname}
                                                    onChange={(e) => setLastname(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Email</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="email" className="form-control" value={email}
                                                    onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                        </div>
                                         {userInfo.roleuser==="Author" ? 
                                        <>
                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">placeofpractice</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={placeofpractice}
                                                    onChange={(e) => setPlaceOfPractice(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">University</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={university}
                                                    onChange={(e) => setUniversity(e.target.value)} />
                                            </div>
                                        </div>
                                        </>
                                        :null}

                                        {/* <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Password</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="password" className="form-control"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                        </div> */}
                                        <div class="row">
                                            <div class="col-sm-3"></div>
                                            <div class="col-sm-9 text-secondary">
                                                <input className="btn btn-danger" type="submit" value="Update Profile" />
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
              </React.StrictMode>        

    )
}
