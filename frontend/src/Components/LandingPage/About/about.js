import React from 'react'
import './about.css'
import {BsPlayCircle} from  'react-icons/bs'
export default function About() {
  return (
    <div id="aboutus" className='bg-cover'  >
        <div className='overlay'> </div>   
        <div className='container text-white text-center'>
            <div className='col-12 section-intro text-center'>
                <h1>Watch our video</h1>
                <div className='divider'></div>
                <p>
                There are many variations of passages of Lorem Ipsum available,
                        but the majority <br/> have suffered alteration in some form, by i
                        njected humour,or randomised words which don't look even sl
                  
                </p>
                <button className='video-btn'>
                <a href ="#" className='play' >
                    <BsPlayCircle/>
                     
                    </a>
                    </button>
            </div>

        </div>
        
    </div>
  )
}
