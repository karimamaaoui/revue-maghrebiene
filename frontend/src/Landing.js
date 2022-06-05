import React from 'react';
import AboutUs from './Components/landing/component/aboutUs/AboutUs';
import HeaderPage from './Components/landing/component/Header/HeaderPage';
import Auteur from './Components/landing/component/auteur/Auteur';
import * as Fi from "react-icons/fi"
import * as Fa from "react-icons/fa"
import * as Ai from "react-icons/ai"

import  Navbar  from './Components/landing/component/Navbar/Navbar';
import Newsletter from './Components/landing/component/footer/Newsletter';
import FooterOverlay from './Components/landing/component/footer/FooterOverlay';
    

    
    const Landing = () => (
      <div>
        <Navbar />
        <HeaderPage/>
        <AboutUs/>
        <Auteur/>
        <Newsletter/>
        <FooterOverlay/>
        </div>
    );
    
    export default Landing;
    

   
