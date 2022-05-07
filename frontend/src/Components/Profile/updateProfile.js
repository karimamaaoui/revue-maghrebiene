import React, { useEffect, useState } from 'react'
import SidebarScreen from '../sideBar/sidebarScreen'
import './updateProfile.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { update, updateProfile, updateProfilePicture, userupdatePicture } from '../../redux/Actions/actions';
import Loading from '../Authentification/Loading';
import ErrorMessage from '../Authentification/ErrorMessage';

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

    const postDetails = (pics) => {
        setProfilePicMessage(null);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "notezipper");
            data.append("cloud_name", "piyushproj");
            fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setProfilePic(data.url.toString());
                    console.log(profilePic);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            return setProfilePicMessage("Please Select an Image");
        }
    };
    useEffect(() => {
        if (!userInfo) {

            history("/");
        } else {
            setUsername(userInfo.user.username);
            setFirstname(userInfo.user.firstname);
            setLastname(userInfo.user.lastname);
            setProfilePic(userInfo.user.profilePic);
            setUniversity(userInfo.user.university);
            setEmail(userInfo.user.email);
            setPlaceOfPractice(userInfo.user.placeofpractice);
            setPassword(userInfo.user.password);

        }
        console.log("userinfo", userInfo)

    }, [history, userInfo]);

    const token = userInfo.token;
    console.log('token', token)
   
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProfile({ username, firstname, lastname, university, placeofpractice }, token));
        history("/profile")
    };

    const addPictureHandler = (e) => {
        e.preventDefault();
        const token = userInfo.token;
        dispatch(userupdatePicture({ profilePic }, token));
        history("/profile")
    };

    return (
        <div>

            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />

            <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
                <div className="main-body">
                    <div className="row gutters-sm">
                        <SidebarScreen />
                        <div className="col-md-8" style={{ marginTop: '50px' }}>

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
                                    <div className="form-group avatar">
                                        <figure className="figure col-md-2">
                                            <img className="img-rounded img-responsive"
                                                src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                        </figure>
                                        
                                        <div class="col-sm-12 text-secondary">

                                            <input type="file" className="file-uploader "
                                                onChange={(e) => postDetails(e.target.files[0])}
                                            />
                                            <button type="submit" className="btn btn-primary" onClick={addPictureHandler}>Upload</button>
                                        </div>
                                    </div>
                                  
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
                                        <div class="row mb-3">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Password</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                <input type="password" className="form-control"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-3"></div>
                                            <div class="col-sm-9 text-secondary">
                                                <input className="btn btn-primary" type="submit" value="Update Profile" />
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
    )
}
