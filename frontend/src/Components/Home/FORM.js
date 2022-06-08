import React, { useState, useEffect } from 'react'
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';


export default function FormPage() {

  
  const [page, setPage] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    keyWords: [],
    abbreviations: "",
    typeArticle: "",
    attributesAticle: [],
    rulesChecked: [],
    multiple_files: [],
    type: '',

  });
  const FormTitles = ["Start", "Next Step2", "Next Step3","Next Step4","Next Step5","Next Step6"];


  const PageDisplay = () => {
    if (page === 0) {
      return <Step1 formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <Step2 formData={formData} setFormData={setFormData} />;
    } 
    else if (page === 2) {
      return <Step3 formData={formData} setFormData={setFormData} />;
    }
    else if (page === 3) {
      
      return <Step4 formData={formData} setFormData={setFormData} />;
    }

    else if (page === 4) {
      
      return <Step5 formData={formData} setFormData={setFormData} />;
    }
    else  {
      
      return <Step6 formData={formData} setFormData={setFormData} />;
    }
    
  };
  return (
    <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
    <div className="main-body" >
        
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
                          console.log("data from formArticle",formData)
                        } else {
                          setPage((currPage) => currPage + 1);
                        }
                      }}
                    >
                           
                      {page === FormTitles.length - 1 ? <button style={{borderRadius:"15px"}} >Submit </button>   :<button style={{borderRadius:"15px"}}> Next </button>}
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
   )
}
