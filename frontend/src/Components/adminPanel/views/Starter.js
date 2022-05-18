import { Col, Row } from "reactstrap";
import SalesChart from "../dashboard/SalesChart";
import Feeds from "../dashboard/Feeds";
import ProjectTables from "../dashboard/ProjectTable";
import TopCards from "../dashboard/TopCards";
import Blog from "../dashboard/Blog";
import bg1 from "../../../assets/bg1.jpg";
import bg2 from "../../../assets/bg2.jpg";
import bg3 from "../../../assets/bg3.jpg";
import bg4 from "../../../assets/bg4.jpg";

import './container.css'
import SidebarScreen from "../../sideBar/sidebarScreen";
import { Container, Nav, Navbar } from "react-bootstrap";
import Header from "../layouts/Header";
import ManageUser from "../manageUsers/manageUser";
import { Link } from "react-router-dom";
import ManageArticle from "../manageArticle/manageArticle";
import NavbarList from "./navbarList";
const BlogData = [
  {
    image: bg1,
    title: "This is simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Lets be simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];

const Starter = () => {
  return (
    <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
      <div className="main-body">
        <div className="row gutters-sm">
          <NavbarList/>
    
          {/***Sales & Feed***/}
          <Row>
            <Col sm="6" lg="6" xl="7" xxl="8">
              <SalesChart />
            </Col>
            <Col sm="6" lg="6" xl="5" xxl="4">
              <Feeds />
            </Col>
          </Row>
          {/***Table ***/}
          {/***Blog Cards
          <Row>
            {BlogData.map((blg, index) => (
              <Col sm="6" lg="6" xl="3" key={index}>
                <Blog
                  image={blg.image}
                  title={blg.title}
                  subtitle={blg.subtitle}
                  text={blg.description}
                  color={blg.btnbg}
                />
              </Col>
            ))}
          </Row>***/}
        </div>
      </div>
    </div>
  );
};

export default Starter;
