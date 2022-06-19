import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllArticles, getRandomArticle } from '../../redux/Actions/articleActions';
import NavbarList from '../adminPanel/views/navbarList'
import SidebarScreen from '../sideBar/sidebarScreen'
import './HOME.css'
import ReadMoreReact from 'read-more-react';
import BG1 from "../../assets/Bannière Orange de Restaurant Reprise d'Activité Format Paysage.png"
import BG2 from '../../assets/Jaune Professionnel Dégradé Application Développement Bannière Paysage.png'
import BG3 from '../../assets/Bannière.png'

export default function PageAccueil() {

    const dispatch = useDispatch();
    const history = useNavigate();


    const RandomArticle = useSelector((state) => state.RandomArticle);
    const { loadingGetAllUser, errorGetAllUser, articles } = RandomArticle;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;


    // useEffect(() => {
    //     dispatch(getRandomArticle());
    //     console.log("articles", getRandomArticle)

    //     if (!userInfo) {
    //         history.push("/");
    //     }
    // }, [
    //     dispatch,
    //     history,
    //     userInfo,
    // ]);


    return (
        <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
            <div className="main-body" >
                <div className="row gutters-sm" style={{ maxWidth: "100%" }}>
                    <SidebarScreen />
                    <div className="col-md-8" style={{ marginTop: '50px' }}>

                        <div className='container'>

                            <div id="content" className="">
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
                              </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
