import axios from 'axios';
import { use } from 'i18next'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { listAttribute } from '../../redux/Actions/attributeActions';
import { listTypes } from '../../redux/Actions/typeAction';
import NavbarList from '../adminPanel/views/navbarList';
import SidebarScreen from '../sideBar/sidebarScreen';
import './correction.css'
export default function CorrectionPage() {

    const id = useParams();
    const readId = id.id
    const dispatch = useDispatch();
    const history = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [getAllText, setGetAllText] = useState('')

    const [datas, setDatas] = useState({})

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



    useEffect(() => {
        if (!userInfo) {
            history("/");
        }
        else {
            handleGetSingleArticle();
            handleRead();
            // handleView(readId)
        }

    },
        [
            dispatch,
            history,
            userInfo,


        ]);

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
                                            <h1 style={{ color: '#B91736' }}>Article</h1>
                                        </div>
                                        <br />
                                        <div className="row ">

                                            <div class="wrapper bg-white rounded shadow">
                                                <div class="h2 text-center fw-bold">
                                                    Checking an Article
                                                </div>
                                                <br />
                                                <div class="accordion accordion-flush border-top border-start border-end" id="myAccordion">
                                                    <div class="accordion-item"> <h2 class="accordion-header" id="flush-headingOne">
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
                                                                                                <textarea class="form-control" placeholder="write a comment..."
                                                                                                    type="text"
                                                                                                    name='text'

                                                                                                    rows="3"></textarea>
                                                                                                <br />
                                                                                                <div className="" >

                                                                                                    <div >

                                                                                                        <button class="pull-right"
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
                                                                                                <textarea class="form-control" placeholder="write a comment..."
                                                                                                    type="text"
                                                                                                    name='text'

                                                                                                    rows="3"></textarea>
                                                                                                <br />
                                                                                                <div className="" >

                                                                                                    <div >

                                                                                                        <button class="pull-right"
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
                                                        </div>
                                                    </div>
                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header" id="flush-headingOne">
                                                            {console.log('datas.rulesChecked',datas.rulesChecked)}
                                                            {/* {datas.rulesChecked.map((rule, key) => {
                                                                return (
                                                                    <div>
                                                                        <button class="accordion-button collapsed border-0"
                                                                            type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false"
                                                                            aria-controls="flush-collapseThree">
                                                                                {rule.label}
                                                                        </button>

                                                                    </div>
                                                                )
                                                            })} */}
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

                                                                                                Editor Panel
                                                                                            </div>
                                                                                            <div class="panel-body">
                                                                                                <textarea class="form-control" placeholder="write a comment..."
                                                                                                    type="text"
                                                                                                    name='text'

                                                                                                    rows="3"></textarea>
                                                                                                <br />
                                                                                                <div className="" >

                                                                                                    <div >

                                                                                                        <button class="pull-right"
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

                                                                                                Editor Panel
                                                                                            </div>
                                                                                            <div class="panel-body">
                                                                                                <textarea class="form-control" placeholder="write a comment..."
                                                                                                    type="text"
                                                                                                    name='text'

                                                                                                    rows="3"></textarea>
                                                                                                <br />
                                                                                                <div className="" >

                                                                                                    <div >

                                                                                                        <button class="pull-right"
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
                                                                                                <textarea class="form-control" placeholder="write a comment..."
                                                                                                    type="text"
                                                                                                    name='text'

                                                                                                    rows="3"></textarea>
                                                                                                <br />
                                                                                                <div className="" >

                                                                                                    <div >

                                                                                                        <button class="pull-right"
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
                                                                                                <textarea class="form-control" placeholder="write a comment..."
                                                                                                    type="text"
                                                                                                    name='text'

                                                                                                    rows="3"></textarea>
                                                                                                <br />
                                                                                                <div className="" >

                                                                                                    <div >

                                                                                                        <button class="pull-right"
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
