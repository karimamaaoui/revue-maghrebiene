import React from 'react';
import SubHeading from '../Header/SubHeading';
import Quote from '../../../../assets/quote.png';
import sign from '../../../../assets/sign.png';

import './auteur.css';

const Chef = () => (
	<div className='app__bg app__wrapper ' style={{paddingTop:'3rem',paddingBottom:""}}>
		<div className='app__wrapper_img app__wrapper_reverse'>
			<img src="https://neilpatel.com/wp-content/uploads/2016/05/writer.jpg" style={{height:"480px"}} alt='chef' />
		</div>
		<div className='app__wrapper_info'>
			<SubHeading title="Auteur's word" />
			<h1 className='headText__cormorant'>What we believe In</h1>
			<div className='app__chef-content'>
				<div className='app__chef-content_quote'>
					<img src={Quote} alt='quote' />
					<p className='p__opensans'>
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Consequuntur, recusandae impedit.
					</p>
				</div>
				<p className='p__opensans'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Eaque laudantium neque nulla quo qui soluta ipsa
					exercitationem perspiciatis facere maxime fuga consequatur
					error dolorum minima, vero atque dolores a voluptatum.
				</p>
			</div>
			<div className='app__chef-sign'>
				<p>Karima Maaoui</p>
				<p className='p__opensans'>Author & Founder</p>
				<img src={sign} alt="pic" style={{marginTop:"-80px"}}/>
			</div>
		</div>
	</div>
);

export default Chef;
