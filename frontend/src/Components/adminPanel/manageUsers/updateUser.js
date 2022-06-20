import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import ErrorMessage from '../../Authentification/ErrorMessage'
import Loading from '../../Authentification/Loading'
import SidebarScreen from '../../sideBar/sidebarScreen'

export default function UpdateUser() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [roles, setRoles] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const [roleListe, setRoleListe] = useState({});


    let userId = useParams();

    const dispatch = useDispatch();
    const history = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const getrole = async () => {
        const config = {
            headers: {
                Accept: 'application/json',
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`http://localhost:5000/api/user/getrole`, config);
        console.log('data', data)

        setRoleListe(data);


    };


    useEffect(() => {
        if (!userInfo) {
            history("/");
        }
        else {

            getrole();
        }

    }, [
        dispatch,
        history,

    ]);


    useEffect(() => {
        const fetching = async () => {
            const config = {
                headers: {
                    Accept: 'application/json',
                    'content-type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get(`http://localhost:5000/api/user/getuser/${userId.id}`, config);
            console.log('data', data)

            setUsername(data.username);
            setEmail(data.email);
            setLastname(data.lastname)
            setRoles(data.roles[0]?._id.toString())


        };

        fetching();
    }, [userId]);



    const handleEdit = async (e) => {
        console.log("inside handle submit");
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('roles', roles);

        const config = {
            headers: {
                Accept: 'application/json',
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`,


            }
        }

        return await axios.put(
            `http://localhost:5000/api/user/adminupdate/${userId.id}`, formData, config).then((res) => {

                console.log(res.data);
                history('/manageausers')

                Swal.fire({
                    title: "Succces!",
                    text: "User Updated Successfully",
                    icon: 'success',
                    button: "OK!"
                })
            })

            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <div>

                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />

                <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
                    <div className="main-body">
                        <div className="row gutters-sm">
                            <SidebarScreen />
                            <div className="col-md-8" style={{ marginTop: '50px' }}>

                                <h3 className="fieldset-title">Personal Info</h3>
                                <div class="card" >

                                    <div class="card-body">
                                        <form onSubmit={handleEdit}>

                                            <div class="row mb-3">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Username</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    <input type="text" className="form-control" name="username"
                                                        onChange={(e) => setUsername(e.target.value)} />
                                                </div>
                                            </div>


                                            <div class="row mb-3">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">First Name</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    <input type="text" className="form-control" name="firstname"
                                                        onChange={(e) => setFirstname(e.target.value)} />
                                                </div>
                                            </div>

                                            <div class="row mb-3">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Last Name</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    <input type="text" className="form-control" name='lastname'
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



                                            <select className="select" name="roles"
                                                onChange={(e) => {
                                                    setRoles(e.target.value.toString());
                                                }}

                                            >

                                                {/* {roleListe?.map((role, key) => {
                                                    return (
                                                        <>
                                                            {
                                                                roleListe[0]?._id === role._id ?
                                                                    <>
                                                                        <option key={key} value={role._id} selected>
                                                                            {role.name}</option>

                                                                    </>

                                                                    :

                                                                    <>
                                                                        <option key={key} value={role._id} >
                                                                            {role.name}</option>

                                                                    </>

                                                            }
                                                        </>
                                                    )
                                                })} */}
                                            </select>

                                            <div class="row">
                                                <div class="col-sm-3"></div>
                                                <div class="col-sm-9 text-secondary">
                                                    <input className="btn btn-primary" type="submit" value="Update User" />
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
