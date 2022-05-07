import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";


const FeedData = [
  {
    title: "Cras justo odio",
    icon: "bi bi-bell",
    color: "primary",
    date: "6 minute ago",
  },
  {
    title: "New user registered.",
    icon: "bi bi-person",
    color: "info",
    date: "6 minute ago",
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "danger",
    date: "6 minute ago",
  },
  {
    title: "New order received.",
    icon: "bi bi-bag-check",
    color: "success",
    date: "6 minute ago",
  },
  {
    title: "Cras justo odio",
    icon: "bi bi-bell",
    color: "dark",
    date: "6 minute ago",
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "warning",
    date: "6 minute ago",
  },
];

const Feeds = () => {

  const dispatch = useDispatch();
    const history = useNavigate();

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


  const [newArrivals, setNewArrivals] = useState([])
  const getNewArrivals = async () => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,

        },
    };


    return await axios.get(`http://localhost:5000/api/user/getnew`, config)
        .then((res) => {

         //   console.log(res.data);
            const newArrivals=res.data
          setNewArrivals(newArrivals)
          console.log("ssssssssssssssssssssssss",newArrivals)
            
        }).catch(err => {
            console.log(err)
        })

}

  useEffect(() => {

 
    getNewArrivals()


  }, []);
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">NEW ARRIVALS</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
        </CardSubtitle>
        <ListGroup flush className="mt-4">
          {newArrivals.map((feed, index) => (
            <ListGroupItem
              key={index}
              action
              href="/"
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <Button
                className="rounded-circle me-3"
                size="sm"
                color="info"
              >
              </Button>
              {feed.email}
              <small className="ms-auto text-muted text-small">
                {feed.username}
              </small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;