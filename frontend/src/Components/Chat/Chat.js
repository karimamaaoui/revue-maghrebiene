import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import MessageForm from "./MessageForm";
import SidebarScreen from "../sideBar/sidebarScreen";
import NavbarList from "../adminPanel/views/navbarList";

function Chat() {
    return (
        <div className="main-body" >
        <div className="row gutters-sm" style={{ maxWidth: "100%" }}>
            <SidebarScreen />
            <div className="col-md-8" style={{ marginTop: '50px' }}>
                <div className='container'>
                    <div id="content" className="p-6 p-md-10 pt-12">
                        <NavbarList />
                        <div className="" style={{ backgroundColor: 'white' }}>

                                <div class="card-body">
                                  
                                    <div className="row">
                                        <h1 style={{ color: '#B91736' }}>Make Conversation</h1>
                                    </div>
                                    <br />


        <Container>
            <Row>
                <Col md={4}>
                    <Sidebar />
                </Col>
                <Col md={8}>
                    <MessageForm />
                </Col>
            </Row>
        </Container>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>

    );
}

export default Chat;
