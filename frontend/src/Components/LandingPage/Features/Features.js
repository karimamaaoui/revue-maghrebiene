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
        <>
        {feedbacks?.map((fe, index) => {
                            return (

        <div class="wrapp">
      <div class="container " >
       
            
       <div class="carddd" >
           <div class='imgContainer'>
               <img src='https://1.bp.blogspot.com/-zns4HmbO1-w/X1-hFV4hviI/AAAAAAAAApI/02Nnirxu5ZkZ8Ny2DvHo3AOiyOWcyBm6QCLcBGAsYHQ/s1280/feedback%2B2.jpg'/>
           </div>
           <div class="content">
           {fe.user.map((u, index) => {
                                       return (
                                           <>
                                               <h5>
                                                   {u.username}
                                               </h5>
                                           </>
                                       )
                                   })}
               <p >{fe.message}
               <br/>
               <div style={{ display: "inline-flex" }}>
                                       {fe.star}<img src='https://th.bing.com/th/id/R.2302034bd53bd826ceea20e837f883b1?rik=CEJhbZUU6AGaPQ&pid=ImgRaw&r=0'
                                           style={{ height: '20px' }} />

                                   </div>
                                                         
               
               </p> 
           </div>
       </div>
          
   </div>
     
    </div>
                            )})}
        {/* <div style={{ display: "inline-flix",}}>

        {feedbacks?.map((fe, index) => {
                            return (
        <div class="container " >
       
            
        <div class="carddd" >
            <div class='imgContainer'>
                <img src='https://images.pexels.com/photos/1456268/pexels-photo-1456268.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'/>
            </div>
            <div class="content">
            {fe.user.map((u, index) => {
                                        return (
                                            <>
                                                <h5>
                                                    {u.username}
                                                </h5>
                                            </>
                                        )
                                    })}
                <p >{fe.message}
                <br/>
                <div style={{ display: "inline-flex" }}>
                                        {fe.star}<img src='https://th.bing.com/th/id/R.2302034bd53bd826ceea20e837f883b1?rik=CEJhbZUU6AGaPQ&pid=ImgRaw&r=0'
                                            style={{ height: '20px' }} />

                                    </div>
                                                          
                
                </p> 
            </div>
        </div>
           
    </div>
                            )})}

</div> */}

        </>
    )
}
