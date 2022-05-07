import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllArticles, getRandomArticle } from '../../redux/Actions/articleActions';
import NavbarList from '../adminPanel/views/navbarList'
import SidebarScreen from '../sideBar/sidebarScreen'
import './HOME.css'
import ReadMoreReact from 'read-more-react';
    

export default function PageAccueil() {

    const dispatch = useDispatch();
    const history = useNavigate();


    const RandomArticle = useSelector((state) => state.RandomArticle);
    const { loadingGetAllUser, errorGetAllUser, articles } = RandomArticle;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;


    useEffect(() => {
        dispatch(getRandomArticle());
        console.log("articles", getRandomArticle)

        if (!userInfo) {
            history.push("/");
        }
    }, [
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

                            <div id="content" className="">
                                <NavbarList />


                                <div className="col-md-15 offset-md">
                                    <div className='row'>
                                        <div className='col' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", }}>
                                            {articles?.map((tdata, index) => (
                                                <div>

                                                    <div class="card">
                                                        <div class="card-body">
                                                            <div key={index} >
                                                                <h5 class="card-title">{tdata.title}</h5>

                                                                <ReadMoreReact  text={tdata.abstract}
                                                                        min={3}
                                                                        ideal={30}
                                                                        max={100}
                                                                        readMoreText="click here to read more" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            )
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
    )
}
