import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getArticleByAttribute } from '../../redux/Actions/articleActions'
import NavbarList from '../adminPanel/views/navbarList'
import SidebarScreen from '../sideBar/sidebarScreen'
import './searchwith.css';
import moment from 'moment'

import First from '../../assets/first.jpg'

export default function SearchWithAttribute() {
    const dispatch = useDispatch();
    const history = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [articleByAttribute, setArticleByAttribute] = useState([]);
    const getAllArticle = useSelector((state) => state.getAllArticle);
    const { loadingGetAllArticle, errorGetAllArticle, articles } = getAllArticle;
    const [attributeName, setAttributeName] = useState('')

    const id = useParams();
    const updatedAttributeIds = id.id

    useEffect(async () => {
        //dispatch(getArticleByAttribute(updatedAttributeIds));
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get(`http://localhost:5000/api/file/getarticle/${updatedAttributeIds}`, config);
            console.log('data from get attribtue', data.map((d)=>{
                d.attributesAticle.map((atr)=>{
                    setAttributeName(atr.label)
                })
            }))
            setArticleByAttribute(data)

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
                                            <h1 style={{ color: '#B91736' }}>Search With Theme:::::::::::::::::::::::::::::::::::::::::::::
                                            </h1>   
                                        </div>
                                        <br />

                                        <h4 style={{ color: '#B91736' }}>{articleByAttribute.length} Article(s) Found {attributeName}</h4>
                                        <div className="row">
                                            <div class="container">
                                                <div class="row justify-content-center">

                                                    <div class="col order-last" style={{ display: "flex", flexWrap: "wrap" }} >
                                                        {articleByAttribute?.map((atrib) => {
                                                            return (

                                                                <div class="card card-margin">
                                                                    <div class="card-header no-border">
                                                                        <h5 class="card-title" style={{ textTransform: "uppercase" }}>
                                                                            <b>
                                                                                {atrib.title}</b>
                                                                        </h5>
                                                                    </div>
                                                                    <div class="card-body pt-0">
                                                                        <div class="widget-49">
                                                                            <div class="widget-49-title-wrapper">
                                                                                <div class="widget-49-date-primary">
                                                                                    <span class="widget-49-date-day" >{moment(atrib.createdAt).format("DD-MM-YYYY")}</span>
                                                                                </div>
                                                                                <div class="widget-49-meeting-info">
                                                                                    {atrib.authors.map((auteur) => {
                                                                                        return (
                                                                                            <span class="widget-49-pro-title" >
                                                                                                Writed By <b>
                                                                                                    <span style={{ textTransform: "capitalize" }}>
                                                                                                        {auteur.username}
                                                                                                    </span>
                                                                                                </b>
                                                                                            </span>
                                                                                        )
                                                                                    })}
                                                                                </div>
                                                                            </div>

                                                                            <div className='widget-49-meeting-points'>
                                                                                <span >{atrib.bio} </span>
                                                                                <br />
                                                                                
                                                                                <img src={atrib.pathFile} alt="" height="140px" width="30px" />

                                                                                <span></span>
                                                                                <span class="widget-49-meeting-time">{atrib.abstract} abstract</span>
                                                                                <br />

                                                                                <span>{atrib.keyWords}</span>
                                                                            </div>
                                                                            <ol class="widget-49-meeting-points">

                                                                                <span> </span>
                                                                                <span></span>
                                                                            </ol>
                                                                            <div class="widget-49-meeting-action">
                                                                                <a href="#" class="btn btn-sm btn-flash-border-primary">View All</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                        }

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


        </div>)
}
