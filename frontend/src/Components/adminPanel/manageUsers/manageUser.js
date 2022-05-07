import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from '../../../redux/Actions/actions';
import React, { useState, useEffect } from 'react'
import { userDeleteReducer } from "../../../redux/reducers/userReducer";
import { Button } from "react-bootstrap";
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
var socket;


export default function ManageUser() {



  const dispatch = useDispatch();
  const history = useNavigate();
  const [noOfElement, setNoOfElement] = useState(1);

  const getAllUser = useSelector((state) => state.getAllUser);
  const { loadingGetAllUser, errorGetAllUser, users } = getAllUser;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  useEffect(() => {
    dispatch(getAllUsers());
    console.log("users", getAllUser)

    if (!userInfo) {
      history("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete
  ]);

  const loadMore = () => {
    setNoOfElement(noOfElement + noOfElement)

  }

  const slice = users?.slice(0, noOfElement)
  console.log("slice", slice)
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>

      {!userInfo ? history('/') :
        userInfo.roleuser === "Reader" ?
          <Card id="usersList">
            <CardBody>
              <CardTitle tag="h5">Users List</CardTitle>

              <Table className="no-wrap mt-3 align-middle" responsive borderless>
                <thead>
                  <tr>
                    <th>username</th>
                    <th>email</th>
                    <th>firstname</th>
                    <th>lastname</th>
                    <th>isVerified</th>
                    <th>University</th>
                    <th>Roles</th>
                    <th>Action</th>
                    <th></th>

                  </tr>
                </thead>
                <tbody>
                  {slice?.map((tdata, index) => (
                    <tr key={index} className="border-top">
                      <td>
                        <div className="d-flex align-items-center p-2">
                          <div className="ms-3">
                            <h6 className="mb-0">{tdata.username}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-muted">{tdata.email}</span>

                      </td>
                      <td>{tdata.firstname}</td>
                      <td>
                        {tdata.isVerified}
                      </td>
                      <td>{tdata.university}</td>

                      <td>{tdata.role}</td>
                      <td>

                      </td>

                      <Button variant="outline-danger" href={`/editarticle/${tdata._id}`}>
                        <i class="bi bi-pencil-square"></i>
                      </Button>

                      <Button variant="outline-warning"
                        className="mx-2"
                        onClick={() => deleteHandler(tdata._id)}>

                        <i class="bi bi-trash3"></i>


                      </Button>


                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="row">
                <div className="col-sm-12">
                  <button className="btn btn-dark " style={{ textAlign: "center" }} onClick={loadMore}  >
                    Load More
                  </button>
                </div>
              </div>
            </CardBody>
          </Card>
          : "Not Authorized"
      }

    </>

  )
}
