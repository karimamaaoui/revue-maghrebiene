import React, { useState, useEffect } from 'react'
import './formArticle.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listTypes } from '../../redux/Actions/typeAction';
import { listAttribute } from '../../redux/Actions/attributeActions';
import { listRules } from '../../redux/Actions/rulesActions';
import './formArticle.css'
import { Form } from 'react-bootstrap';
function Step2({ formData, setFormData }) {

  const [checked, setChecked] = useState([]);
  const history = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


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
                  <h5 class="mt-1 ml-2">Abbreviations Is Valid ?</h5>
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
                                    setFormData({ ...formData, abbreviationsValidation: value })
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
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  <h5 class="mt-1 ml-2">File Password Is Valid ?</h5>
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
                                    setFormData({ ...formData, filepasswordValidation: value })
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
              </div>
            </div>
          </div>
        </div>
      </div>


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
                  <h5 class="mt-1 ml-2">Image Is Valid ?</h5>
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
                                    setFormData({ ...formData, imageValidation: value })
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
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Step2;


