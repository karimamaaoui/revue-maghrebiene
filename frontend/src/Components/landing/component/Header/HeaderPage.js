import React from 'react';

import './Header.css';
import SubHeading from './SubHeading';
import welcome from '../../../../assets/land.jpg';

const HeaderPage = () =>{ 
  
  
  return (
  <div className='app__header app__wrapper section__padding' id='home'>
  <div className="app__wrapper_info">

  <SubHeading title="Chase The New Articles" />
  <h1 className="app__header-h1"> The Key to find Review</h1>
  <p className="p__opensans" style={{marginLeft:'90px'}}>Lorem ipsum dolor s hit ammet consicsos sthisisis s.shshs </p>
  <div type="button" className="custom__button">Details</div>
  </div>
  <div className="app__wrapper_img">
  <img src={welcome}alt="background img" style={{height:"400%",borderRadius:'12px'}} />
  </div>
 
  </div>

)};

export default HeaderPage;
