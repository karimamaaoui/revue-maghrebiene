import React, { useState, useEffect } from 'react'
import './formArticle.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listTypes } from '../../redux/Actions/typeAction';
import { listAttribute } from '../../redux/Actions/attributeActions';
import { listRules } from '../../redux/Actions/rulesActions';
import './formArticle.css'
import { Form } from 'react-bootstrap';
function Step1({ formData, setFormData }) {

  const [checked, setChecked] = useState([]);
  const history = useNavigate();
  const dispatch = useDispatch();

  const typeList = useSelector((state) => state.typeList);
  const { loading, error, types } = typeList;
  
  // const attributeList = useSelector((state) => state.attributeList);
  // const { loadingAttribute, errorAttribute, attributes } = attributeList;

  // const getAllRule = useSelector((state) => state.getAllRule);
  // const { loadingRule, errorRule, rules } = getAllRule;

  // console.log("rules", rules)
   const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  useEffect(() => {
    dispatch(listTypes());
//    dispatch(listAttribute());
  //  dispatch(listRules())

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
        <label style={{marginLeft:'-140px'}}>Section</label>
      <select className="select" value={formData.typeArticle} 
      onChange={(event) =>
        setFormData({ ...formData, typeArticle: event.target.value }) }>
          
        <option value="">Choose one</option>
        {types?.map((type, key) => {

          return <option key={key} value={type._id} > {type.label}</option>;
        })}
      </select>

   
    </div>
  );
}

export default Step1;


