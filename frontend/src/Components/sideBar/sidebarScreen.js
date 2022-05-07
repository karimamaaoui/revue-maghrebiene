import React from "react";
import { Button, Nav, NavItem } from "react-bootstrap";
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../redux/Actions/actions";
import './sidebarScreen.css';
import {RiUserLine} from "react-icons/ri"
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
    <nav id="sidebar" >

    <div className="p-6 pt-5" style={{backgroundColor:'#CAD8E2',position:"sticky",height:"100%",border:"solid",borderRightColor:"#AAD3E2"}}>
      <h5>Menu</h5>
      
      <div className="list-unstyled components mb-2">

          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon} ></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        
   </div>

    </div>
      </nav>

    )
}
