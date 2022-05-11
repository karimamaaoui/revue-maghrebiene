import React from 'react'
import NavbarList from '../adminPanel/views/navbarList'
import SidebarScreen from '../sideBar/sidebarScreen'
import './feedback.css'
import ReactStars from "react-rating-stars-component";



export default function Feedback() {
    return (
        <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
            <div className="main-body" >
                <div className="row gutters-sm" style={{ maxWidth: "100%" }}>
                    <SidebarScreen />
                    <div className="col-md-8" style={{ marginTop: '50px' }}>
                        <div className='container'>
                            <div id="content" className="p-6 p-md-10 pt-12">
                                <NavbarList />
                                <div className="" style={{ backgroundColor: 'white' }}>
                                    <div class="card-body">
                                    <div className="row">
                                                <h1 style={{ color: 'rgb(151, 213, 230)' }}>Feedback::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::</h1>
                                            </div>
                                                  
                                        <div class="mb-4 p-4 text-center">
                                            <h4 class="mb-0">Your feedback help us to improve.</h4>
                                            <small class="px-3">Please let us know about your experience.</small>
                                            <div class="d-flex flex-row justify-content-center mt-2">
                                                {/* <img src="https://img.icons8.com/emoji/48/000000/angry-face-emoji--v2.png" />
                                                <img src="https://img.icons8.com/fluent/48/000000/sad.png" />
                                                <img src="https://img.icons8.com/color/48/000000/happy.png" />
                                                <img src="https://img.icons8.com/emoji/48/000000/smiling-face.png" />
                                                <img src="https://img.icons8.com/color/48/000000/lol.png" /> */}
                                                <ReactStars
                                                    name="stars"
                                                    count={5}
                                                    size={40}
                                                    activeColor="#ffd700"
                                                    emptyIcon={<i className="far fa-star"></i>}
                                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                    fullIcon={<i className="fa fa-star"></i>}
                                                    className="form-controlfeed"
                                                />
                                      
                                              </div>
                                              

                                        <div className="page-content" style={{ background: '#fff' }}>
                                            <div className="form-content col-lg-6">
                                                <form className="form-detail">
                                                    <div className="form-row">
                                                        <textarea class="form-controlfeed" rows="4" placeholder="Message"></textarea>

                                                        <i className="fas fa-envelope"></i>
                                                    </div>
                                                    <div className="form-row-last">
                                                        <button type="submit" class="btn btn-primary mt-3"><span>Send feedback</span></button>
                                                    </div>
                                                    <p class="mt-3">Continue without sending feedback</p>

                                                </form>
                                            </div>
                                        </div>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div >

    )
}
