import React from 'react';
import pen from '../../../../assets/pen.png'
import spoon from '../../../../assets/spoon.svg'

import './AboutUs.css';

const AboutUs = () => (
	<div
		className='app__aboutus '
		id='about'>
		<div className='app__aboutus-content flex__center'>
			<div className='app__aboutus-content_about'>
				<h1 className='headtext__cormorant'>About Us</h1>
				<img
					src={spoon}
					alt='about  spoon'
					className='spoon__img'
				/>
				<p className='p__opensans'>
					Lorem ipusum dolor shit ammet concequently this button is
					most important text
				</p>
				<button className='custom__button' type='button'>
					Know more
				</button>
			</div>
			<div className='app__aboutus-content_knife flext__center' >
				<img src={pen} alt='Knife img' style={{height:"350px"}}  />
			</div>
			<div className='app__aboutus-content_history'>
				<h1 className='headtext__cormorant'>Our history </h1>
				<img
					src={spoon}
					alt='about  spoon'
					className='spoon__img'
				/>
				<p className='p__opensans'>
					Lorem ipusum dolor shit ammet concequently this button is
					most important text
				</p>
				<button className='custom__button' type='button'>
					Know more
				</button>
			</div>
		</div>
	</div>
);

export default AboutUs;
