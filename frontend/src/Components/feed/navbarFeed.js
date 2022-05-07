import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Dropdown, message, Badge } from "antd";
import socketIOClient from "socket.io-client";
import { io } from "socket.io-client";
import 'antd/dist/antd.css';
const { Header } = Layout;
const ENDPOINT = "http://localhost:5000";
export const socket = io(ENDPOINT);


//export const socket = socketIOClient("http://localhost:3000");

const NavBarFeed  = () => {

  const [feeds, setFeeds] = useState([]);
  const [isNewFeed, setIsNewFeed] = useState(false);
  useEffect(() => {
    socket.emit("initial_data");
    socket.on("get_data", getData);
    socket.on("change_data", changeData);
    return () => {
      socket.off("get_data");
      socket.off("change_data");
    };
  }, []);

  const getData = (feeds) => {
    if (feeds.length && feeds.some((feed) => feed.read === false)) {
      setIsNewFeed(true);
      console.log(feeds)

    } else {
      setIsNewFeed(false);
    }
    setFeeds(feeds);
  };

  const changeData = () => socket.emit("initial_data");

  const handleClick = ({ key }) => {
    message.info(`Clicked on item ${key}`);
  };

  const handleDropdownClick = () => {
    socket.emit("check_all_notifications");
  };
  const menu = (
    <Menu onClick={handleClick}           
    >
      {feeds.length ? (
        feeds.map((feed) => {
          return (
            <Menu.Item key={feed._id}>
                {console.log("length",feeds.length)}
              <p>{feed.title}</p>
            </Menu.Item>
            
          );
        })
      ) : (
        <Menu.Item key="nothing">
          <p>No feeds to show!</p>
        </Menu.Item>
      )}
    </Menu>
  );
  return (
    <>
          <div style={{ position: "absolute",backgroundColor:'blue' }} className="d-flex align-items-center border-0 rounded-circle me-6">
            <Dropdown  
              overlay={menu}
              trigger={["click"]}
              onClick={handleDropdownClick}
            >
              {isNewFeed ? (
                <Badge dot >
                  <a 
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="bi bi-bell" style={{ color: "white" }}></i>
                  </a>
                </Badge>
              ) : (
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="bi bi-bell" style={{ color: "white" }}></i>
                </a>
              )}
            </Dropdown>
          </div>
    </>
  );
};
export default NavBarFeed 