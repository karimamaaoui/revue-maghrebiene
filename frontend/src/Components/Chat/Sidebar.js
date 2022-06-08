import React, { useContext, useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "./AppContext";
import { addNotifications, resetNotifications } from "./userSlice";
import "./Sidebar.css";
import axios from "axios";

function Sidebar() {
    const user = useSelector((state) => state.user);
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();
    const { socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom } = useContext(AppContext);

    function joinRoom(room, isPublic = true) {
        if (!userInfo) {
            return alert("Please login");
        }
        socket.emit("join-room", room, currentRoom);
        setCurrentRoom(room);

        if (isPublic) {
            setPrivateMemberMsg(null);
        }
        // dispatch for notifications
        dispatch(resetNotifications(room));
    }

    socket.off("notifications").on("notifications", (room) => {
        if (currentRoom != room) dispatch(addNotifications(room));
    });

    useEffect(() => {
        if (userInfo) {
            setCurrentRoom("general");
            getRooms();
            socket.emit("join-room", "general");
            socket.emit("new-user");
        }
    }, []);

    socket.off("new-user").on("new-user", (payload) => {
        setMembers(payload);
    });

    function getRooms() {
        axios.get("http://localhost:5000/rooms")
            .then((res) => res.json())
            .then((data) => setRooms(data));
    }

    function orderIds(id1, id2) {
        if (id1 > id2) {
            return id1 + "-" + id2;
        } else {
            return id2 + "-" + id1;
        }
    }

    function handlePrivateMemberMsg(member) {
        setPrivateMemberMsg(member);
        const roomId = orderIds(userInfo.user._id, member._id);
        joinRoom(roomId, false);
    }

    if (!userInfo) {
        return <></>;
    }
    return (
        <>
            <h2>Available rooms</h2>
            <ListGroup>
                {rooms.map((room, idx) => (
                    <ListGroup.Item key={idx} onClick={() => joinRoom(room)} active={room == currentRoom} style={{ cursor: "pointer", display: "flex",
                     justifyContent: "space-between" }}>
                        {room} {currentRoom !== room && <span className="badge rounded-pill bg-primary">{userInfo.user.newMessages[room]}</span>}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <h2>Members</h2>
            {members.map((member) => (
                <ListGroup.Item key={member.id} style={{ cursor: "pointer" ,}} active={privateMemberMsg?._id == member?._id} onClick={() => 
                handlePrivateMemberMsg(member)} disabled={member._id === userInfo.user._id}>
                    <Row>
                        <Col xs={2} className="member-status" >
                            <img src={member.picture} className="member-status-img" />
                            {member.status == "online" ? <i className="fa fa-circle sidebar-online-status"></i> : <i className="fa fa-circle sidebar-offline-status"></i>}
                        </Col>
                        <Col xs={9}  >
                            {member.username}
                            {member._id === userInfo.user?._id && " (You)"}
                            {member.status == "offline" && " (Offline)"}
                        </Col>
                        <Col xs={1}>
                            {/* <span className="badge rounded-pill bg-primary">{userInfo.newMessages[orderIds(member._id, userInfo._id)]}</span> */}
                        </Col>
                    </Row>
                </ListGroup.Item>
            ))}
        </>
    );
}

export default Sidebar;
