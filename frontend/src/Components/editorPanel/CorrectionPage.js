import axios from 'axios';
import { use } from 'i18next'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import NavbarList from '../adminPanel/views/navbarList';
import SidebarScreen from '../sideBar/sidebarScreen';
import FileDownload from "js-file-download"
import toast, { Toaster } from "react-hot-toast";
import { Confirm } from 'react-st-modal';

import './correction.css'
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function CorrectionPage() {

    const id = useParams();
    const readId = id.id
    const dispatch = useDispatch();
    const history = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [getAllText, setGetAllText] = useState('')

    const [datas, setDatas] = useState({})

    // const handleChange = (e) => {
    //     const { articleDecision } = e.target

    //     setFormData(...formData,articleDecision = articleDecision)

    // }
    const handleRead = async () => {

        try {
            return await axios.get(`http://localhost:5000/api/file/get/${readId}`)
                .then((res) => {
                    //     console.log(res.data);
                    setGetAllText(res.data.text);
                    // setPageNumber(res.data.numpages)


                }).catch(err => {
                    console.log(err)
                })
        } catch (err) {
            console.log(err)

        }
    }

    const handleGetSingleArticle = async () => {

        try {
            return await axios.get(`http://localhost:5000/api/file/getsingle/${readId}`)
                .then((res) => {
                    console.log("single article", res.data);
                    setDatas(res.data)


                }).catch(err => {
                    console.log(err)
                })
        } catch (err) {
            console.log(err)

        }
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



    useEffect(() => {
        if (!userInfo) {
            history("/");
        }
        else {
            const callFunction = handleGetSingleArticle();

            handleRead();
            // handleView(readId)
            toast.promise(callFunction, {
                loading: "Process",
                error: "error occurs in data",
                success: "get data successfully...."
            });
        }

    },
        [
            dispatch,
            history,
            userInfo,


        ]);

    const [text, setText] = useState('');

    const [formData, setFormData] = useState({
        articleDecision:"",
    })    


    const makeComment = async (id) => {
        console.log('click on comment')
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,

            },
        };
        let postedBy = userInfo.user._id;

        let user = { text, postedBy }

        return await axios.put(`http://localhost:5000/api/file/review/${id}`, user, config)
            .then((res) => {

                console.log(res.data);
                Swal.fire({
                    title: "Succces!",
                    text: "Comment Added Successfully",
                    icon: 'success',
                    button: "OK!"
                });


                console.log('article => ' + JSON.stringify(user));

            }).catch(err => {
                console.log(err)
            })
    }


    const handlePublish = async (id) => {

    console.log('click on comment',formData)

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,

            },
        };

        return await axios.put(`http://localhost:5000/api/file/validation/${id}`,formData, config)
            .then((res) => {

                console.log(res.data);
                Swal.fire({
                    title: "Succces!",
                    text: "Comment Added Successfully",
                    icon: 'success',
                    button: "OK!"
                });


                console.log('article => ' + JSON.stringify(res.data));

            }).catch(err => {
                console.log(err)
                Swal.fire({
                    title: "Error!",
                    text: "Comment Added Successfully",
                    icon: 'error',
                    button: "OK!"
                });

            })
    }

    return (
        <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
            <div className="main-body">
                <div className="row gutters-sm">
                    <SidebarScreen />
                    <div className="col-md-9" style={{ marginTop: '50px' }}>
                        <div className='container'>


                            <div id="content" className="p-6 p-md-10 pt-12">

                                <NavbarList />

                                <div className="card mb-3">

                                    <div className="card-body">

                                        <div className="row">
                                            <h1 style={{ color: '#B91736' }}>Correct Article</h1>
                                        </div>
                                        <br />
                                        <div className="row ">

                                            <div class="">
                                                <div class="h2 text-center fw-bold">
                                                    Checking an Article
                                                </div>
                                                <br />
                                                <div class="accordion accordion-flush border-top border-start border-end" id="myAccordion">
                                                    <div style={{ float: 'right' }}>
                                                        <Toaster />
                                                    </div>

                                                    <div class="accordion-item">

                                                        <h2 class="accordion-header" id="flush-headingOne">
                                                            <button class="accordion-button collapsed border-0" type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                                Title :  {datas.title}
                                                            </button>
                                                        </h2>
                                                        <div id="flush-collapseOne" class="accordion-collapse collapse border-0"
                                                            aria-labelledby="flush-headingOne" data-bs-parent="#myAccordion">
                                                            <div class="accordion-body p-0">
                                                                <ul class="list-unstyled m-0">
                                                                    <li>
                                                                        <div class="container">
                                                                            <div class="row align-items-start">
                                                                                <div class="col">
                                                                                </div>
                                                                                <div class="col-md-8 col-sm-12">
                                                                                    <div class="comment-wrapper">
                                                                                        <div class="panel panel-info">
                                                                                            <div class="panel-heading">

                                                                                                Editor Panel
                                                                                            </div>
                                                                                            <div class="panel-body">
                                                                                                <textarea class="form-control" placeholder="write a review..."
                                                                                                    type="text"
                                                                                                    name='text'
                                                                                                    onChange={(e) => {
                                                                                                        setText(e.target.value);

                                                                                                    }}

                                                                                                    rows="3"></textarea>
                                                                                                <br />
                                                                                                <div className="" >

                                                                                                    <div >

                                                                                                        <button class="pull-right"
                                                                                                            style={{ borderRadius: "15px", }}>
                                                                                                            <i class="fa fa-send" onClick={
                                                                                                                () => {

                                                                                                                    makeComment(datas._id)
                                                                                                                }}
                                                                                                            >
                                                                                                                Add
                                                                                                            </i>

                                                                                                        </button>

                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="clearfix"></div>
                                                                                                <hr />
                                                                                                <ul class="media-list">
                                                                                                    <li class="media">
                                                                                                        <a href="#" class="pull-left">
                                                                                                            <img src="https://bootdey.com/img/Content/user_1.jpg"
                                                                                                                style={{ height: '40px', width: '40px', borderRadius: '40px' }}
                                                                                                                alt="" class="img-circle" />
                                                                                                        </a>
                                                                                                        <div class="media-body">
                                                                                                        </div>
                                                                                                    </li>
                                                                                                </ul>


                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div class="col">
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header" id="flush-headingOne">
                                                            <button class="accordion-button collapsed border-0" type="button"
                                                                data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo"
                                                                aria-expanded="false" aria-controls="flush-collapseTwo">
                                                                KeyWords :  {datas.keyWords}

                                                            </button>
                                                        </h2>
                                                        <div id="flush-collapseTwo" class="accordion-collapse collapse border-0"
                                                            aria-labelledby="flush-headingOne" data-bs-parent="#myAccordion">
                                                            <div class="accordion-body p-0">
                                                                <ul class="list-unstyled m-0">
                                                                    <li>
                                                                        <div class="container">
                                                                            <div class="row align-items-start">
                                                                                <div class="col">
                                                                                </div>
                                                                                <div class="col-md-8 col-sm-12">
                                                                                    <div class="comment-wrapper">
                                                                                        <div class="panel panel-info">
                                                                                            <div class="panel-heading">

                                                                                                Editor Panel
                                                                                            </div>
                                                                                            <div class="panel-body">
                                                                                                <textarea class="form-control" placeholder="write a review..."
                                                                                                    type="text"
                                                                                                    name='text'
                                                                                                    onChange={(e) => {
                                                                                                        setText(e.target.value);

                                                                                                    }}
                                                                                                    rows="3"></textarea>
                                                                                                <br />
                                                                                                <div className="" >

                                                                                                    <div >

                                                                                                        <button class="pull-right"
                                                                                                            style={{ borderRadius: "15px", }}

                                                                                                            onClick={
                                                                                                                () => {

                                                                                                                    makeComment(datas._id)
                                                                                                                }}>


                                                                                                            <i class="fa fa-send" >

                                                                                                                Add
                                                                                                            </i>

                                                                                                        </button>

                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="clearfix"></div>
                                                                                                <hr />
                                                                                                <ul class="media-list">
                                                                                                    <li class="media">
                                                                                                        <a href="#" class="pull-left">
                                                                                                            <img src="https://bootdey.com/img/Content/user_1.jpg"
                                                                                                                style={{ height: '40px', width: '40px', borderRadius: '40px' }}
                                                                                                                alt="" class="img-circle" />
                                                                                                        </a>
                                                                                                        <div class="media-body">
                                                                                                            <strong style={{ color: 'red' }}>dfdfdfdf</strong>
                                                                                                            <p>
                                                                                                                ssdsdsd;
                                                                                                            </p>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                </ul>


                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div class="col">
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header" id="flush-headingOne">
                                                           </h2>
                                                        <div id="flush-collapseThree"
                                                            class="accordion-collapse collapse border-0" aria-labelledby="flush-headingOne" data-bs-parent="#myAccordion">
                                                            <div class="accordion-body p-0">
                                                                <ul class="list-unstyled m-0">
                                                                    <li>
                                                                        <div class="container">
                                                                            <div class="row align-items-start">
                                                                                <div class="col">
                                                                                </div>
                                                                                <div class="col-md-8 col-sm-12">
                                                                                    <div class="comment-wrapper">
                                                                                        <div class="panel panel-info">
                                                                                            <div class="panel-heading">

                                                                                                Corrector Panel
                                                                                            </div>
                                                                                            <div class="panel-body">
                                                                                                <textarea class="form-control" placeholder="write a review..."
                                                                                                    type="text"
                                                                                                    name='text'
                                                                                                    onChange={(e) => {
                                                                                                        setText(e.target.value);

                                                                                                    }}

                                                                                                    rows="3"></textarea>
                                                                                                <br />
                                                                                                <div className="" >

                                                                                                    <div >

                                                                                                        <button class="pull-right"
                                                                                                            onClick={
                                                                                                                () => {

                                                                                                                    makeComment(datas._id)
                                                                                                                }}


                                                                                                            style={{ borderRadius: "15px", }}>
                                                                                                            <i class="fa fa-send" >
                                                                                                                Add
                                                                                                            </i>

                                                                                                        </button>

                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="clearfix"></div>
                                                                                                <hr />
                                                                                                <ul class="media-list">
                                                                                                    <li class="media">
                                                                                                        <a href="#" class="pull-left">
                                                                                                            <img src="https://bootdey.com/img/Content/user_1.jpg"
                                                                                                                style={{ height: '40px', width: '40px', borderRadius: '40px' }}
                                                                                                                alt="" class="img-circle" />
                                                                                                        </a>
                                                                                                        <div class="media-body">
                                                                                                            <strong style={{ color: 'red' }}>dfdfdfdf</strong>
                                                                                                            <p>
                                                                                                                ssdsdsd;
                                                                                                            </p>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                </ul>


                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div class="col">
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </li>

                                                                </ul>
                                                            </div>
                                                        </div> </div>
                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header" id="flush-headingOne">
                                                            <button class="accordion-button collapsed border-0" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour"
                                                                aria-expanded="false" aria-controls="flush-collapseFour">Abstract : {datas.abstract}
                                                            </button> </h2>
                                                        <div id="flush-collapseFour"
                                                            class="accordion-collapse collapse border-0"
                                                            aria-labelledby="flush-headingOne" data-bs-parent="#myAccordion">
                                                            <div class="accordion-body p-0">
                                                                <ul class="list-unstyled m-0">
                                                                    <li>
                                                                        <div class="container">
                                                                            <div class="row align-items-start">
                                                                                <div class="col">
                                                                                </div>
                                                                                <div class="col-md-8 col-sm-12">
                                                                                    <div class="comment-wrapper">
                                                                                        <div class="panel panel-info">
                                                                                            <div class="panel-heading">

                                                                                                Corrector Panel
                                                                                            </div>
                                                                                            <div class="panel-body">
                                                                                                <textarea class="form-control" placeholder="write a review..."
                                                                                                    type="text"
                                                                                                    name='text'
                                                                                                    onChange={(e) => {
                                                                                                        setText(e.target.value);

                                                                                                    }}

                                                                                                    rows="3"></textarea>
                                                                                                <br />
                                                                                                <div className="" >

                                                                                                    <div >

                                                                                                        <button class="pull-right"
                                                                                                            style={{ borderRadius: "15px", }}>
                                                                                                            <i class="fa fa-send"
                                                                                                                onClick={
                                                                                                                    () => {

                                                                                                                        makeComment(datas._id)
                                                                                                                    }}
                                                                                                            >
                                                                                                                Add
                                                                                                            </i>

                                                                                                        </button>

                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="clearfix"></div>
                                                                                                <hr />
                                                                                                <ul class="media-list">
                                                                                                    <li class="media">
                                                                                                        <a href="#" class="pull-left">
                                                                                                            <img src="https://bootdey.com/img/Content/user_1.jpg"
                                                                                                                style={{ height: '40px', width: '40px', borderRadius: '40px' }}
                                                                                                                alt="" class="img-circle" />
                                                                                                        </a>
                                                                                                        <div class="media-body">
                                                                                                            <strong style={{ color: 'red' }}>dfdfdfdf</strong>
                                                                                                            <p>
                                                                                                                ssdsdsd;
                                                                                                            </p>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                </ul>


                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div class="col">
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </li>
                                                                </ul>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header" id="flush-headingOne">
                                                            <button class="accordion-button 
                       collapsed border-0" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false"
                                                                aria-controls="flush-collapseFive">
                                                                Abbreviations : {datas.abbreviations}

                                                            </button>
                                                        </h2>
                                                        <div id="flush-collapseFive" class="accordion-collapse 
                        collapse border-0" aria-labelledby="flush-headingOne" data-bs-parent="#myAccordion">
                                                            <div class="accordion-body p-0">
                                                                <ul class="list-unstyled m-0">
                                                                    <li>
                                                                        <div class="container">
                                                                            <div class="row align-items-start">
                                                                                <div class="col">
                                                                                </div>
                                                                                <div class="col-md-8 col-sm-12">
                                                                                    <div class="comment-wrapper">
                                                                                        <div class="panel panel-info">
                                                                                            <div class="panel-heading">

                                                                                                Editor Panel
                                                                                            </div>
                                                                                            <div class="panel-body">
                                                                                                <textarea class="form-control" placeholder="write a review..."
                                                                                                    type="text"
                                                                                                    name='text'
                                                                                                    onChange={(e) => {
                                                                                                        setText(e.target.value);

                                                                                                    }}

                                                                                                    rows="3"></textarea>
                                                                                                <br />
                                                                                                <div className="" >

                                                                                                    <div >

                                                                                                        <button class="pull-right"
                                                                                                            style={{ borderRadius: "15px", }}>
                                                                                                            <i class="fa fa-send" onClick={
                                                                                                                () => {

                                                                                                                    makeComment(datas._id)
                                                                                                                }}
                                                                                                            >
                                                                                                                Add
                                                                                                            </i>

                                                                                                        </button>

                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="clearfix"></div>
                                                                                                <hr />
                                                                                                <ul class="media-list">
                                                                                                    <li class="media">
                                                                                                        <a href="#" class="pull-left">
                                                                                                            <img src="https://bootdey.com/img/Content/user_1.jpg"
                                                                                                                style={{ height: '40px', width: '40px', borderRadius: '40px' }}
                                                                                                                alt="" class="img-circle" />
                                                                                                        </a>
                                                                                                        <div class="media-body">
                                                                                                            <strong style={{ color: 'red' }}>dfdfdfdf</strong>
                                                                                                            <p>
                                                                                                                ssdsdsd;
                                                                                                            </p>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                </ul>


                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div class="col">
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header"
                                                            id="flush-headingOne">
                                                            <button class="accordion-button collapsed border-0" type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                                                                filepassword : {datas.filepassword} </button>
                                                        </h2>
                                                        <div id="flush-collapseSix" class="accordion-collapse collapse border-0" aria-labelledby="flush-headingOne"
                                                            data-bs-parent="#myAccordion">
                                                            <div class="accordion-body p-0">
                                                                <ul class="list-unstyled m-0">
                                                                    <li>
                                                                        <div class="container">
                                                                            <div class="row align-items-start">
                                                                                <div class="col">
                                                                                </div>
                                                                                <div class="col-md-8 col-sm-12">
                                                                                    <div class="comment-wrapper">
                                                                                        <div class="panel panel-info">
                                                                                            <div class="panel-heading">

                                                                                                Editor Panel
                                                                                            </div>
                                                                                            <div class="panel-body">
                                                                                                <textarea class="form-control" placeholder="write a review..."
                                                                                                    type="text"
                                                                                                    name='text'
                                                                                                    onChange={(e) => {
                                                                                                        setText(e.target.value);

                                                                                                    }}

                                                                                                    rows="3"></textarea>
                                                                                                <br />
                                                                                                <div className="" >

                                                                                                    <div >

                                                                                                        <button class="pull-right"
                                                                                                            style={{ borderRadius: "15px", }}>
                                                                                                            <i class="fa fa-send" onClick={
                                                                                                                () => {

                                                                                                                    makeComment(datas._id)
                                                                                                                }}
                                                                                                            >
                                                                                                                Add
                                                                                                            </i>

                                                                                                        </button>

                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="clearfix"></div>
                                                                                                <hr />
                                                                                                <ul class="media-list">
                                                                                                    <li class="media">
                                                                                                        <a href="#" class="pull-left">
                                                                                                            <img src="https://bootdey.com/img/Content/user_1.jpg"
                                                                                                                style={{ height: '40px', width: '40px', borderRadius: '40px' }}
                                                                                                                alt="" class="img-circle" />
                                                                                                        </a>
                                                                                                        <div class="media-body">
                                                                                                            <strong style={{ color: 'red' }}>dfdfdfdf</strong>
                                                                                                            <p>
                                                                                                                ssdsdsd;
                                                                                                            </p>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                </ul>


                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div class="col">
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </li>

                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header"
                                                            id="flush-headingOne">
                                                            {datas.attributesAticle?.map((attribute, key) => {
                                                                return (
                                                                    <div key={key}>


                                                                        <button class="accordion-button collapsed border-0" type="button" data-bs-toggle="collapse"
                                                                            data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
                                                                            Theme : {attribute.label} </button>
                                                                    </div>
                                                                )
                                                            })}
                                                        </h2>
                                                        <div id="flush-collapseSeven" class="accordion-collapse collapse border-0" aria-labelledby="flush-headingOne"
                                                            data-bs-parent="#myAccordion">
                                                            <div class="accordion-body p-0">
                                                                <ul class="list-unstyled m-0">
                                                                    <li>
                                                                        <div class="container">
                                                                            <div class="row align-items-start">
                                                                                <div class="col">
                                                                                </div>
                                                                                <div class="col-md-8 col-sm-12">
                                                                                    <div class="comment-wrapper">
                                                                                        <div class="panel panel-info">
                                                                                            <div class="panel-heading">

                                                                                                Editor Panel
                                                                                            </div>
                                                                                            <div class="panel-body">
                                                                                                <textarea class="form-control" placeholder="write a review..."
                                                                                                    type="text"
                                                                                                    name='text'
                                                                                                    onChange={(e) => {
                                                                                                        setText(e.target.value);

                                                                                                    }}

                                                                                                    rows="3"></textarea>
                                                                                                <br />
                                                                                                <div className="" >

                                                                                                    <div >

                                                                                                        <button class="pull-right"
                                                                                                            style={{ borderRadius: "15px", }}>
                                                                                                            <i class="fa fa-send" onClick={
                                                                                                                () => {

                                                                                                                    makeComment(datas._id)
                                                                                                                }}
                                                                                                            >
                                                                                                                Add
                                                                                                            </i>

                                                                                                        </button>

                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="clearfix"></div>
                                                                                                <hr />
                                                                                                <ul class="media-list">
                                                                                                    <li class="media">
                                                                                                        <a href="#" class="pull-left">
                                                                                                            <img src="https://bootdey.com/img/Content/user_1.jpg"
                                                                                                                style={{ height: '40px', width: '40px', borderRadius: '40px' }}
                                                                                                                alt="" class="img-circle" />
                                                                                                        </a>
                                                                                                        <div class="media-body">
                                                                                                            <strong style={{ color: 'red' }}>dfdfdfdf</strong>
                                                                                                            <p>
                                                                                                                ssdsdsd;
                                                                                                            </p>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                </ul>


                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div class="col">
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </li>

                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>



                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header"
                                                            id="flush-headingOne">
                                                            {datas.authors?.map((author, key) => {
                                                                return (
                                                                    <div key={key}>


                                                                        <button class="accordion-button collapsed border-0" type="button" data-bs-toggle="collapse"
                                                                            data-bs-target="#flush-collapseEight" aria-expanded="false" aria-controls="flush-collapseEight">
                                                                            Author Name: {author.username} Author Email : {author.email} </button>
                                                                    </div>
                                                                )
                                                            })}
                                                        </h2>
                                                        <div id="flush-collapseEight" class="accordion-collapse collapse border-0" aria-labelledby="flush-headingOne"
                                                            data-bs-parent="#myAccordion">
                                                            <div class="accordion-body p-0">
                                                                <ul class="list-unstyled m-0">
                                                                    <li>
                                                                        <div class="container">
                                                                            <div class="row align-items-start">
                                                                                <div class="col">
                                                                                </div>
                                                                                <div class="col-md-8 col-sm-12">
                                                                                    <div class="comment-wrapper">
                                                                                        <div class="panel panel-info">
                                                                                            <div class="panel-heading">

                                                                                                Editor Panel
                                                                                            </div>
                                                                                            <div class="panel-body">
                                                                                                <textarea class="form-control" placeholder="write a review..."
                                                                                                    type="text"
                                                                                                    name='text'
                                                                                                    onChange={(e) => {
                                                                                                        setText(e.target.value);

                                                                                                    }}

                                                                                                    rows="3"></textarea>
                                                                                                <br />
                                                                                                <div className="" >

                                                                                                    <div >

                                                                                                        <button class="pull-right"
                                                                                                            style={{ borderRadius: "15px", }}>
                                                                                                            <i class="fa fa-send" onClick={
                                                                                                                () => {

                                                                                                                    makeComment(datas._id)
                                                                                                                }}
                                                                                                            >
                                                                                                                Add
                                                                                                            </i>

                                                                                                        </button>

                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="clearfix"></div>
                                                                                                <hr />
                                                                                                <ul class="media-list">
                                                                                                    <li class="media">
                                                                                                        <a href="#" class="pull-left">
                                                                                                            <img src="https://bootdey.com/img/Content/user_1.jpg"
                                                                                                                style={{ height: '40px', width: '40px', borderRadius: '40px' }}
                                                                                                                alt="" class="img-circle" />
                                                                                                        </a>
                                                                                                        <div class="media-body">
                                                                                                            <strong style={{ color: 'red' }}>dfdfdfdf</strong>
                                                                                                            <p>
                                                                                                                ssdsdsd;
                                                                                                            </p>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                </ul>


                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div class="col">
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </li>

                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header"
                                                            id="flush-headingOne">

                                                            <button class="accordion-button collapsed border-0" type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#flush-collapseNine" aria-expanded="false" aria-controls="flush-collapseNine">
                                                                Image : {datas.imagename}
                                                                <br /> {'   '}
                                                                <div className='col-2'>
                                                                    <img src={datas.pathFile} alt="" style={{ height: '85px', width: '65px' }} />
                                                                </div>
                                                            </button>
                                                        </h2>
                                                        <div id="flush-collapseNine" class="accordion-collapse collapse border-0" aria-labelledby="flush-headingOne"
                                                            data-bs-parent="#myAccordion">
                                                            <div class="accordion-body p-0">
                                                                <ul class="list-unstyled m-0">
                                                                    <li>
                                                                        <div class="container">
                                                                            <div class="row align-items-start">
                                                                                <div class="col">
                                                                                </div>
                                                                                <div class="col-md-8 col-sm-12">
                                                                                    <div class="comment-wrapper">
                                                                                        <div class="panel panel-info">
                                                                                            <div class="panel-heading">

                                                                                                Editor Panel
                                                                                            </div>
                                                                                            <div class="panel-body">
                                                                                                <textarea class="form-control" placeholder="write a review..."
                                                                                                    type="text"
                                                                                                    name='text'
                                                                                                    onChange={(e) => {
                                                                                                        setText(e.target.value);

                                                                                                    }}

                                                                                                    rows="3"></textarea>
                                                                                                <br />
                                                                                                <div className="" >

                                                                                                    <div >

                                                                                                        <button class="pull-right"
                                                                                                            style={{ borderRadius: "15px", }}>
                                                                                                            <i class="fa fa-send" onClick={
                                                                                                                () => {

                                                                                                                    makeComment(datas._id)
                                                                                                                }}
                                                                                                            >
                                                                                                                Add
                                                                                                            </i>

                                                                                                        </button>

                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="clearfix"></div>
                                                                                                <hr />
                                                                                                <ul class="media-list">
                                                                                                    <li class="media">
                                                                                                        <a href="#" class="pull-left">
                                                                                                            <img src="https://bootdey.com/img/Content/user_1.jpg"
                                                                                                                style={{ height: '40px', width: '40px', borderRadius: '40px' }}
                                                                                                                alt="" class="img-circle" />
                                                                                                        </a>
                                                                                                        <div class="media-body">
                                                                                                            <strong style={{ color: 'red' }}>dfdfdfdf</strong>
                                                                                                            <p>
                                                                                                                ssdsdsd;
                                                                                                            </p>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                </ul>


                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div class="col">
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </li>

                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header"
                                                            id="flush-headingOne">
                                                            {datas.rulesChecked?.map((rule, key) => {
                                                                return (
                                                                    <div key={key}>
                                                                        <button class="accordion-button collapsed border-0" type="button" data-bs-toggle="collapse"
                                                                            data-bs-target="#flush-collapseTen" aria-expanded="false" aria-controls="flush-collapseTen">
                                                                            Rule Checked :
                                                                            {
                                                                                rule.label
                                                                            }

                                                                        </button>
                                                                    </div>
                                                                )
                                                            })}
                                                        </h2>
                                                        <div id="flush-collapseTen" class="accordion-collapse collapse border-0" aria-labelledby="flush-headingOne"
                                                            data-bs-parent="#myAccordion">
                                                            <div class="accordion-body p-0">
                                                                <ul class="list-unstyled m-0">
                                                                    <li>
                                                                        <div class="container">
                                                                            <div class="row align-items-start">
                                                                                <div class="col">
                                                                                </div>
                                                                                <div class="col-md-8 col-sm-12">
                                                                                    <div class="comment-wrapper">
                                                                                        <div class="panel panel-info">
                                                                                            <div class="panel-heading">

                                                                                                Editor Panel
                                                                                            </div>
                                                                                            <div class="panel-body">
                                                                                                <textarea class="form-control" placeholder="write a review..."
                                                                                                    type="text"
                                                                                                    name='text'
                                                                                                    onChange={(e) => {
                                                                                                        setText(e.target.value);

                                                                                                    }}

                                                                                                    rows="3"></textarea>
                                                                                                <br />
                                                                                                <div className="" >

                                                                                                    <div >

                                                                                                        <button class="pull-right"
                                                                                                            style={{ borderRadius: "15px", }}>
                                                                                                            <i class="fa fa-send" onClick={
                                                                                                                () => {

                                                                                                                    makeComment(datas._id)
                                                                                                                }}
                                                                                                            >
                                                                                                                Add
                                                                                                            </i>

                                                                                                        </button>

                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="clearfix"></div>
                                                                                                <hr />
                                                                                                <ul class="media-list">
                                                                                                    <li class="media">
                                                                                                        <a href="#" class="pull-left">
                                                                                                            <img src="https://bootdey.com/img/Content/user_1.jpg"
                                                                                                                style={{ height: '40px', width: '40px', borderRadius: '40px' }}
                                                                                                                alt="" class="img-circle" />
                                                                                                        </a>
                                                                                                        <div class="media-body">
                                                                                                            <strong style={{ color: 'red' }}>dfdfdfdf</strong>
                                                                                                            <p>
                                                                                                                ssdsdsd;
                                                                                                            </p>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                </ul>


                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div class="col">
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </li>

                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header"
                                                            id="flush-headingOne">
                                                            {datas.typeArticle?.map((type, key) => {
                                                                return (
                                                                    <div key={key}>


                                                                        <button class="accordion-button collapsed border-0" type="button" data-bs-toggle="collapse"
                                                                            data-bs-target="#flush-collapseEleven" aria-expanded="false" aria-controls="flush-collapseEleven">
                                                                            Type : {type.label} </button>
                                                                    </div>
                                                                )
                                                            })}
                                                        </h2>
                                                        <div id="flush-collapseEleven" class="accordion-collapse collapse border-0" aria-labelledby="flush-headingOne"
                                                            data-bs-parent="#myAccordion">
                                                            <div class="accordion-body p-0">
                                                                <ul class="list-unstyled m-0">
                                                                    <li>
                                                                        <div class="container">
                                                                            <div class="row align-items-start">
                                                                                <div class="col">
                                                                                </div>
                                                                                <div class="col-md-8 col-sm-12">
                                                                                    <div class="comment-wrapper">
                                                                                        <div class="panel panel-info">
                                                                                            <div class="panel-heading">

                                                                                                Editor Panel
                                                                                            </div>
                                                                                            <div class="panel-body">
                                                                                                <textarea class="form-control" placeholder="write a review..."
                                                                                                    type="text"
                                                                                                    name='text'
                                                                                                    onChange={(e) => {
                                                                                                        setText(e.target.value);

                                                                                                    }}

                                                                                                    rows="3"></textarea>
                                                                                                <br />
                                                                                                <div className="" >

                                                                                                    <div >

                                                                                                        <button class="pull-right"
                                                                                                            style={{ borderRadius: "15px", }}>
                                                                                                            <i class="fa fa-send" onClick={
                                                                                                                () => {

                                                                                                                    makeComment(datas._id)
                                                                                                                }}
                                                                                                            >
                                                                                                                Add
                                                                                                            </i>

                                                                                                        </button>

                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="clearfix"></div>
                                                                                                <hr />
                                                                                                <ul class="media-list">
                                                                                                    <li class="media">
                                                                                                        <a href="#" class="pull-left">
                                                                                                            <img src="https://bootdey.com/img/Content/user_1.jpg"
                                                                                                                style={{ height: '40px', width: '40px', borderRadius: '40px' }}
                                                                                                                alt="" class="img-circle" />
                                                                                                        </a>
                                                                                                        <div class="media-body">
                                                                                                            <strong style={{ color: 'red' }}>dfdfdfdf</strong>
                                                                                                            <p>
                                                                                                                ssdsdsd;
                                                                                                            </p>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                </ul>


                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div class="col">
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </li>

                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header"
                                                            id="flush-headingOne">
                                                            {datas.multiple_files?.map((file, key) => {
                                                                return (
                                                                    <div key={key}>


                                                                        <button class="accordion-button collapsed border-0" type="button" data-bs-toggle="collapse"
                                                                            data-bs-target="#flush-collapseTwelve" aria-expanded="false" aria-controls="flush-collapseTwelve">
                                                                            File  : {file.name}


                                                                        </button>
                                                                        <button type='submit' className='btn btn-danger'
                                                                            onClick={() => handleDownload(datas._id)}>
                                                                            download
                                                                        </button>

                                                                    </div>
                                                                )
                                                            })}
                                                        </h2>
                                                        <div id="flush-collapseTwelve" class="accordion-collapse collapse border-0" aria-labelledby="flush-headingOne"
                                                            data-bs-parent="#myAccordion">
                                                            <div class="accordion-body p-0">
                                                                <ul class="list-unstyled m-0">
                                                                    <li>
                                                                        <div class="container">
                                                                            <div class="row align-items-start">
                                                                                <div class="col">
                                                                                </div>
                                                                                <div class="col-md-8 col-sm-12">
                                                                                    <div class="comment-wrapper">
                                                                                        <div class="panel panel-info">
                                                                                            <div class="panel-heading">

                                                                                                Editor Panel
                                                                                            </div>
                                                                                            <div class="panel-body">
                                                                                                <textarea class="form-control" placeholder="write a review..."
                                                                                                    type="text"
                                                                                                    name='text'
                                                                                                    onChange={(e) => {
                                                                                                        setText(e.target.value);

                                                                                                    }}

                                                                                                    rows="3"></textarea>
                                                                                                <br />
                                                                                                <div className="" >

                                                                                                    <div >

                                                                                                        <button class="pull-right btn btn-danger"
                                                                                                            style={{ borderRadius: "15px", }}>
                                                                                                            <i class="fa fa-send" onClick={
                                                                                                                () => {

                                                                                                                    makeComment(datas._id)
                                                                                                                }}
                                                                                                            >
                                                                                                                Add
                                                                                                            </i>

                                                                                                        </button>

                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="clearfix"></div>
                                                                                                <hr />
                                                                                                <ul class="media-list">
                                                                                                    <li class="media">
                                                                                                        <a href="#" class="pull-left">
                                                                                                            <img src="https://bootdey.com/img/Content/user_1.jpg"
                                                                                                                style={{ height: '40px', width: '40px', borderRadius: '40px' }}
                                                                                                                alt="" class="img-circle" />
                                                                                                        </a>
                                                                                                        <div class="media-body">
                                                                                                            <strong style={{ color: 'red' }}>dfdfdfdf</strong>
                                                                                                            <p>
                                                                                                                ssdsdsd;
                                                                                                            </p>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                </ul>


                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div class="col">
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </li>

                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>



                                                </div>
                                                <br />
                                                <div style={{ float: 'right' }}>

                                                    <Button className='btn btn-warning' href={`/respond`}>
                                                        Return
                                                    </Button>

                                                    {' '}
{/* 
                                                    <Button variant="outline-warning"
                                                        className="mx-2"
                                                        onClick={async () => {

                                                            const result = await Confirm('Are you sure you want to delete this one',
                                                                'Publish Сonfirmation');
                                                            if (result) {
                                                                handlePublish(readId)
                                                            } else {
                                                                history(`/respond`);
                                                            }
                                                        }}
                                                    >
                                                        <i class="bi bi-trash3"></i>
                                                    </Button> */}
                                                    <Button type="checkbox"
                                                        defaultChecked={formData.articleDecision}
                                                        onClick={async () => {

                                                            const result = await Confirm('Are you sure you want to delete this one',
                                                                'Publish Сonfirmation');
                                                            if (result) {
                                                                setFormData({ ...formData, articleDecision: "true" });
        
                                                                handlePublish(readId)
                                                            } else {
                                                                history(`/respond`);
                                                            }
                                                        }}
                                                         > Finish</Button>
                                                   


                                                    {/* <Button href={`/arti/${readId}`}>
                                                        Finish
                                                    </Button> */}

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
