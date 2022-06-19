import React, { useEffect, useState } from 'react'
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
import { deleteAttribute, getThemeByFilter, listAttribute } from '../../../redux/Actions/attributeActions';
import { CSVLink } from 'react-csv';

export default function ListAttribute() {

  const dispatch = useDispatch();
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const attributeList = useSelector((state) => state.attributeList);
  const { loadingGetAllUser, errorGetAllUser, attributes } = attributeList;


  const attributeDelete = useSelector((state) => state.attributeDelete);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = attributeDelete;

  useEffect(() => {
    dispatch(listAttribute());

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
    dispatch(deleteAttribute(id));

  };
  const themeFilters = useSelector((state) => state.themeFilters);
  const { loadingUserFilter, errorUserFilter, themeFilter } = themeFilters;


  const [searchResult, setSearchResult] = useState(attributes);

  const [searchInput, setSearchInput] = useState('');

  const filterContent = (themeFilter, searchTerm) => {
    if (searchTerm !== '') {

      const result = attributes.filter((attribute) => {
        return (attribute.label.toLowerCase().startsWith(searchTerm)
        );
      }
      );
      setSearchResult(result);
    }
    else {
      setSearchResult(attributes);
    }
    console.log("searchResult", searchResult)
  }

  const handleSearch = async (e) => {

    const searchTerm = e.currentTarget.value;
    setSearchInput(searchTerm)

    dispatch(getThemeByFilter(themeFilter, searchTerm));

    filterContent(themeFilter, searchTerm)

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
                              <CardTitle tag="h5">Theme List</CardTitle>
                              <CSVLink
                                style={{
                                  padding: "8px 8px",
                                  verticalAlign: "middle",
                                  marginLeft: "10%",
                                }}
                                data={searchResult}
                                filename={"themes-list.csv"}
                                className="btn btn-success"

                              >
                                Export To CSV
                              </CSVLink>

                              <Col lg="32" >
                                <button className="btn btn-danger" onClick={() => { history('/addattribute') }} style={{ float: 'right' }}>Add new Theme</button>
                              </Col>
                              <br />
                              <input className="mr-sm-2"
                                type="search"
                                name="key"
                                placeholder="Search"
                                onChange={handleSearch}

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
                                {searchInput.length > 1 ? (
                                  searchResult.map((tdata, index) => {
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
                                  })) : (

                                  <tbody>

                                    {
                                      attributes?.map((tdata, index) => {


                                        return (

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
                                            <Button variant="outline-danger" href={`/editattribute/${tdata._id}`}>
                                              <i class="bi bi-pencil-square"></i>
                                            </Button>
                                            <Button variant="outline-warning"
                                              className="mx-2"
                                              onClick={async () => {
                                                const result = await Confirm('Are you sure you want to delete this one',
                                                  'Delete Сonfirmation');
                                                if (result) {
                                                  deleteHandler(tdata._id)
                                                } else {
                                                  history(`/attributes`);
                                                }
                                              }
                                              }
                                            >
                                              <i class="bi bi-trash3"></i>
                                            </Button>
                                          </tr>

                                        )
                                      })
                                    }
                                  </tbody>

                                )}
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
