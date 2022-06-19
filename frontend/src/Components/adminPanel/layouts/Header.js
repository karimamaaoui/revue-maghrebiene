import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
  Label,
} from "reactstrap";

import {AiTwotoneMinusCircle} from 'react-icons/ai'
import {MdMenuOpen} from "react-icons/md"
import user1 from "../../../assets/user1.jpg";
import '../views/container.css'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../redux/Actions/actions";
import NavBarNotif from "../../notification/navbarNotiffy";
import axios from "axios";

const Header = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  
  const logoutHandler = async() => {
   //   dispatch(logout());
   const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,

    },
  };

  console.log("user token", config)

  const { data } = await axios.delete('http://localhost:5000/logout', config);
  console.log("user data", data)

  localStorage.removeItem("userInfo");
 
      history("/");
       }

       
  let location = useLocation();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
        history("/");
    }
}, [
    dispatch,
    history,
    userInfo,
]);


  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
    <Navbar style={{ backgroundColor: "#D68082", marginTop: "-34px" }} dark expand="md">
    <div className="hstack gap-2">
        <Button
          color="danger"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"><AiTwotoneMinusCircle/></i>
          ) : (
            <i className="bi bi-three-dots-vertical"><MdMenuOpen/></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
          </NavItem>
          <NavItem style= {{visibility: userInfo.roleuser==="Corrector"? "visible":"hidden"}}>

          <NavBarNotif />

          </NavItem>
      
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="primary" className="rounded-circle p-1" style={{backgroundColor:'#B00820' ,borderColor:"#B00820"}}>
            <img
              src={user1}
              alt="profile"
              className="rounded-circle" 
              width="30"
              height="32px"
            ></img>
          </DropdownToggle>
          <DropdownMenu >
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem>
              <Label>{userInfo.user.username}</Label>
              <br/>
              <Button style={{ backgroundColor: "transparent", borderColor: "transparent", color: "black" }} >
                <Link to="/profile">
                  My Account
                </Link>

              </Button></DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <Button style={{ backgroundColor: "transparent", borderColor: "transparent", color: "black" }}>
                Inbox </Button>
                </DropdownItem>
            <DropdownItem>
              <Button style={{ backgroundColor: "transparent", borderColor: "transparent", color: "black" }} onClick={logoutHandler}>
                Logout

              </Button>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

      </Collapse>
    </Navbar>
    
    
    </>
  );
};

export default Header;
