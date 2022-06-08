import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { addnewArticle } from "../../redux/Actions/articleActions";
import './formArticle.css'
import { addNewFile } from "../../redux/Actions/fileActions";
import Loading from "../Authentification/Loading";
import ErrorMessage from "../Authentification/ErrorMessage";
import { Button } from "react-bootstrap";

function Step4({ formData, setFormData }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const history = useNavigate();


  const defaultData = [

    { name: "article", boxes: ["true", "false"], selected: null },

  ];
 
  const [data, setData] = useState(defaultData);
  
  const handleChange = e => {
    const { name, value } = e.target;
    const updatedData = data.map(group => {
      if (group.name === name) {
        return {
          ...group,
          selected: group.selected === value ? null : value
        };
      } else {
        return group;
      }
    });

    setFormData({ ...formData, checkValidation: [value] })
  };
 
  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,

  ]);



  return (
    <>
    <div className="sign-up-container" style={{ backgroundColor: 'white' }}>
     
     <div class="container mt-5">
        <div class="d-flex justify-content-center row">
          <div class="col-md-10 col-lg-10">
            <div class="border">
              <div class="question bg-white p-3 border-bottom">
                <div class="d-flex flex-row justify-content-between align-items-center mcq">
                  <h4>AQ VALIDATION</h4><span>(4 of 20)</span></div>
              </div>
              <div class="question bg-white p-3 border-bottom">
                <div class="d-flex flex-row align-items-center question-title">
                  <h3 class="text-danger">Q.</h3>
                  <h5 class="mt-1 ml-2">File Is Valid ?</h5>
                </div>
                <div class="ans ml-2">
                  {data.map((group) => {
                    return (
                      <div>
                        {group.boxes.map((box) => {
                          return (
                            <div>
                              <label class="checkbox">
                                {console.log('box', box)}
                                <input
                                 onChange={(e) => {
                                  const { name, value } = e.target;
                                  const updatedData = data.map(group => {
                                    if (group.name === name) {
                                      return {
                                        ...group,
                                        selected: group.selected === value ? null : value
                                      };
                                    } else {
                                      return group;
                                    }

                                  });
                                  { console.log('boolean', value) }
                                  setFormData({ ...formData, fileValidation: value })
                                }}
                                  type="checkbox"
                                  name={group.name}
                                  value={box}
                                /> <span>{box}</span>
                              </label>

                            </div>
                          )
                        })}
                      </div>

                    )
                  })}
                </div>

                <div className="ans ml-2">
                    <label className="">Select Status</label>
                   
                      <select className="form-control" name="salle"    >  
                                                <option>Salle</option>  
                                                         <option  value="status">Accepted</option>;  
                                                         <option  value="status">Rejected</option>;  
                                                         <option  value="status">Loading</option>;  
                                              
                                        </select>  
                    </div>
                
                </div>
            </div>
          </div>
        </div>
      </div>
      <br/>

    </div>
    <button type="submit" className="btn btn-primary">Publish</button>

    </>
  );
}

export default Step4;