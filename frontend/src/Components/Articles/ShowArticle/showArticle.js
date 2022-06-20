import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllArticles } from '../../../redux/Actions/articleActions';
import { Button, Col, Row } from "react-bootstrap";
import SidebarScreen from '../../sideBar/sidebarScreen';
import NavbarList from '../../adminPanel/views/navbarList';

import { Card, CardBody, CardTitle, Table } from "reactstrap";


export default function ShowArticle() {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();
    const history = useNavigate();


    const getAllArticle = useSelector((state) => state.getAllArticle);
    const { loadingGetAllArticle, errorGetAllArticle, articles } = getAllArticle;

    useEffect(() => {
        dispatch(getAllArticles());


        if (!userInfo) {
            history("/");
        }
    },
        [
            dispatch,
            history,
            userInfo,

        ]);

    return (
        <>

            {!userInfo ? history('/') :
                userInfo.roleuser === "Author" ?

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
                                                         <br/>
                                                            <Table className="no-wrap " responsive borderless>
                                                                <thead>
                                                                    <tr>
                                                                        <th>title</th>
                                                                        <th>Image</th>

                                                                        <th>keywords</th>

                                                                        <th>status</th>
                                                                        <th></th>

                                                                        <th>Action</th>

                                                                    </tr>
                                                                </thead>

                                                                {articles?.map((tdata, index) => {


                                                                    return (
                                                                        <>
                                                                            {tdata.authors.map((au) => {
                                                                                return (
                                                                                    <>
                                                                                        {console.log('au.username ', au.username)}
                                                                                        {console.log('atdata aith ', userInfo.user.username)}

                                                                                        {au.username === userInfo.user.username ? <>


                                                                                            <tbody>

                                                                                                <tr key={index} className="border-top">
                                                                                                    <td>
                                                                                                        <div className="d-flex align-items-center p-2">
                                                                                                            <div className="ms-3">
                                                                                                                <h6 className="mb-0">{tdata.title}</h6>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </td>
                                                                                                    <td><img src={tdata.pathFile} style={{ width: '82px' }} /></td>
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
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </>
                                                                                            : <></>

                                                                                        }

                                                                                    </>
                                                                                )
                                                                            })}




                                                                        </>
                                                                    )
                                                                })
                                                                }

                                                            </Table>

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
