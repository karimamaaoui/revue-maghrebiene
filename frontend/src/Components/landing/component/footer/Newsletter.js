import React from 'react';
import { useNavigate } from 'react-router-dom';
import SubHeading from '../Header/SubHeading';
import './Newsletter.css';


export default function Newsletter() {
    const history = useNavigate();

    return (
        <div className='app__newsletter'>
            <div className='app__newsletter-heading'>
                <SubHeading title='Newsletter' />
                <h1 className='headText__cormorant'>Subscribe To Our Newsletter</h1>
                <p className="p__opensans">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia laudantium neque cupiditate distinctio deserum!</p>
            </div>
            <div className="app__newsletter-input flex__center">
                <input type="email" placeholder="Enter your email" required />
                <button className="custom__button" type='submit' onClick={() => { history('/login') }}> Subscribe</button>
            </div>
        </div>
    )
}

