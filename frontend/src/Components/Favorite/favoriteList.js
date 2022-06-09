import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getArticleByAttribute } from '../../redux/Actions/articleActions'
import NavbarList from '../adminPanel/views/navbarList'
import SidebarScreen from '../sideBar/sidebarScreen'
import moment from 'moment'
import { Confirm, Prompt, Alert } from 'react-st-modal';

import First from '../../assets/first.jpg'
import { Button, Card, Form, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";


export default function FavoriteList() {
    const dispatch = useDispatch();
    const history = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [requiredItem, setRequiredItem] = useState(0);

    const handleClose = () => setShow(false);

    const replaceModalItem = (id) => {
        handleShow()
        setRequiredItem(id)
    }

    const [articleByAttribute, setArticleByAttribute] = useState([]);
    const getAllArticle = useSelector((state) => state.getAllArticle);
    const { loadingGetAllArticle, errorGetAllArticle, articles } = getAllArticle;
    const [attributeName, setAttributeName] = useState('')
    const [noOfElement, setNoOfElement] = useState(3);

    const [favorites, setFavorites] = useState([]);


    useEffect(async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const data= await axios.get(`http://localhost:5000/api/favorite/`, config);
            console.log('data from get favorite', data)
            console.log('fddfddfd',data.includes('no'))
            if(data==='no')
            {return "no data found"}
            
            else {setFavorites(data)}


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
    console.log('setArticleByAttribute', articleByAttribute)
    const loadMore = () => {
        setNoOfElement(noOfElement + noOfElement)

    }

    const slice = favorites?.slice(0, noOfElement)
    const currentUrl = window.location.href;
    const [disable, setDisable] = useState(false);
    console.log('fav',slice.length)

    return (
        <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>

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
                                                <h1 style={{ color: '#B91736' }}>Favorite List
                                                </h1>
                                            </div>
                                            <br />

                                            <div className="row">
                                                <div class="container">
                                                    <div class="row justify-content-center">

                                                        <div class="col order-last" style={{ display: "flex", flexWrap: "wrap" }} >
                                                            {slice.length !=0 ? 
                                                            slice.map((atrib) => {
                                                                return (
                                                                    <>
                                                                {atrib.article.published === true ?

                                                                    <div class="card card-margin">
                                                                        <div class="card-header no-border">
                                                                            <h5 class="card-title" style={{ textTransform: "uppercase" }}>
                                                                                <b>
                                                                                    {atrib.title}
                                                                                    </b>
                                                                            </h5>
                                                                        </div>
                                                                        <div class="card-body pt-0">
                                                                            <div class="widget-49">
                                                                                <div class="widget-49-title-wrapper">
                                                                                    <div class="widget-49-date-primary">
                                                                                        <span class="widget-49-date-day" >{moment(atrib.article.createdAt).format("DD-MM-YYYY")}</span>
                                                                                    </div>
                                                                                    <div class="widget-49-meeting-info">
                                                                                                <span class="widget-49-pro-title" >
                                                                                                    Writed By <b>
                                                                                                        <span style={{ textTransform: "capitalize" }}>
                                                                                                            {atrib.user.username}
                                                                                                        </span>
                                                                                                    </b>
                                                                                                </span>
                                                                                           
                                                                                    </div>
                                                                                </div>

                                                                                <div className='widget-49-meeting-points'>
                                                                                    <span >{atrib.article.bio} </span>
                                                                                    <br />

                                                                                    <img src={atrib.article.pathFile} alt="" height="140px" width="30px" />

                                                                                    <span></span>
                                                                                    <span class="widget-49-meeting-time">{atrib.article.abstract} abstract</span>
                                                                                    <br />

                                                                                    <span>{atrib.article.keyWords}</span>
                                                                                    <br />
                                                                                    <span> {atrib.article.view[0].count} view(s)</span>
                                                                                </div>
                                                                                <ol class="widget-49-meeting-points">

                                                                                    <span> </span>
                                                                                    <span></span>
                                                                                </ol>
                                                                              

                                                                            <div class="widget-49-meeting-action" >
                                                                                <button className="btn btn-warning"
                                                                                    onClick={
                                                                                        async () => {
                                                                                            {
                                                                                                atrib.article.filepassword.length != 0 ?
                                                                                                <div>
                                                                                                    {replaceModalItem(atrib.article._id)}

                                                                                                </div>
                                                                                                :
                                                                                                history(`/b/${atrib.article._id}`)
                                                                                            }
                                                                                        }}
                                                                                >
                                                                                    View All
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
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                        </div>
                                                                         : <></>}
                                                                        </>
                                                        )
                                                            })
                                                            : "No data "
                                                        }
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <button className="btn btn-dark " style={{ textAlign: "center" }} onClick={loadMore}  >
                                                    Show More Articles
                                                </button>
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


        </div >)
}
