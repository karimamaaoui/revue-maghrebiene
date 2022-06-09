import React, { useEffect ,useState} from 'react'
import SidebarScreen from '../sideBar/sidebarScreen'
import './profile.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Link from "react-dom"
import Header from '../adminPanel/layouts/Header';
import axios from 'axios';
import NavbarList from '../adminPanel/views/navbarList';

export default function Profile() {

  const Pf='https://res.cloudinary.com/piyushproj/image/upload/'
  /***
   *              <ul>
        {userInfo.user.roles &&
          userInfo.user.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
         
   */
  const dispatch = useDispatch();
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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

      history("/login");
    }
    else{
      getAuthor();

    }
  }, [history, userInfo]);


  return (
    <>
    
      <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
        <div className="main-body">
          <div className="row gutters-sm">
            <SidebarScreen />

            <div className="col-md-8" style={{ marginTop: '50px' }}>
              <div className="contentArea">
                <NavbarList />
              </div>
              <br />
              <br />
              {userInfo ?
              <div>
              <div className="media col-md-10 col-lg-8 col-xl-7 py-5 mx-auto">
                
                <div className="media-body ml-5">
                  <h4 className="font-weight-bold mb-4">Username : {userInfo.user.username} </h4>

                 
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-body">
                  
                  <div className="row">

                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name  </h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userInfo.user.firstname} {userInfo.user.lastname}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userInfo.user.email}
                    </div>
                  </div>
                  <hr />
                  {userInfo.roleuser==="Author" ?
                  authorList?.map((auth, key) => {
                    return(

                  

                  <div>

                  <div className="row">

                    <div className="col-sm-3">

                      <h6 className="mb-0">University</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {auth.university}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Place Of Practice</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {auth.placeofpractice}
                    </div>
                  </div>
                  </div>   
                  )
                  
                })

                  
                              : null}

                  <hr />
                  <div className="row">

                    <div className="col-sm-12">
                      <button className="btn btn-danger ">
                      <a 
                        href="/editprofile" style={{ color: "white" }}>Edit</a>
                        </button>
                    </div>
                    
                  </div>
                </div>
              </div>    
              </div>
            

            : null}



            </div>

          </div>

        </div>
      </div>

    </>
  )
}
