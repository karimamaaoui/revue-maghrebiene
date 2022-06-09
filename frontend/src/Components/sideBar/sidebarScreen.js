import React from "react";
import { Button, Nav, NavItem } from "react-bootstrap";
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../redux/Actions/actions";
import './sidebarScreen.css';
import { RiUserLine } from "react-icons/ri"
import { useEffect } from "react/cjs/react.production.min";
/***
 * 
 * .scrollArea {
 width: 275px;
 height: 100px;
 padding-left: 5px;
 padding-right: 5px;
 border-color: #6699CC;
 border-width: 1px;
 border-style: solid;
 float: left;
 overflow: auto;
}
 */

export default function SidebarScreen() {

  const dispatch = useDispatch();
  const history = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    history("/");
  }


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>

     
      <nav id="sidebar" >

        <div className="p-6 pt-5 " style={{ backgroundColor: '#FEE5CF', position: "sticky", height: "100%" }}>
          <ul class="">
            <h2 >
              Menu
            </h2>

          
            {userInfo.roleuser === "Reader" ?
              <>

                <li className="list-unstyled components mb-2">
                  <a href="/users" className="inline-block">
                    <i className="bi bi-book"></i>
                    {' '}
                    Users List</a>
                </li>

                <li className="list-unstyled components mb-2">
                  <a href="/managearticles" className="inline-block">
                    <i className="bi bi-book"></i>
                    {' '}
                    Articles List</a>
                </li>
                <li className="list-unstyled components mb-2">
                  <a href="/accept" className="inline-block">
                    <i className="bi bi-book"></i>
                    {' '}
                    Demand To be Author</a>
                </li>
                <li className="list-unstyled components mb-2">
              <a href="/chat" className="inline-block ">
                <i className="bi bi-chat-dots "></i>
                {' '}
                Send Message</a>
            </li>
            <li className="list-unstyled components mb-2">
              <a href="/mostread" className="inline-block">
                <i className="bi bi-book"></i>
                {' '}
                Most Read</a>
            </li>


              </>
              : <></>

            }

        {userInfo.roleuser === "User" ?
              <>
                <li className="list-unstyled components mb-2">
              <a href="/search" className="inline-block ">
                <i className="bi bi-search "></i>
                {' '}
                Search Article</a>
            </li>
            

            <li className="list-unstyled components mb-2">
              <a href="/mostread" className="inline-block">
                <i className="bi bi-book"></i>
                {' '}
                Most Read</a>
            </li>

            <li className="list-unstyled components mb-2">
              <a href="/favorite" className="inline-block ">
                <i className="bi bi-star"></i>
                {' '}
                Favorite List </a>
            </li>

            <li className="list-unstyled components mb-2">
              <a href="/chat" className="inline-block ">
                <i className="bi bi-chat-dots "></i>
                {' '}
                Send Message</a>
            </li>
          
            <li className="list-unstyled components mb-2">
              <a href="/feedback" className="inline-block ">
                <i className="bi bi-card-text"></i>
                {' '}
                Add Feedback</a>
            </li>

          

                <li className="list-unstyled components mb-2">
                  <a href="/demand" className="inline-block">
                    <i className="bi bi-book"></i>
                    {' '}
                    Want to be Author </a>
                </li>

  
              </>
              : <></>

            }

            {userInfo.roleuser === "Author" ?
              <>

                <li className="list-unstyled components mb-2">
                  <a href="/article" className="inline-block">
                    <i className="bi bi-book"></i>
                    {' '}
                    Add Article </a>
                </li>


              </>
              : <></>
            }

          </ul>



          {/* <div className="list-unstyled components mb-2">



            <NavItem  className="sidenav-bg">
              <Link
                to="/profile"
                 >
                <i className="bi bi-book"></i>
                <span className="ms-3 d-inline-block">Search Article</span>
              </Link>
            </NavItem>
        
            <NavItem  className="sidenav-bg">
              <Link
                to="/profile"
                 >
                <i className="bi bi-book"></i>
                <span className="ms-3 d-inline-block">Add Article</span>
              </Link>
            </NavItem>
            <NavItem  className="sidenav-bg">
              <Link
                to="/profile"
                 >
                <i className="bi bi-book"></i>
                <span className="ms-3 d-inline-block">sdsds Article</span>
              </Link>
            </NavItem>
            <NavItem  className="sidenav-bg">
              <Link
                to="/profile"
                 >
                <i className="bi bi-book"></i>
                <span className="ms-3 d-inline-block">Seaddddddrch Article</span>
              </Link>
            </NavItem>
        
        
   </div> */}

        </div>
      </nav>
    </>

  )
}


