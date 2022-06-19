import { Card, CardBody, CardTitle, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from "react-bootstrap";
import { deleteArticle, getAllArticlePaginate, getAllArticles, getArticleByFilter } from "../../../redux/Actions/articleActions";
import NavbarList from "../views/navbarList";
import SidebarScreen from "../../sideBar/sidebarScreen";
import axios from "axios";
import ReactPaginate from 'react-paginate'
import './manageArticle.css'
import { Confirm } from "react-st-modal";
export default function ManageArticle() {

  const dispatch = useDispatch();
  const history = useNavigate();
  const [noOfElement, setNoOfElement] = useState(4);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setcurrentPage] = useState(0);


  const getAllArticle = useSelector((state) => state.getAllArticle);
  const { loadingGetAllUser, errorGetAllUser, articles } = getAllArticle;
  const [searchResult, setSearchResult] = useState(articles);

  const articleFilters = useSelector((state) => state.articleFilters);
  const { loadingArticleFilters, errorArticleFilters, articleFilter } = articleFilters;


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const articleDelete = useSelector((state) => state.articleDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = articleDelete;

  const value = useParams()

  useEffect(() => {
    dispatch(getAllArticles());
    console.log("articles", articles)

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
      dispatch(deleteArticle(id));
    
  };

  const loadMore = () => {
    setNoOfElement(noOfElement + noOfElement)
  }


  const [searchInput, setSearchInput] = useState('');

  const filterContent = (articleFilter, searchTerm) => {
    if (searchTerm !== '') {

      const result = articles.filter((article) => {
        return (article.title.toLowerCase().startsWith(searchTerm) ||
          article.abstract.toLowerCase().startsWith(searchTerm) ||
          article.abbreviations.toLowerCase().startsWith(searchTerm) ||
          article.status.toLowerCase().startsWith(searchTerm)


        );
      }
      );
      setSearchResult(result);

    }
    else {
      setSearchResult(articles);

    }

    console.log("searchResult", searchResult)


  }

  // paginate function
  const [items, setItems] = useState([])
  const handlePageClick = (data) => {

    console.log("efefef", data.selected);
    let currentPage = data.selected + 1;
    dispatch(getAllArticlePaginate(currentPage));
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", currentPage);

  }
  // search function
  const handleSearch = async (e) => {

    const searchTerm = e.currentTarget.value;
    setSearchInput(searchTerm)

    dispatch(getArticleByFilter(articleFilter, searchTerm));

    filterContent(articleFilter, searchTerm)

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
                              <CardTitle tag="h5">Articles List</CardTitle>
                              <input className="mr-sm-2"
                                type="search"
                                name="key"
                                placeholder="Search"
                                aria-label="Search"
                                onChange={handleSearch}
                              />

                              <Table className="no-wrap " responsive borderless>
                                <thead>
                                  <tr>
                                    <th>title</th>
                                    <th>keywords</th>
                                    <th>abbreviations</th>
                                    <th>Image</th>

                                    <th>status</th>
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
                                                <h6 className="mb-0">{tdata.title}</h6>
                                              </div>
                                            </div>
                                          </td>
                                          

                                          <td><img src={tdata.pathFile} style={{width:'82px'}} /></td>
                                          <td>
                                            {tdata.keyWords}
                                          </td>

                                          <td>{tdata.abbreviations}</td>
                                          {tdata.status === "accepted" ?
                                            <div>
                                              <td>
                                                <div class="d-inline-flex align-items-center active">
                                                  <div class="circle"></div>
                                                  <div class="ps-2">{tdata.status}</div>
                                                </div>

                                              </td>
                                            </div> :
                                            <div>
                                              {tdata.status === "loading" ?
                                                <div>
                                                  <td>

                                                    <div class="d-inline-flex align-items-center waiting">
                                                      <div class="circle"></div>
                                                      <div class="ps-2">{tdata.status}</div>
                                                    </div>
                                                  </td>


                                                </div> :
                                                <div>

                                                </div>
                                              }


                                            </div>
                                          }

                                          <td>
                                          </td>

                                          <Button variant="outline-danger">
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
                                              history(`/managearticles`);
                                          }}
                                            }>
                                            <i class="bi bi-trash3"></i>
                                          </Button>
                                        </tr>
                                      </tbody>

                                    )
                                  })
                                ) : (
                                  articles?.map((tdata, index) => {


                                    return (
                                      <tbody>

                                        <tr key={index} className="border-top">
                                          <td>
                                            <div className="d-flex align-items-center p-2">
                                              <div className="ms-3">
                                                <h6 className="mb-0">{tdata.title}</h6>
                                              </div>
                                            </div>
                                          </td>
                                          <td><img src={tdata.pathFile} style={{width:'82px'}} /></td>
                                          <td>
                                            {tdata.keyWords}
                                          </td>
                                          <td>{tdata.abbreviations}</td>
                                          {tdata.status === "accepted" ?
                                            <div>
                                              <td>
                                                <div class="d-inline-flex align-items-center active">
                                                  <div class="circle"></div>
                                                  <div class="ps-2">{tdata.status}</div>
                                                </div>

                                              </td>
                                            </div> :
                                            <div>
                                              {tdata.status === "loading" ?
                                                <div>
                                                  <td>

                                                    <div class="d-inline-flex align-items-center waiting">
                                                      <div class="circle"></div>
                                                      <div class="ps-2">{tdata.status}</div>
                                                    </div>
                                                  </td>


                                                </div> :
                                                <div>

                                                </div>
                                              }


                                            </div>
                                          }


                                          <td>
                                          </td>
                                          <Button variant="outline-danger" href={`/editarticle/${tdata._id}`}>
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
                                              history(`/managearticles`);
                                          }}
                                            }
                                            >
                                            <i class="bi bi-trash3"></i>
                                          </Button>
                                        </tr>
                                      </tbody>

                                    )
                                  })
                                )}

                              </Table>
                              {/* <div className="row">
                            <div className="col-sm-12">
                              <button className="btn btn-dark " style={{ textAlign: "center" }} onClick={loadMore}  >
                                Load More
                              </button>
                            </div>
                          </div> */}

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