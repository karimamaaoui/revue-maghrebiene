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
     
    <div className="noRoute" >

             <div className='h1'> 
               <h1 className="h1route" >
                 4
                 <span>
                   </span>
                   4
                   </h1>
                   </div>
                <h2 > THIS PAGE DOES NOT EXIST</h2>
                <div className="col-sm-12">
                 
                <button type="submit" className="btn btn-primary" onClick={handleReturn}>Return</button>
                </div>
  </div>   
  )
}
