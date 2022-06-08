import moment from 'moment';
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllArticlePaginate, getAllArticles } from '../../redux/Actions/articleActions';
import NavbarList from "../adminPanel/views/navbarList";
import SidebarScreen from "../sideBar/sidebarScreen";
import './RepondingToArticle.css'


import Accepter from '../../assets/accepter.png'
import Loading from '../../assets/loading.jpg'

import Refuser from '../../assets/refuser.png'
import axios from 'axios';
import Swal from 'sweetalert2';



export default function RepondingToArticle() {


    const dispatch = useDispatch();
    const history = useNavigate();
    const getAllArticle = useSelector((state) => state.getAllArticle);
    const { loadingGetAllUser, errorGetAllUser, articles } = getAllArticle;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

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

    ]);
   

    const handlePageClick = (data) => {

        console.log("efefef", data.selected);
        let currentPage = data.selected + 1;
        dispatch(getAllArticlePaginate(currentPage));
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", currentPage);

    }


    return (
        <div>

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

                                                <div class="padding">

                                                </div>
                                                {articles?.map((tdata, index) => {


                                                    return (

                                                        <div class="row" key={index}>

                                                            <div class="col-md-12">

                                                                <ul class="list-group fa-padding">
                                                                    <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                                        <div className='col-12'>
                                                                            <button type="button" class="pull-right"
                                                                                style={{ backgroundColor: '#FEE5CF', border: 'none', borderRadius: '12px', padding: '5px' }}
                                                                                data-toggle="modal"
                                                                                data-target="#newIssue"
                                                                                onClick={() => {
                                                                                    history(`/correction/${tdata._id}`)
                                                                                }}> Correct</button>
                                                                        </div>
                                                                        <br/>
                                                                        
                                                                        <div className='row'>
                                                                        <div className='col'> 
                                                                        <div class="media">
                                                                            <i class="fa fa-file-o pull-left"></i>

                                                                            <div class="media-body" >

                                                                                <strong >Title : {tdata.title}</strong>
                                                                                <br />
                                                                                <span >
                                                                                    Status :
                                                                                    {tdata.status === "loading" ?
                                                                                        <div style={{ display: "inline-flex" }}>
                                                                                            <img src={Loading}
                                                                                                style={{ height: '20px', }} />
                                                                                        </div>
                                                                                        : tdata.status === "accepted" ?

                                                                                            <div style={{ display: "inline-flex" }}>
                                                                                                <img src={Accepter}
                                                                                                    style={{ height: '20px' }} />
                                                                                            </div>
                                                                                            :
                                                                                            <div style={{ display: "inline-flex" }}>
                                                                                                <img src={Refuser}
                                                                                                    style={{ height: '20px' }} />
                                                                                            </div>


                                                                                    }




                                                                                </span>
                                                                                {tdata.authors?.map((a, key) => {
                                                                                    return (
                                                                                        <div key={key}>

                                                                                            <p class="info">Writted by {a.username}
                                                                                            </p>
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                                <p>
                                                                                    keyWords : {tdata.keyWords}
                                                                                    <br />
                                                                                    <br />  CreatedAt :{moment(tdata.createdAt).format("DD-MM-YYYY HH:mm:ss")}  </p>

                                                                            </div>
                                                                        </div>
                                                                        </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>

                                                            </div>
                                                        </div>
                                                    )
                                                })}


                                            </div>
                                        </div>

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
