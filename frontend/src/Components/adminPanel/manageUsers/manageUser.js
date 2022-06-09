import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUserPaginate, getAllUsers } from '../../../redux/Actions/actions';
import React, { useState, useEffect } from 'react'
import { userDeleteReducer } from "../../../redux/reducers/userReducer";
import { Button, Col, Row } from "react-bootstrap";
import { io } from "socket.io-client";
import SidebarScreen from "../../sideBar/sidebarScreen";
import NavbarList from "../views/navbarList";

import Accepter from '../../../assets/accepter.png'
import Refuser from '../../../assets/refuser.png'
import { getArticleByFilter } from "../../../redux/Actions/articleActions";
import ReactPaginate from "react-paginate";

const ENDPOINT = "http://localhost:5000";
var socket;


export default function ManageUser() {

  const dispatch = useDispatch();
  const history = useNavigate();

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


  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };
  const [searchResult, setSearchResult] = useState(users);

  const [searchInput, setSearchInput] = useState('');

  const filterContent = (articleFilter, searchTerm) => {
    if (searchTerm !== '') {

      const result = users.filter((user) => {
        return (user.username.toLowerCase().startsWith(searchTerm) ||
          user.firstname.toLowerCase().startsWith(searchTerm) ||
          user.lastname.toLowerCase().startsWith(searchTerm) ||
          user.email.toLowerCase().startsWith(searchTerm) ||
          user.isVerified.toLowerCase().startsWith(searchTerm) ||
          user.isApproved.toLowerCase().startsWith(searchTerm) ||
          user.roles.toLowerCase().startsWith(searchTerm)
        );
      }
      );
      setSearchResult(result);
    }
    else {
      setSearchResult(users);
    }
    console.log("searchResult", searchResult)
  }

  const handleSearch = async (e) => {

    const searchTerm = e.currentTarget.value;
    setSearchInput(searchTerm)

    //dispatch(getArticleByFilter(userFilter,searchTerm));

    //filterContent(userFilter, searchTerm)

  }

  const handlePageClick = (data) => {

    console.log("efefef", data.selected);
    let currentPage = data.selected + 1;
    dispatch(getAllUserPaginate(currentPage));
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", currentPage);

  }

  return (
    <>

      {!userInfo ? history('/') :
        userInfo.roleuser === "Reader" ?
          <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
            <div className="main-body">
              <div className="row gutters-sm">
                <SidebarScreen />
                <div className="col-md-9" style={{ marginTop: '50px' }}>
                  <div className='container'>


                    <div id="content" className="p-6 p-md-10 pt-12">

                      <NavbarList />

                      <Row>
                        <Col lg="12">

                          <Card id="usersList">

                            <CardBody>
                              <CardTitle tag="h5">Users List</CardTitle>
                              <Col lg="32" >
                        <button className="btn btn-danger" onClick={()=>{history('/addnewuser')}}>Add new user</button>
                        </Col>
                    

                              <Table className="no-wrap mt-3 align-middle" responsive borderless>
                                <thead>
                                  <tr>
                                    <th>username</th>
                                    <th>email</th>
                                    <th>firstname</th>
                                    <th>lastname</th>
                                    <th>isVerified</th>
                                    <th>Roles</th>
                                    <th>isApproved</th>
                                    <th>Action</th>


                                  </tr>
                                </thead>
                                <tbody>
                                  {users?.map((tdata, index) => (
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
                                        {tdata.lastname}
                                      </td>
                                      <td>
                                        {tdata.isVerified === true ?
                                          <div style={{ display: "inline-flex" }}>
                                            <img src={Accepter}
                                              style={{ height: '20px' }} />
                                          </div>
                                          : <div style={{ display: "inline-flex" }}>
                                            <img src={Refuser}
                                              style={{ height: '20px' }} />
                                          </div>}
                                      </td>

                                      {tdata.roles.map((rol) => {
                                        return (
                                          <td>
                                            {console.log('rol', rol.name)}
                                            {rol.name}

                                          </td>)
                                      })}
                                      <td>
                                        {tdata.isApproved === true ?

                                          <div style={{ display: "inline-flex" }}>
                                            <img src={Accepter}

                                              style={{ height: '20px' }} />
                                          </div>


                                          : <div style={{ display: "inline-flex" }}>
                                            <img src={Refuser}

                                              style={{ height: '20px' }} />
                                          </div>}
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
                                <div className="col-sm-12"  >

                                  <ReactPaginate
                                    previousLabel={'previous'}
                                    nextLabel={"next"}
                                    breakLabel={'...'}
                                    pageCount={25}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={3}
                                    onPageChange={handlePageClick}
                                    containerClassName={'pagination justofy-content-center'}
                                    pageClassName={'page-item'}
                                    pageLinkClassName={'page-link'}
                                    previousClassName={'page-item'}
                                    previousLinkClassName={'page-link'}
                                    nextClassName={'page-item'}
                                    nextLinkClassName={'page-link'}
                                    breakClassName={'page-item'}
                                    breakLinkClassName={'page-link'}
                                    activeClassName={'active '}

                                  />
                                </div>
                              </div>

                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : "Not Authorized"
      }

    </>

  )
}
