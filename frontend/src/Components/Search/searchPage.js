import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllArticlePaginate, getAllArticles, getArticleByAttribute, getArticleByFilter, getArticleByType, getRandomArticle } from '../../redux/Actions/articleActions';
import NavbarList from '../adminPanel/views/navbarList'
import SidebarScreen from '../sideBar/sidebarScreen'
import FileDownload from "js-file-download"
import { listTypes } from '../../redux/Actions/typeAction';
import ReadMoreReact from 'read-more-react';
import { Confirm, Prompt, Alert } from 'react-st-modal';
import ReactPaginate from 'react-paginate'
import { listAttribute } from '../../redux/Actions/attributeActions';
import './search.css'
import Swal from 'sweetalert2';
import { Button, Card, Form, Modal, OverlayTrigger, Tab, Tabs, Tooltip } from "react-bootstrap";

import BG1 from "../../assets/Bannière Orange de Restaurant Reprise d'Activité Format Paysage.png"
import BG2 from '../../assets/Jaune Professionnel Dégradé Application Développement Bannière Paysage.png'
import BG3 from '../../assets/Bannière.png'

export default function SearchPahe() {

    const dispatch = useDispatch();
    const history = useNavigate();
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [requiredItem, setRequiredItem] = useState(0);

    const handleClose = () => setShow(false);

    const replaceModalItem = (id) => {
        handleShow()
        setRequiredItem(id)
    }



    const getAllArticle = useSelector((state) => state.getAllArticle);
    const { loadingGetAllArticle, errorGetAllArticle, articles } = getAllArticle;
    const [searchResult, setSearchResult] = useState(articles);


    const articleFilters = useSelector((state) => state.articleFilters);
    const { loadingArticleFilters, errorArticleFilters, articleFilter } = articleFilters;


    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const typeList = useSelector((state) => state.typeList);
    const { loadingType, errorType, types } = typeList;
    //  const { typeList } = useSelector(state => state.typeList);
    const attributeList = useSelector((state) => state.attributeList);
    const { loadingAttribute, errorAttribute, attributes } = attributeList;
    const [searchInput, setSearchInput] = useState('');
    const [typeIds, setTypeIds] = useState([]);
    const [attributeIds, setAttributeIds] = useState([]);
    const [likeArticle, setLikeArticle] = useState([]);
    const [viewArticle, setViewArticle] = useState([]);
    const [favoriteList, setFavoriteList] = useState([]);

    const [text, setText] = useState('');
    //paginate
    const [items, setItems] = useState([])
    const handlePageClick = (data) => {

        //console.log("efefef", data.selected);
        let currentPage = data.selected + 1;
        dispatch(getAllArticlePaginate(currentPage));
        //  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", currentPage);

    }



    useEffect(() => {
        dispatch(getAllArticles());
        dispatch(listTypes());


        if (!userInfo) {
            history("/");
        }
    },
        [
            dispatch,
            history,
            userInfo,
            viewArticle,
            likeArticle

        ]);

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

    const handleSearch = async (e) => {

        const searchTerm = e.currentTarget.value;
        setSearchInput(searchTerm)

        dispatch(getArticleByFilter(articleFilter, searchTerm));

        filterContent(articleFilter, searchTerm)

    }

    const handleDownload = async (id) => {
        // const { data } = await axios.get(`http://localhost:5000/api/file/${id}`);
        // console.log("user data", data)
        await axios.get(`http://localhost:5000/api/file/${id}`
            , {
                responseType: 'blob',
            }
        )
            .then((response) => {
                // console.log("resp", articles);

                if (response.data.type.includes('pdf')) {

                    FileDownload(response.data, 'downloaded.pdf')
                }
                else {
                    if (response.data.type.includes('document')) {

                        FileDownload(response.data, 'downloaded.docx')
                    }
                    //     else {

                    //         FileDownload(response.data, 'downloaded.png')
                    //     }
                }


            }

            )
    }
    const makeComment = async (id) => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,

            },
        };
        let postedBy = userInfo.user._id;

        let user = { text, postedBy }

        return await axios.put(`http://localhost:5000/api/file/comment/${id}`, user, config)
            .then((res) => {

                console.log(res.data);
                Swal.fire({
                    title: "Succces!",
                    text: "Comment Added Successfully",
                    icon: 'success',
                    button: "OK!"
                });


                //console.log('article => ' + JSON.stringify(user));

            }).catch(err => {
                console.log(err)
            })
    }
    const handleLike = async (id) => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,

            },
        };
        let userId = userInfo.user._id;
        let user = { userId }
        //    console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', user)


        return await axios.put(`http://localhost:5000/api/file/like/${id}`, user, config)
            .then((res) => {

                //   console.log(res.data);
                setLikeArticle(res.data)

                //   console.log('article => ' + JSON.stringify(res.data));

            }).catch(err => {
                console.log(err)
            })

    }

    const handleFavoris = async (article) => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,

            },
        };
        let userId = userInfo.user._id;
        let user = { userId, article }
        // console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', user)


        return await axios.post(`http://localhost:5000/api/favorite/add/`, user, config)
            .then((res) => {

                console.log(res.data);
                Swal.fire({
                    title: "Succces!",
                    text: "Request Sended Successfully",
                    icon: 'success',
                    button: "OK!"
                });

            }).catch(err => {
                console.log(err)
                Swal.fire({
                    title: "Error!",
                    text: "Request Already Send",
                    icon: 'error',
                    button: "OK!"
                });

            })


    }


    const handleView = async (idd) => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,

            },
        };

        await axios.get(`http://localhost:5000/api/file/view/${idd}`, config)

            .then((res) => {

                console.log('fdfdfdfdfd', res.data);
                setViewArticle(res.data)

            }).catch(err => {
                console.log(err)
            })

    }

    const [fileURL, setFileURL] = useState('');
    //console.log('fileURL', fileURL)

    // const handleRead = async (id) => {
    //     const { data: pdf } = await axios.get(`http://localhost:5000/api/file/get/${id}`,

    //         {
    //             responseType: 'arraybuffer',
    //             responseEncoding: 'binary',

    //             headers: {
    //                 "Content-type": "application/pdf",
    //             },
    //         }
    //     );

    //     const blob = new Blob([pdf], {
    //         type: 'application/pdf'
    //     });
    //     const fileURL = URL.createObjectURL(blob);
    //     setFileURL(fileURL)

    //     window.open(fileURL, '_blank', 'location=yes,height=650,width=1000,scrollbars=yes,status=yes');


    //     // console.log("user data", pdf)
    //     //  await axios.get(`http://localhost:5000/api/file/get/${id}`
    //     //     , {
    //     //         responseType: 'blob',
    //     //     }
    //     // )
    //     // .then((response) => {
    //     //     console.log("resp", response);
    //     // }

    //     //  )
    //     //  console.log(Buffer.from(pdf).toString('base64'));

    //     console.log(new Blob([new Uint8Array(pdf)]))

    // }


    const handleCategory = e => {
        let updatedCategoryIds;

        const currentCategoryChecked = e.target.value;
        const allCategoriesChecked = [...typeIds];
        const indexFound = allCategoriesChecked.indexOf(currentCategoryChecked);

        if (indexFound === -1) {
            // add
            updatedCategoryIds = [...typeIds, currentCategoryChecked];
            // console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', updatedCategoryIds[0])

            setTypeIds(updatedCategoryIds);
        } else {
            // remove
            updatedCategoryIds = [...typeIds];
            updatedCategoryIds.splice(indexFound, 1);
            setTypeIds(updatedCategoryIds);
        }



        dispatch(getArticleByType(updatedCategoryIds));
        setTypeIds('')

    };
    // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', typeIds)


    const handleAttribute = e => {

        const currentAttributeChecked = e.target.value;
        const allAttributeChecked = [...attributeIds];
        const indexFound = allAttributeChecked.indexOf(currentAttributeChecked);

        let updatedAttributeIds;
        if (indexFound === -1) {
            // add
            updatedAttributeIds = [...attributeIds, currentAttributeChecked];
            console.log('updatedAttributeIds ', updatedAttributeIds)
            setAttributeIds(updatedAttributeIds);
        } else {
            // remove
            updatedAttributeIds = [...attributeIds];
            updatedAttributeIds.splice(indexFound, 1);
            setAttributeIds(updatedAttributeIds);
        }


        dispatch(getArticleByAttribute(updatedAttributeIds));


    };

    return (
        <div>
            <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
                <div className="main-body" >
                    <div className="row gutters-sm" style={{ maxWidth: "100%" }}>
                        <SidebarScreen />
                        <div className="col-md-8" style={{ marginTop: '50px' }}>

                            <div className='container'>

                                <div id="content" className="p-6 p-md-10 pt-12">

                                    <NavbarList />
                                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true" style={{ width: '100%', background: 'beige' }}>
                                        <div class="carousel-indicators">
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true"
                                                aria-label="Slide 1"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>

                                        </div>
                                        <div class="carousel-inner" >

                                            <div class="carousel-item active">
                                                <img src={BG2} class="d-block " height="200px" alt="..." />

                                            </div>

                                            <div class="carousel-item">
                                                <img src={BG1} class="d-block " height="200px" alt="..." />
                                            </div>
                                            <div class="carousel-item">
                                                <img src={BG3} class="d-block " height="200px" alt="..." />
                                            </div>

                                        </div>
                                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Previous</span>
                                        </button>
                                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Next</span>
                                        </button>
                                    </div>


                                    <div className="card mb-3">

                                        <div className="card-body">

                                            <div className="row">
                                                <h1 style={{ color: '#B91736' }}>Search</h1>
                                            </div>
                                            <br />
                                            <div className="row ">
                                                <div className='col-md-3 border-right'>

                                                    <div className='text-muted mb-2' >
                                                        Filters {' '} <span className="bi bi-sliders2" ></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='border-top border-bottom bg-light p-3 '>
                                                <div className='row justify-content-around'>
                                                    <div className='col-lg-3'>
                                                        <label>To research </label>
                                                        <input className="mr-sm-2"
                                                            type="search"
                                                            name="key"
                                                            placeholder="enter a word "
                                                            aria-label="Search"
                                                            onChange={handleSearch}
                                                        />
                                                    </div>


                                                    <div className='col-4' style={{ display: "flex", fontSize: "15px", flexWrap: "wrap" }}>
                                                        <p>   Choose  Type : </p>


                                                        <select className="select" name="types"
                                                            required
                                                            onChange={handleCategory}

                                                        >

                                                            <option >Choose Theme</option>

                                                            {types &&
                                                                types.map((type, key) => {

                                                                    return <option key={key} value={type._id} selected={typeIds.includes(type._id)}
                                                                    > {type.label}</option>;


                                                                })}

                                                        </select>

                                                    </div>


                                                </div>

                                            </div>
                                            <br />


                                            <div class="">

                                                <div className='row mb-3 '>
                                                    <div className="col-md-15 offset-md">
                                                        <div className="row">

                                                            <div className="col-sm-12"  >

                                                                <div className='pagination justify-content-center'>
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

                                                        </div>

                                                        {searchInput.length > 1 ? (
                                                            searchResult.map((tdata, index) => {

                                                                return (

                                                                    <>

                                                                        {tdata.published === true ?

                                                                            <div className='card'>

                                                                                <div class="sign-up-container">
                                                                                    <br />

                                                                                    <div style={{ display: "inline-flex", fontSize: "50px" }}>


                                                                                        <div key={index}>
                                                                                            <div class="card-body">
                                                                                                <label style={{ fontSize: '20px' }}>Title:{tdata.title}</label>
                                                                                                <img src={tdata.pathFile} alt="" height="140px" width="30px" />

                                                                                                <p>
                                                                                                    KeyWords :
                                                                                                    {tdata.keyWords}
                                                                                                    <br />

                                                                                                    Created At : {tdata.createdAt}

                                                                                                    <br />
                                                                                                    Type :
                                                                                                    {tdata.typeArticle.map(
                                                                                                        (type, i) => {
                                                                                                            return (
                                                                                                                type.label
                                                                                                            )
                                                                                                        })
                                                                                                    }

                                                                                                    <div className="footer">
                                                                                                        <div style={{ display: "inline-block" }}>
                                                                                                            <form
                                                                                                                onSubmit={(e) => {
                                                                                                                    e.preventDefault()
                                                                                                                    makeComment(tdata._id)
                                                                                                                }}
                                                                                                            >

                                                                                                                <div class="card-header">
                                                                                                                    <div class="input-group">
                                                                                                                        <input
                                                                                                                            type="text"
                                                                                                                            placeholder="Message"
                                                                                                                            name='text'
                                                                                                                            onChange={(e) => {
                                                                                                                                setText(e.target.value);

                                                                                                                            }} />
                                                                                                                        {console.log('text', text)}
                                                                                                                        <div class="input-group-append">
                                                                                                                            <button type="button" class="btn btn-outline-secondary" onClick={
                                                                                                                                () => {

                                                                                                                                    makeComment(tdata._id)
                                                                                                                                }}><i class="fa fa-send"></i></button>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </form>

                                                                                                            <button type='submit' className='primary'
                                                                                                                style={{ borderRadius: "10px" }}
                                                                                                                onClick={async () => {
                                                                                                                    handleView(tdata._id);

                                                                                                                    const result = await Alert(

                                                                                                                        <div className="footer" style={{ height: '70%' }}>
                                                                                                                            <Tabs defaultActiveKey="first"
                                                                                                                                style={{ backgroundColor: '#FEE5CF', }} >

                                                                                                                                <Tab eventKey="first" title="Aboutus">
                                                                                                                                    {(tdata.view.length) > 0 ?

                                                                                                                                        <h6 style={{
                                                                                                                                            fontSize: '14px',
                                                                                                                                            marginTop: '12px'
                                                                                                                                        }}>
                                                                                                                                            <i class="bi bi-eye"></i>

                                                                                                                                            {tdata.view.length} view(s)
                                                                                                                                        </h6>
                                                                                                                                        : <h6> </h6>
                                                                                                                                    }
                                                                                                                                    Abstract :
                                                                                                                                    {tdata.abstract}
                                                                                                                                    <button onClick={
                                                                                                                                        async () => {
                                                                                                                                            {
                                                                                                                                                tdata.filepassword.length != 0 ?
                                                                                                                                                    <div>
                                                                                                                                                        {replaceModalItem(tdata._id)}

                                                                                                                                                    </div>
                                                                                                                                                    :
                                                                                                                                                    history(`/b/${tdata._id}`)
                                                                                                                                            }
                                                                                                                                        }}> read all article</button>

                                                                                                                                </Tab>



                                                                                                                                <Tab eventKey="second" title="Dashboard">
                                                                                                                                    <div style={{ display: "inline-flex" }}>


                                                                                                                                        <button type='submit' className='primary'
                                                                                                                                            onClick={() => handleDownload(tdata._id)}>
                                                                                                                                            download
                                                                                                                                        </button>
                                                                                                                                    </div>

                                                                                                                                    <div style={{ display: "inline-flex", }}>

                                                                                                                                        <button className="bi bi-hand-thumbs-up-fill"
                                                                                                                                            style={{ borderRadius: '10px', width: '100%' }}
                                                                                                                                            onClick={() => handleLike(tdata._id)}
                                                                                                                                        ></button>
                                                                                                                                        <br />
                                                                                                                                    </div>

                                                                                                                                    <div style={{ display: "inline-flex", }}>

                                                                                                                                        <button className="bi bi-star-fill"
                                                                                                                                            style={{ borderRadius: '10px', width: '100%' }}
                                                                                                                                            onClick={() => handleFavoris(tdata._id)}
                                                                                                                                        ></button>
                                                                                                                                        <br />
                                                                                                                                    </div>

                                                                                                                                    {(tdata.like.length) > 0 ?
                                                                                                                                        <div>
                                                                                                                                            <h6 style={{ fontSize: '14px', marginTop: '12px' }}>
                                                                                                                                                {tdata.like.length} like(s)

                                                                                                                                            </h6>
                                                                                                                                        </div>
                                                                                                                                        : <h6> </h6>
                                                                                                                                    }

                                                                                                                                </Tab>
                                                                                                                            </Tabs>


                                                                                                                        </div>,
                                                                                                                        'Read More'


                                                                                                                    );

                                                                                                                    if (result) {
                                                                                                                        //  this.handleBooking(item.id);
                                                                                                                        { console.log("id", tdata._id) }

                                                                                                                    }
                                                                                                                }}

                                                                                                            >

                                                                                                                Read More
                                                                                                            </button>



                                                                                                            <br />
                                                                                                            <Modal show={show} onHide={handleClose}>
                                                                                                                <Modal.Header closeButton >
                                                                                                                </Modal.Header>
                                                                                                                <Modal.Body>


                                                                                                                    <div class="row">
                                                                                                                        <div class="col">
                                                                                                                            <div class="panel panel-default">
                                                                                                                                <div class="panel-heading">
                                                                                                                                    <div class="row">
                                                                                                                                        <h3 class="text-center">Payment Details</h3>
                                                                                                                                        <div class="inlineimage">
                                                                                                                                            <img class="img-responsive images"
                                                                                                                                                src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Mastercard-Curved.png" />
                                                                                                                                            <img class="img-responsive images" src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Discover-Curved.png" />
                                                                                                                                            <img class="img-responsive images" src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Paypal-Curved.png" />
                                                                                                                                            <img class="img-responsive images" src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/American-Express-Curved.png" /> </div>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                                <div class="panel-body">
                                                                                                                                    <form role="form">
                                                                                                                                        <div class="row">
                                                                                                                                            <div class="col-xs-12">
                                                                                                                                                <div class="form-group"> <label>CARD NUMBER</label>
                                                                                                                                                    <div class="input-group"> <input type="tel" class="form-control" placeholder="Valid Card Number" /> <span class="input-group-addon"><span class="fa fa-credit-card"></span></span> </div>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                        <div class="row">
                                                                                                                                            <div class="col-xs-7 col-md-7">
                                                                                                                                                <div class="form-group"> <label><span class="hidden-xs">EXPIRATION</span><span class="visible-xs-inline">EXP</span> DATE</label> <input type="tel" class="form-control" placeholder="MM / YY" /> </div>
                                                                                                                                            </div>
                                                                                                                                            <div class="col-xs-5 col-md-5 pull-right">
                                                                                                                                                <div class="form-group"> <label>CV CODE</label> <input type="tel" class="form-control" placeholder="CVC" /> </div>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                        <div class="row">
                                                                                                                                            <div class="col-xs-12">
                                                                                                                                                <div class="form-group"> <label>CARD OWNER</label> <input type="text" class="form-control" placeholder="Card Owner Name" /> </div>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                    </form>
                                                                                                                                </div>
                                                                                                                                <div class="footer">
                                                                                                                                    <div class="row">
                                                                                                                                        <div class="col-xs-12"> <button class="pull-right" style={{ borderRadius: '10px' }}>Confirm Payment</button> </div>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </Modal.Body>

                                                                                                            </Modal>



                                                                                                        </div>
                                                                                                    </div>
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>


                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                            : "Not Authorized"
                                                                        }
                                                                    </>

                                                                )

                                                            })

                                                        )


                                                            : (
                                                                articles?.map((tdata, index) => {


                                                                    <div className="row">
                                                                        <div className=""  >
                                                                            <div className='pagination justify-content-center'>
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
                                                                    </div>

                                                                    return (
                                                                        <>

                                                                            {tdata.published === true ?

                                                                                <div className='card'>
                                                                                    <div class="sign-up-container">
                                                                                        <br />


                                                                                        <div style={{ display: "inline-flex", fontSize: "50px" }}>


                                                                                            <div key={index}>
                                                                                                <div class="card-body">
                                                                                                    <label style={{ fontSize: '20px' }}>Title:{tdata.title}</label>

                                                                                                    <img src={tdata.pathFile} alt="" height="140px" width="30px" />

                                                                                                    <p>
                                                                                                        KeyWords :
                                                                                                        {tdata.keyWords}

                                                                                                        <br />
                                                                                                        Created At : {tdata.createdAt}

                                                                                                        <br />
                                                                                                        Type :
                                                                                                        {tdata.typeArticle.map(
                                                                                                            (type, i) => {
                                                                                                                return (
                                                                                                                    type.label
                                                                                                                )
                                                                                                            })
                                                                                                        }
                                                                                                        <br />
                                                                                                        <div className="footer">
                                                                                                            <div style={{ display: "inline-block" }}>

                                                                                                                <form
                                                                                                                    onSubmit={(e) => {
                                                                                                                        e.preventDefault()
                                                                                                                        makeComment(tdata._id)
                                                                                                                    }}
                                                                                                                >                <div class="card-header">
                                                                                                                        <div class="input-group">
                                                                                                                            <input
                                                                                                                                type="text"
                                                                                                                                placeholder="Message"
                                                                                                                                name='text'
                                                                                                                                onChange={(e) => {
                                                                                                                                    setText(e.target.value);

                                                                                                                                }} />
                                                                                                                            {console.log('text', text)}
                                                                                                                            <div class="input-group-append">
                                                                                                                                <button type="button" class="btn btn-outline-secondary" onClick={
                                                                                                                                    () => {

                                                                                                                                        makeComment(tdata._id)
                                                                                                                                    }}><i class="fa fa-send"></i></button>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                </form>

                                                                                                                <button type='submit' className='primary'
                                                                                                                    style={{ borderRadius: "10px" }}
                                                                                                                    onClick={async () => {
                                                                                                                           handleView(tdata._id);


                                                                                                                        const result = await Alert(

                                                                                                                            <div className="footer" style={{ height: '70%' }}>
                                                                                                                                <Tabs defaultActiveKey="first" style={{ backgroundColor: '#FEE5CF', }} >

                                                                                                                                    <Tab eventKey="first" title="Aboutus">
                                                                                                                                        {(tdata.view.length) > 0 ?

                                                                                                                                            <h6 style={{ fontSize: '14px', marginTop: '12px' }}>
                                                                                                                                                <i class="bi bi-eye"></i>

                                                                                                                                                {tdata.view.length} view(s)
                                                                                                                                            </h6>
                                                                                                                                            : <h6> </h6>
                                                                                                                                        }
                                                                                                                                        Abstract :
                                                                                                                                        {tdata.abstract}
                                                                                                                                        <button onClick={
                                                                                                                                            async () => {
                                                                                                                                                {
                                                                                                                                                    tdata.filepassword.length != 0 ?
                                                                                                                                                        <div>
                                                                                                                                                            {replaceModalItem(tdata._id)}

                                                                                                                                                        </div>
                                                                                                                                                        :
                                                                                                                                                        history(`/b/${tdata._id}`)
                                                                                                                                                }
                                                                                                                                            }}> read all article</button>

                                                                                                                                    </Tab>



                                                                                                                                    <Tab eventKey="second" title="Dashboard">
                                                                                                                                        <div style={{ display: "inline-flex" }}>


                                                                                                                                            <button type='submit' className='primary'
                                                                                                                                                onClick={() => handleDownload(tdata._id)}>
                                                                                                                                                download
                                                                                                                                            </button>
                                                                                                                                        </div>

                                                                                                                                        <div style={{ display: "inline-flex", }}>

                                                                                                                                            <button className="bi bi-hand-thumbs-up-fill"
                                                                                                                                                style={{ borderRadius: '10px', width: '100%' }}
                                                                                                                                                onClick={() => handleLike(tdata._id)}
                                                                                                                                            ></button>
                                                                                                                                            <br />
                                                                                                                                        </div>

                                                                                                                                        <div style={{ display: "inline-flex", }}>

                                                                                                                                            <button className="bi bi-star-fill"
                                                                                                                                                style={{ borderRadius: '10px', width: '100%' }}
                                                                                                                                                onClick={() => handleFavoris(tdata._id)}
                                                                                                                                            ></button>
                                                                                                                                            <br />
                                                                                                                                        </div>

                                                                                                                                        {(tdata.like.length) > 0 ?
                                                                                                                                            <div>
                                                                                                                                                <h6 style={{ fontSize: '14px', marginTop: '12px' }}>
                                                                                                                                                    {tdata.like.length} like(s)

                                                                                                                                                </h6>
                                                                                                                                            </div>
                                                                                                                                            : <h6> </h6>
                                                                                                                                        }

                                                                                                                                    </Tab>
                                                                                                                                </Tabs>


                                                                                                                            </div>,
                                                                                                                            'Read More'


                                                                                                                        );

                                                                                                                        if (result) {
                                                                                                                            //  this.handleBooking(item.id);
                                                                                                                            { console.log("id", tdata._id) }

                                                                                                                        }
                                                                                                                    }}

                                                                                                                >

                                                                                                                    Read More
                                                                                                                </button>
                                                                                                                <Modal show={show} onHide={handleClose}>
                                                                                                                    <Modal.Header closeButton >
                                                                                                                    </Modal.Header>
                                                                                                                    <Modal.Body>


                                                                                                                        <div class="row">
                                                                                                                            <div class="col">
                                                                                                                                <div class="panel panel-default">
                                                                                                                                    <div class="panel-heading">
                                                                                                                                        <div class="row">
                                                                                                                                            <h3 class="text-center">Payment Details</h3>
                                                                                                                                            <div class="inlineimage">
                                                                                                                                                <img class="img-responsive images"
                                                                                                                                                    src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Mastercard-Curved.png" />
                                                                                                                                                <img class="img-responsive images" src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Discover-Curved.png" />
                                                                                                                                                <img class="img-responsive images" src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Paypal-Curved.png" />
                                                                                                                                                <img class="img-responsive images" src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/American-Express-Curved.png" /> </div>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                    <div class="panel-body">
                                                                                                                                        <form role="form">
                                                                                                                                            <div class="row">
                                                                                                                                                <div class="col-xs-12">
                                                                                                                                                    <div class="form-group"> <label>CARD NUMBER</label>
                                                                                                                                                        <div class="input-group"> <input type="tel" class="form-control" placeholder="Valid Card Number" /> <span class="input-group-addon"><span class="fa fa-credit-card"></span></span> </div>
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <div class="row">
                                                                                                                                                <div class="col-xs-7 col-md-7">
                                                                                                                                                    <div class="form-group"> <label><span class="hidden-xs">EXPIRATION</span><span class="visible-xs-inline">EXP</span> DATE</label> <input type="tel" class="form-control" placeholder="MM / YY" /> </div>
                                                                                                                                                </div>
                                                                                                                                                <div class="col-xs-5 col-md-5 pull-right">
                                                                                                                                                    <div class="form-group"> <label>CV CODE</label> <input type="tel" class="form-control" placeholder="CVC" /> </div>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <div class="row">
                                                                                                                                                <div class="col-xs-12">
                                                                                                                                                    <div class="form-group"> <label>CARD OWNER</label> <input type="text" class="form-control" placeholder="Card Owner Name" /> </div>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </form>
                                                                                                                                    </div>
                                                                                                                                    <div class="footer">
                                                                                                                                        <div class="row">
                                                                                                                                            <div class="col-xs-12"> <button class="pull-right" style={{ borderRadius: '10px' }}>Confirm Payment</button> </div>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </Modal.Body>

                                                                                                                </Modal>

                                                                                                                <br />

                                                                                                            </div>
                                                                                                        </div>

                                                                                                    </p>
                                                                                                </div>


                                                                                            </div>


                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                : <></>}
                                                                        </>

                                                                    )
                                                                })
                                                            )}
                                                        <div className="row">

                                                            <div className="col-sm-12"  >

                                                                <div className='pagination justify-content-center'>
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

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
