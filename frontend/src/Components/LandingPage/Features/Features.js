import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { VscTools } from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllFeedback } from '../../../redux/Actions/feedbackActions';
import './feature.css'

export default function Features() {
    const dispatch = useDispatch();
    const history = useNavigate();

    const feedbackList = useSelector((state) => state.feedbackList);
    const { loadingGetAllFeedback, errorGetAllFeedback, feedbacks } = feedbackList;



    useEffect(() => {

        dispatch(getAllFeedback())
        console.log('feedbacks', feedbacks);

    }, []);


    return (
        <div class="container">
        <div className='row mb-2 '>
            <div className="col-md-15 offset-md">
                <div className='cardD'>
                    <div class="sign-up-container">
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {feedbacks?.map((fe, index) => {
                            return (
                                <div key={index}>

                                    <div className='icon'>

                                        <VscTools />
                                    </div>
                                    {console.log(fe.user)}



                                    {fe.user.map((u, index) => {
                                        return (
                                            <>
                                                <h5 className='mt-4 mb-3'>
                                                    {u.username}
                                                </h5>
                                            </>
                                        )
                                    })}

                                    <p >
                                        {fe.message}

                                    </p>
                                    <br />
                                    <div style={{ display: "inline-flex" }}>
                                        {fe.star}<img src='https://th.bing.com/th/id/R.2302034bd53bd826ceea20e837f883b1?rik=CEJhbZUU6AGaPQ&pid=ImgRaw&r=0'
                                            style={{ height: '20px' }} />

                                    </div>
                                </div>

                            )
                        })}
                    </div>
                    </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
