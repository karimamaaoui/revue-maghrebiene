import React ,{useEffect, useState}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Row } from "react-bootstrap";
import { Confirm } from "react-st-modal";
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import ReactPaginate from 'react-paginate'
import SidebarScreen from '../../sideBar/sidebarScreen';
import NavbarList from '../views/navbarList';
import { deleteRule, getRuleByFilter, listRules } from '../../../redux/Actions/rulesActions';
import { CSVLink } from 'react-csv';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function ListFeedback() {

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

  const [feedbackList, setFeedbackList] = useState([]);


  useEffect(async () => {
      try {
          const config = {
              headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${userInfo.token}`,
              },
          };

          const data = await axios.get(`http://localhost:5000/api/feedback/getFeedback`, config);
          console.log('data from get favorite', data)

          setFeedbackList(data.data)

      } catch (error) {
          console.log(error)
      }




      if (!userInfo) {
          history("/");
      }
  },
      [
          dispatch,
          history,
          userInfo,



      ]);
 
  const deleteHandler=async(id)=>{
    try {const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

     await axios.delete(`http://localhost:5000/api/feedback/delete/${id}`, config);
     Swal.fire({
        title: "Succces!",
        text: "Feedback Removed Successfully",
        icon: 'success',
        button: "OK!"
    });


} catch (error) {
    console.log(error)
    Swal.fire({
        title: "Error!",
        text: "Feedback Removed Error",
        icon: 'error',
        button: "OK!"
    });

}

}


  return (
          <>
      {!userInfo ? history('/') :
        userInfo.roleuser === "Admin" ?

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
                              <CardTitle tag="h5">Feedback List</CardTitle>
                              
                        <br/>
                              <Table className="no-wrap " responsive borderless>
                                <thead>
                                  <tr>
                                    <th>Label</th>
                                    <th>Stars</th>
                                    <th>Action</th>

                                  </tr>
                                </thead>
                                  {feedbackList.map((tdata, index) => {
                                    return (
                                      <tbody>
                                        <tr key={index} className="border-top">
                                          <td>
                                            <div className="d-flex align-items-center p-2">
                                              <div className="ms-3">
                                                <h6 className="mb-0">{tdata.message}</h6>
                                              </div>
                                            </div>
                                          </td>
                                          <td>
                                            <div className="d-flex align-items-center p-2">
                                              <div className="ms-3">
                                                <h6 className="mb-0">{tdata.star}</h6>
                                              </div>
                                            </div>
                                          </td>


                                          <Button variant="outline-warning"
                                            className="mx-2"
                                            onClick={async () => {
                                              const result = await Confirm('Are you sure you want to delete this one',
                                                'Delete Сonfirmation');
                                              if (result) {
                                                deleteHandler(tdata._id)
                                              } else {
                                                history(`/types`);
                                              }
                                            }
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
