import React ,{useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Row } from "react-bootstrap";
import { Confirm } from "react-st-modal";
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import ReactPaginate from 'react-paginate'
import SidebarScreen from '../../sideBar/sidebarScreen';
import NavbarList from '../views/navbarList';
import { deleteRule, listRules } from '../../../redux/Actions/rulesActions';
import { deleteType, listTypes } from '../../../redux/Actions/typeAction';

export default function ListType() {

    const dispatch = useDispatch();
    const history = useNavigate();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    const typeList = useSelector((state) => state.typeList);
    const { loadingGetAllUser, errorGetAllUser, types } = typeList;
  
    
  const typeDelete = useSelector((state) => state.typeDelete);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = typeDelete;

  useEffect(() => {
    dispatch(listTypes());

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
    // if (window.confirm("Are you sure?")) {
      dispatch(deleteType(id));
    
  };


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
                      <Row id="articlesList">
                        <Col lg="12">
                          <Card id="articlesList">
                            <CardBody>
                              <CardTitle tag="h5">Types List</CardTitle>
                              <Col lg="32" >
                        <button className="btn btn-danger" onClick={()=>{history('/addtype')}} style={{float:'right'}}>Add new Type</button>
                        </Col>
                        <br/>
                              <input className="mr-sm-2"
                                type="search"
                                name="key"
                                placeholder="Search"
                                aria-label="Search"
                              />


                              <Table className="no-wrap " responsive borderless>
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th></th>

                                    <th>Action</th>

                                  </tr>
                                </thead>


                                {
                                  types?.map((tdata, index) => {


                                    return (
                                      <tbody>

                                        <tr key={index} className="border-top">
                                          <td>
                                            <div className="d-flex align-items-center p-2">
                                              <div className="ms-3">
                                                <h6 className="mb-0">{tdata.label}</h6>
                                              </div>
                                            </div>
                                          </td>
                                        

                                          <td>
                                          </td>
                                          <Button variant="outline-danger" href={`/edittype/${tdata._id}`}>
                                            <i class="bi bi-pencil-square"></i>
                                          </Button>
                                          <Button variant="outline-warning"
                                            className="mx-2"
                                            onClick={async() =>{
                                              const result=  await Confirm('Are you sure you want to delete this one', 
                                              'Delete Сonfirmation');
                                            if (result) {
                                              deleteHandler(tdata._id)
                                            } else {
                                              history(`/rules`);
                                          }}
                                            }
                                            >
                                            <i class="bi bi-trash3"></i>
                                          </Button>
                                        </tr>
                                      </tbody>

                                    )
                                  })
                                }

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
                                    // onPageChange={handlePageClick}
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
