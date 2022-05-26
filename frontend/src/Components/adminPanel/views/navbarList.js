import Header from '../layouts/Header'
import './navabarList.css'
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import settings from "../../../assets/settings.png"
import article from "../../../assets/article.png"
import { NavbarBrand } from 'reactstrap';
import { listAttribute } from '../../../redux/Actions/attributeActions';




export default function NavbarList() {
  const NavBar = () => (
    <header className='navbar'>
      <div className='navbar__title navbar__item'></div>
      <div className='navbar__item'>About Us</div>
      <div className='navbar__item'>Contact</div>
      <div className='navbar__item'>Help</div>
    </header>
  );

  const dispatch = useDispatch();
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const attributeList = useSelector((state) => state.attributeList);
  const { loadingAttribute, errorAttribute, attributes } = attributeList;
 

  useEffect(() => {
    dispatch(listAttribute());

    if (!userInfo) {
      history("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
  ]);

  
  return (

    <div>
      <div className="row">
        <div className="contentArea">
          <Header />
        </div>

        <div>

          <header className='navbar'>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {attributes &&
                attributes.map(a => {
                  return (
                    <div key={a._id} className='form-check' >
                <div className='navbar__item' > <a href={`/getarticlefromattribute/${a._id}`} style={{color:'white'}}>
                   {a.label}</a> </div>
                    </div>
                  )
                })}

             {/* <div className='navbar__item'>Education</div>
             <div className='navbar__item'>Health</div>
             <div className='navbar__item'>Culture</div>
             <div className='navbar__item'>Social</div>
             <div className='navbar__item'>Environment</div>
             <div className='navbar__item'>Business</div> */}
        </div>
      </header>

    </div>
      </div >
    </div >
  )
}
