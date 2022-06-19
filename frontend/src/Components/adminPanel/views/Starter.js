import { Col, Row } from "reactstrap";
import ArticlChart from "../dashboard/articleChart";
import Feeds from "../dashboard/Feeds";

import './container.css'
import NavbarList from "./navbarList";

const Starter = () => {
  return (
    <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
      <div className="main-body">
        <div className="row gutters-sm">
          <NavbarList/>
    
          <Row>
            <Col sm="6" lg="6" xl="7" xxl="8">
              <ArticlChart />
            </Col>
            <Col sm="6" lg="6" xl="5" xxl="4">
              <Feeds />
            </Col>
          </Row>
                </div>
      </div>
    </div>
  );
};

export default Starter;
