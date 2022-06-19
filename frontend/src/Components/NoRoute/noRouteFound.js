import React from 'react'
import { useNavigate } from 'react-router-dom';
import './noRoute.css';

export default function NoRouteFound() {
  const history = useNavigate();

  const handleReturn=(e)=>{
    e.preventDefault();

    history("/login");

  }

  return (
     
    <div class="page-404">
        <div class="outer">
            <div class="middle">
                <div class="inner">
                    <div class="inner-circle"><i class="fa fa-home"></i><span>404</span></div>
                    <span class="inner-status">Oops! You're lost</span>
                    <span class="inner-detail">
                        We can not find the page you're looking for.

                        <div className='foot'>
                        <button className='norout'>
                        <a href="/" class="button"><i class="fa fa-home"></i>&nbsp;
                      
                        Return home
                        </a> 

                        </button>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    </div>   
  )
}