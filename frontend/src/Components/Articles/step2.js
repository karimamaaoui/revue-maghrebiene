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
      <br/>
      <label style={{fontSize:'20px'}}>Choose Attribute</label>

      <div style={{ display: "inline-flex" ,fontSize:"18px" }}>

        {attributes?.map((item, i) => (

          <div
            key={i}>

            <input type="checkbox" className='checkbox__box'
              value={item._id}
              name={formData.attributesAticle}
              onChange={(e) => {
                // Destructuring
                const { value, checked } = e.target;
                const { attributesAticle } = formData;
                console.log(`${value} is ${checked}`);

                // Case 1 : The user checks the box
                if (checked) {
                  setFormData({ ...formData, attributesAticle: [...attributesAticle, value] })

                  /*setFormData({
                     attributesAticle:[...attributesAticle, value] 
                   });*/
                }
              }

              }
            />
            <label className='col' id="check" style={{fontSize:'17px'}}  >{item.label}  </label>


          </div>
        ))
        }
      </div>
        <br/>
        <br/>

      <div class="container">
        <div className='row  '>
          <div className="col-md-15 offset-md">
            <div className='card'>

          <label>Article Requirements</label>
            <p style={{fontSize:'10px'}}>You muse read and acknowledge that you've completed the requirements below proceeding</p>
            <div style={{ display: "inline-flex" }}>

              {rules?.map((item, i) => (

                <div key={i}>

                  <input type="checkbox" className='checkbox__box'
                    value={item._id}
                    name={formData.rulesChecked}
                    onChange={(e) => {
                      // Destructuring
                      const { value, checked } = e.target;
                      const { rulesChecked } = formData;
                      console.log(`${value} is ${checked}`);

                      // Case 1 : The user checks the box
                      if (checked) {
                        setFormData({ ...formData, rulesChecked: [...rulesChecked, value] })

                      }
                    }
                    }
                  />
                  <label className='col' id="check" style={{fontSize:'10px'}}  >{item.label}  </label>
                </div>
              ))
              }
            </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Step2;


