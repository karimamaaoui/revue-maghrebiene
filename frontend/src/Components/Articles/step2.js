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

  const typeList = useSelector((state) => state.typeList);
  const { loading, error, types } = typeList;
  const attributeList = useSelector((state) => state.attributeList);
  const { loadingAttribute, errorAttribute, attributes } = attributeList;

  const getAllRule = useSelector((state) => state.getAllRule);
  const { loadingRule, errorRule, rules } = getAllRule;

  console.log("rules", rules)
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  useEffect(() => {
    dispatch(listTypes());
    dispatch(listAttribute());
    dispatch(listRules())

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
                  <h4>AQ VALIDATION</h4><span>(3 of 20)</span></div>
              </div>
              <div class="question bg-white p-3 border-bottom">
                <div class="d-flex flex-row align-items-center question-title">
                  <h3 class="text-danger">Q.</h3>
                  <h5 class="mt-1 ml-2">Title Is Valid ?</h5>
                </div><div class="ans ml-2">
                  <label class="radio"> <input type="radio" name="brazil" value="brazil" /> <span>True</span>
                  </label>
                </div>
                <div class="ans ml-2">
                  <label class="radio"> <input type="radio" name="Germany" value="Germany" /> <span>False</span>
                  </label>
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
                  <h5 class="mt-1 ml-2">Title Is Valid ?</h5>
                </div><div class="ans ml-2">
                  <label class="radio"> <input type="radio" name="brazil" value="brazil" /> <span>True</span>
                  </label>
                </div>
                <div class="ans ml-2">
                  <label class="radio"> <input type="radio" name="Germany" value="Germany" /> <span>False</span>
                  </label>
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


