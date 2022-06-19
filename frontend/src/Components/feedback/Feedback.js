import React, { useEffect, useState } from 'react'
import NavbarList from '../adminPanel/views/navbarList'
import SidebarScreen from '../sideBar/sidebarScreen'
import './feedback.css'
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { addnewFeedback } from '../../redux/Actions/feedbackActions';



export default function Feedback() {

    const dispatch = useDispatch();
    const history = useNavigate();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [star, setStar] = useState(0);
    const [message, setMessage] = useState("");
        


    // const [formData, setFormData] = useState({
    //     star: 0,
    //     message: "",
    //    // user: [userInfo.user._id],

    // });



  const  ratingChanged = (star) => {
        console.log(star);
        setStar(star) 
       // this.state.stars=newRating;        
      };
   // console.log("form",formData)

    const handleSubmit = async(e) => {
        console.log("inside handle submit");
        e.preventDefault();
        const formData = new FormData();
        formData.append('star', star);
        formData.append('message', message);
        dispatch(addnewFeedback(formData));
    }

    useEffect(() => {
        if (!userInfo) {
            history("/");
        }
        // else {
        //     handleSubmit(formData);
        // }
    },
        [
            dispatch,
            history,
            userInfo,
        ]);

    return (
        <>

        <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
            <div className="main-body" >
                <div className="row gutters-sm" style={{ maxWidth: "100%" }}>
                    <SidebarScreen />
                    <div className="col-md-8" style={{ marginTop: '50px' }}>
                        <div className='container'>
                            <div id="content" className="p-6 p-md-10 pt-12">
                                <NavbarList />
                                <div className="card mb-3" style={{ backgroundColor: 'white' }}>
                                    <div class="card-body">
                                        <div className="row">
                                            <h1 style={{ color: '#B91736' }}>Feedback</h1>
                                        </div>

                                        <div class="mb-4 p-4 text-center">
                                            <h4 class="mb-0">Your feedback help us to improve.</h4>
                                            <small class="px-3">Please let us know about your experience.</small>
                                            <div class="d-flex flex-row justify-content-center mt-2">
                                            <form className="form-detail" onSubmit={handleSubmit} >

                                                <ReactStars
                                                    name="stars"
                                                    count={5}
                                                    size={30}
                                                    activeColor="#ffd700"
                                                    emptyIcon={<i className="far fa-star"></i>}
                                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                    fullIcon={<i className="fa fa-star"></i>}
                                                    className="form-controlfeed "
                                                    onChange={ratingChanged}

                                                />
                                                    <div className="page-content" style={{ background: '#fff' }}>
                                                <div className="form-content col-sm-15">
                                                        <div className="row">
                                                            <textarea class="form-controlfeed" rows="4" placeholder="Message"
                                                              onChange={(event) =>
                                                                setMessage( event.target.value )}

                                                            ></textarea>

                                                            <i className="fas fa-envelope"></i>
                                                        </div>
                                                        <br/>
                                                        <div >
                                                            <button className='btn btn-danger' type="submit" ><span>Send feedback</span></button>
                                                        </div>
                                                        <p class="mt-3"><a href="/search">Continue without sending feedback </a></p>

                                                </div>
                                            </div>

                                        </form>

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

    
        </>


    )
}
