import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addNewFile, addNewPost } from '../../redux/Actions/fileActions';
import axios from 'axios';
import Swal from 'sweetalert2';
import WordLimit from 'react-word-limit';
import SidebarScreen from '../sideBar/sidebarScreen';
import NavbarList from '../adminPanel/views/navbarList';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useTranslation } from "react-i18next";
import moment from 'moment';
import { RWebShare } from 'react-web-share';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import { Button, Card, Form, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import './addPost.css'

export default function AddPost() {

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [getAllText, setGetAllText] = useState('')
    const [text, setText] = useState('')

    const [pageNumber, setPageNumber] = useState(0)
    const [datas, setDatas] = useState({})
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const [requiredItem, setRequiredItem] = useState(0);
    const [count, setCount] = useState(0);
    const [viewArticle, setViewArticle] = useState([]);

    const id = useParams();
    const readId = id.id
    const history = useNavigate();

    const handleRead = async () => {

        try {
            return await axios.get(`http://localhost:5000/api/file/get/${readId}`)
                .then((res) => {
                    //     console.log(res.data);
                    setGetAllText(res.data.text);
                    setPageNumber(res.data.numpages)


                }).catch(err => {
                    console.log(err)
                })
        } catch (err) {
            console.log(err)

        }
    }
    const replaceModalItem = (id) => {
        handleShow()
        setRequiredItem(id)
    }

    const { t } = useTranslation(["common", "profile"]);

    const handleGetSingleArticle = async () => {

        try {
            return await axios.get(`http://localhost:5000/api/file/getsingle/${readId}`)
                .then((res) => {
                    // console.log(res.data);
                    setDatas(res.data)
                    let count = Object.keys(res.data.comments).length
                    setCount(count)

                    // setGetAllText(res.data.text);
                    // setPageNumber(res.data.numpages)


                }).catch(err => {
                    console.log(err)
                })
        } catch (err) {
            console.log(err)

        }
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


    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', viewArticle)

    useEffect(() => {
        if (!userInfo) {
            history("/");
        }
        else {
            handleGetSingleArticle();
            handleRead();
            handleView(readId)
        }

    },
        [
            dispatch,
            history,
            userInfo,


        ]);


    const currentUrl = window.location.href;

    return (
        <div>
            <div className="main-body" >
                <div className="row gutters-sm" style={{ maxWidth: "100%" }}>
                    <SidebarScreen />
                    <div className="col-md-8" style={{ marginTop: '50px' }}>
                        <div className='container'>
                            <div id="content" className="p-6 p-md-10 pt-12">
                                <NavbarList />
                                <div className='col-xs-24-sm-12'>
                                    <div className="card mb-3">

                                        <div className="card-body">

                                            <div className="row">
                                                <h1 style={{ color: '#B91736' }}>Read Article:::::::::::::::::::::::::::::::::::::::::::::
                                                </h1>
                                            </div>
                                            {/* <div id="progress-bar">
        
                                            </div> */}
                                            <br />
                                            {/* <h2>  {getAllText.split(' ').length}
                                            </h2> */}
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col-lg-4">
                                                        <div class="card card-profile">
                                                            <div class="card-header"></div>
                                                            <div class="card-body text-center">
                                                                <img src={datas.pathFile} zoomSrc={datas.pathFile} style={{ height: '100px', width: '140px', borderRadius: '10px' }} />

                                                                <br />
                                                                <br />
                                                                {datas.authors?.map((a, key) => {
                                                                    return (
                                                                        <div key={key}>
                                                                            <h6 class="mb-3" style={{ textTransform: "capitalize", textAlign: 'left' }}>

                                                                                Written By {' '}
                                                                                <span style={{ fontWeight: 'bold' }}> {a.username}</span>

                                                                            </h6>

                                                                            <p class="mb-4" style={{ textAlign: 'left' }} >Email: <span style={{ fontWeight: 'bold' }}> {a.email} </span> </p>
                                                                        </div>
                                                                    )
                                                                })}
                                                                <button class="btn btn-outline-dark btn-sm"><span class="fa fa-twitter"></span> Follow</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-8">
                                                        <div class="card">
                                                            {/* <div class="card-header">
                                                                <div class="input-group">
                                                                    <input type="text" placeholder="Message" class="form-control" />
                                                                    <div class="input-group-append">
                                                                        <button type="button" class="btn btn-outline-secondary"><i class="fa fa-send"></i></button>
                                                                    </div>
                                                                </div>
                                                            </div> */}
                                                            <div class="list-group-item py-5" >
                                                                <div class="media">
                                                                    <div class="media-object avatar avatar-md mr-3"></div>
                                                                    <div class="media-body">
                                                                        <div class="media-heading">
                                                                            <h4 style={{ fontWeight: 'bold' }}>{datas.title}</h4>
                                                                        </div>

                                                                        <div class="media-heading">
                                                                            <small style={{ textAlign: 'right' }}>
                                                                                Created At :{' '}
                                                                                {moment(datas.createdAt).format("DD-MM-YYYY")}
                                                                            </small>
                                                                            <small class="float-right">{0.025 * (getAllText.split(' ').length)} min
                                                                                <i class="bi bi-stopwatch"></i>
                                                                            </small>
                                                                            <small class="float-left">
                                                                                <RWebShare
                                                                                    data={{
                                                                                        text: "Revue Maghrebine Article",
                                                                                        url: currentUrl,
                                                                                    }}
                                                                                    onClick={() => console.log("shared successfully!")}
                                                                                >
                                                                                    <i class="bi bi-share"></i>

                                                                                </RWebShare>
                                                                            </small>
                                                                            {'   '}

                                                                            <small class="float-left" style={{ marginLeft: '12px' }}>
                                                                                <i class="bi bi-chat-left-dots" >{count}</i>

                                                                            </small>




                                                                        </div>
                                                                        <br />
                                                                        <div class="media-heading" style={{ textAlign: 'left' }}>
                                                                            <h5>{t("profile:abbreviations")}</h5>
                                                                        </div>
                                                                        <div class="text-muted text-small" style={{ textAlign: 'left' }}>{datas.abbreviations}</div>
                                                                        <div class="media-heading" style={{ textAlign: 'left' }}>
                                                                            <h5>{t("profile:keywords")}</h5>
                                                                        </div>
                                                                        <div class="text-muted text-small" style={{ textAlign: 'left' }}>{datas.keyWords}</div>


                                                                        <div class="media-heading" style={{ textAlign: 'left' }}>
                                                                            <h5>{t("profile:abstract")}</h5>
                                                                        </div>
                                                                        <div class="text-muted text-small" style={{ textAlign: 'left' }}>{datas.abstract}</div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="list-group card-list-group">
                                                                <div class="list-group-item py-5">
                                                                    <div class="media">
                                                                        <div class="media-object avatar avatar-md mr-3"></div>
                                                                        <div class="media-body">
                                                                            <div class="text-muted text-small">
                                                                                <p style={{ textAlign: 'left' }}>
                                                                                    <WordLimit limit={1500}>{getAllText}</WordLimit>,

                                                                                </p>


                                                                            </div>

                                                                        </div>
                                                                    </div>


                                                                </div>
                                                                <div class="row align-items-end">
                                                                    <div class="col">
                                                                    </div>
                                                                    <div class="col">
                                                                    </div>
                                                                    <div class="col">
                                                                    
                                                                        <button class="btn btn-outline-dark btn-sm" style={{ textAlign: 'left' }} 
                                                                          data-toggle="modal" data-target="#exampleModal"
                                                                          onClick={() => {
                                                                              replaceModalItem(datas._id)}}
                                                                        > Read All Article</button>
                                                                        
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
                                                                                                    <div class="col-xs-12"> <button class="pull-right" style={{borderRadius:'10px'}}>Confirm Payment</button> </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Modal.Body>

                                                                        </Modal>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="container">
                                                                <div class="row align-items-start">
                                                                    <div class="col">
                                                                    </div>
                                                                    <div class="col-md-8 col-sm-12">
                                                                        <div class="comment-wrapper">
                                                                            <div class="panel panel-info">
                                                                                <div class="panel-heading">
                                                                                    Comment panel
                                                                                </div>
                                                                                <div class="panel-body">
                                                                                    <textarea class="form-control" placeholder="write a comment..."
                                                                                        type="text"
                                                                                        name='text'
                                                                                        onChange={(e) => {
                                                                                            setText(e.target.value);

                                                                                        }}

                                                                                        rows="3"></textarea>
                                                                                    <br />
                                                                                    <div className="footer" style={{ marginTop: '-12px' }}>

                                                                                        <div >

                                                                                            <button class="pull-right"
                                                                                                style={{ borderRadius: "15px" }}
                                                                                                onClick={
                                                                                                    () => {

                                                                                                        makeComment(datas._id)
                                                                                                    }}>
                                                                                                <i class="fa fa-send">
                                                                                                    Add
                                                                                                </i>

                                                                                            </button>

                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="clearfix"></div>
                                                                                    <hr />

                                                                                    {datas.comments?.map((c, key) => {

                                                                                        return (<>
                                                                                            <ul class="media-list">
                                                                                                <li class="media">
                                                                                                    <a href="#" class="pull-left">
                                                                                                        <img src="https://bootdey.com/img/Content/user_1.jpg" style={{ height: '40px', width: '40px', borderRadius: '40px' }} alt="" class="img-circle" />
                                                                                                    </a>
                                                                                                    <div class="media-body">
                                                                                                        <strong style={{ color: 'red' }}>{c.postedBy.username}</strong>
                                                                                                        <p>
                                                                                                            {c.text};
                                                                                                        </p>
                                                                                                    </div>
                                                                                                </li>
                                                                                            </ul>
                                                                                        </>

                                                                                        )
                                                                                    })}


                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div class="col">
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>




                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <Document file={pdfFile}>
                                                <Page pageNumber={2} />
                                            </Document> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
