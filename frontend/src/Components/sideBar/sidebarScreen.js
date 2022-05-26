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

  const navigation = [
    {
      title: "Search Article",
      href: "/search",
      icon: "bi bi-search",
    },
    {
      title: "Recent Article",
      href: "/article",
      icon: "bi bi-newspaper",
    },

    {

      title: "Most Read",
      href: "/adminpanel",
      icon: "bi bi-book",
    },

  ];

  let location = useLocation();

  return (
    <>

      {/* <nav id="sidebar" >

        <div id="wrapper" class="wrapper-content" >
          <div id="sidebar-wrapper" style={{ backgroundColor: '#FEE5CF' }}>
            <ul class="sidebar-nav">
              <h2 style={{ marginTop: '10px' }}>
                Menu
              </h2>

              <li className="list-unstyled components mb-2">
                <a href="/search" className="inline-block ">
                  <i className="bi bi-search "></i>
                  {' '}
                  Search Article</a>
              </li>
              <li className="list-unstyled components mb-2">
                <a href="#" className="inline-block">
                  <i className="bi bi-newspaper "></i>
                  {' '}
                  Recent Article</a>
              </li>

              <li className="list-unstyled components mb-2">
                <a href="#" className="inline-block">
                  <i className="bi bi-book"></i>
                  {' '}
                  Most Read</a>
              </li>
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

                </>
                : <></>

              }


            </ul>
          </div>

        </div>

      </nav> */}

      <nav id="sidebar" >

    <div className="p-6 pt-5 " style={{backgroundColor:'#FEE5CF',position:"sticky",height:"100%"}}>
              <ul class="">
              <h2 >
                Menu
              </h2>

              <li className="list-unstyled components mb-2">
                <a href="/search" className="inline-block ">
                  <i className="bi bi-search "></i>
                  {' '}
                  Search Article</a>
              </li>
              <li className="list-unstyled components mb-2">
                <a href="#" className="inline-block">
                  <i className="bi bi-newspaper "></i>
                  {' '}
                  Recent Article</a>
              </li>

              <li className="list-unstyled components mb-2">
                <a href="#" className="inline-block">
                  <i className="bi bi-book"></i>
                  {' '}
                  Most Read</a>
              </li>
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


