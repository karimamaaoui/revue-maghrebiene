import React, { useState, useEffect } from 'react'
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import './formArticle.css'
import SidebarScreen from '../sideBar/sidebarScreen';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { listTypes } from '../../redux/Actions/typeAction';
import {listAttribute} from '../../redux/Actions/attributeActions';
import Header from '../adminPanel/layouts/Header';
import { addnewArticle } from '../../redux/Actions/articleActions';
import NavbarList from '../adminPanel/views/navbarList';
import Loading from '../Authentification/Loading';
import ErrorMessage from '../Authentification/ErrorMessage';
import { listRules } from '../../redux/Actions/rulesActions';
import Step4 from './step4.js';
import axios from 'axios';
import Swal from 'sweetalert2';

function FormArticle() {

  const dispatch = useDispatch();
  const history = useNavigate();
  const [page, setPage] = useState(0);

  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const id = useParams();
  const readId=id.id;
 


  useEffect(() => {
      if (!userInfo) {
  
        history("/login");
      }
    
  
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    
  ]);


  const [formData, setFormData] = useState({
    titleValidation:false,
    abstractValidation:false,
    keywordsValidation:false,
    abbreviationsValidation:false,
    filepasswordValidation:false,
    imageValidation:false,
    themeValidation:false,
    rulesValidation:false,
    typeValidation:false,
    fileValidation:false,


  });
  const FormTitles = ["Start", "Next Step", "Third Step","Fourth Step"];

  const PageDisplay = () => {
    if (page === 0) {
      return <Step1 formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <Step2 formData={formData} setFormData={setFormData} />;
    } 
    else if (page === 2) {
      return <Step3 formData={formData} setFormData={setFormData} />;
    }
    else {
      return <Step4 formData={formData} setFormData={setFormData} />;
    }
  };
  const handleSubmit =  async () => {
    console.log('click on comment')
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,

        },
    };

    return await axios.put(`http://localhost:5000/api/file/validation/${readId}`, formData, config)
        .then((res) => {

            console.log(res.data);
            Swal.fire({
                title: "Succces!",
                text: "Comment Added Successfully",
                icon: 'success',
                button: "OK!"
            });


            console.log('article => ' + JSON.stringify(res.data));

        }).catch(err => {
            console.log(err)
        })
}



  return (
<>
{userInfo.roleuser === "Editor" ?

    <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
      <div className="main-body" >
        <div className="row gutters-sm" style={{maxWidth:"100%" }}>
          <SidebarScreen />
          <div className="col-md-8" style={{ marginTop: '50px' }}>
          
            <div className='container'>
              
              <div id="content" className="p-6 p-md-10 pt-12">
              <NavbarList />


                <div className="progressbar">
                  <div
                    style={{ width: page === 0 ? "25%" : page === 1 ? "50%" : page === 2 ? "75%": "100%" }}>

                  </div>
                </div>
          
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="row">
                      <h1>{FormTitles[page]}</h1>
                    </div>
                    
                    <div className="body">{PageDisplay()}</div>
                    <div className="footer">
                    <br/>
                    <div style={{display:"inline-flex"}}>

                      <button
                      style={{borderRadius:"15px"}}
                        disabled={page === 0}
                        onClick={() => {
                          setPage((currPage) => currPage - 1);
                        }}
                      >
                        Prev
                      </button>
                      
                      <div 
                        onClick={() => {
                          if (page === FormTitles.length - 1) {
                           // console.log("data from formArticle",formData)
                          } else {
                            setPage((currPage) => currPage + 1);
                          }
                        }}
                      >
                             
                        {page === FormTitles.length - 1 ? <button style={{borderRadius:"15px"}} onClick={handleSubmit}> Submit </button>   :<button style={{borderRadius:"15px"}}> Next </button>}
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
                    : "Not Authorized"}

</>
  )
}


export default FormArticle