import React from 'react'
import './service.css'
import first from '../../../assets/first.jpg'
import second from '../../../assets/second.jpg'
import {FiCalendar} from 'react-icons/fi'
import {CgBrowser} from 'react-icons/cg'
import {AiOutlineMessage} from 'react-icons/ai'

export default function Services() {
  return (
    <section className="services"  id="services">
        <div className='container'  >
            <div className='row'>
                <div  className='col-12 section-intro text-center'>
                    <h1>Our Services</h1>
                    <div className='divider'>
                    <br/>
                        <p>   
                        There are many variations of passages of Lorem Ipsum available,
                        but the majority have suffered alteration in some form, by i
                        njected humour,or randomised words which don't look even sl
                      
                        </p>
                    </div>
                    <br/>

                </div>
            </div>
            <div className='row'>
                <div className='col-md-4'>
                    <div className='service '>
                        <div className='service-img'>

                        <img src={first} alt=""/>
                        <div className='icon'>
                        <CgBrowser />
                        </div>
                        </div>  
                        <h5 className='mt-5 pt-4'>Service Name</h5>
                        <p>
                        There are many variations of passages of Lorem Ipsum available,
                        </p>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='service '>
                        <div className='service-img'>

                        <img src={second} alt=""/>
                        <div className='icon'>
                        <AiOutlineMessage />
                        </div>
                        </div>  
                        <h5 className='mt-5 pt-4'>Service Name</h5>
                        <p>
                        There are many variations of passages of Lorem Ipsum available,
                         </p>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='service '>
                        <div className='service-img'>

                        <img src={first} alt=""/>
                        <div className='icon'>
                        <FiCalendar />
                        </div>
                        </div>  
                        <h5 className='mt-5 pt-4'>Service Name</h5>
                        <p>
                        There are many variations of passages of Lorem Ipsum available,
                       </p>
                    </div>
                </div>
        
            </div>
            
        </div>

    </section>

    )
}
