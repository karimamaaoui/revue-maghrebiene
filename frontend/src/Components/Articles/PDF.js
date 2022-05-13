import React, { useState, useEffect } from "react";
import Pdf from "react-to-pdf";
import './pdf.css'
import { listTypes } from "../../redux/Actions/typeAction";
import { listAttribute } from "../../redux/Actions/attributeActions";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listRules } from '../../redux/Actions/rulesActions';
import axios from "axios";

const ref = React.createRef();

const PDF = (props) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [attributeList, setAttributeList] = useState([]);
  const [typeList, setTypeList] = useState('');

  // const typeList = useSelector((state) => state.typeList);
  // const { loadingType, errorType, types } = typeList;
  const getAllRule = useSelector((state) => state.getAllRule);
  const { loadingRule, errorRule, rules } = getAllRule;

  const handleAttriubte = async (id) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,

      },
    };
    let userId = userInfo.user._id;
    let user = { userId }
    console.log('view', user)


    return await axios.get(`http://localhost:5000/api/attribute/getattribute/${id}`, config)
      .then((res) => {

        console.log('vvvvvvvvvvvvvvvvvvvvvvvvv', res.data)
        setAttributeList(res.data)

      }).catch(err => {
        console.log(err)
      })

  }

  const handleType = async (id) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,

      },
    };
    let userId = userInfo.user._id;
    let user = { userId }
    console.log('view', user)


    return await axios.get(`http://localhost:5000/api/type/gettype/${id}`, config)
      .then((res) => {

        console.log('vvvvvvvvvvvvvvvvvvvvvvvvv', res.data)
        setTypeList(res.data)

      }).catch(err => {
        console.log(err)
      })

  }



  useEffect(() => {
    if (!userInfo) {
      history("/");
    }
    else {
      handleAttriubte(props.attribute)
    }
    console.log('vvvvvvvvvvvvvvvvvvvvvvvvv', attributeList.label)
    handleType(props.type)

    console.log('typeList', typeList.label)

  }, [
    dispatch,
    history,
    userInfo,
  ]);




  return (
    <>


      <div className='row mb-3 '>

        <div className="col-md-15 offset-md">
          <div className="row">


            <div className="col-sm-12"  >
              <div class="card border-primary mb-3" ref={ref}>
                <div class="card-header">   Title  :{props.title}</div>
                <div class="card-body text-primary">
                  <h5 class="card-title">Author  : {userInfo.user.username}
                    <br />
                    FileName  :{props.filesname}
                    <br />
                    Theme: {attributeList.label}
                    <br />
                    Type: {typeList.label}
                    <br />

                    KeyWords :{props.keyWords}
                    Bio : {props.bio}
                    <br/>
                    Abbreviations: 
                    {props.abbreviations}
                     <br/>
                     {props.abstract}        

                  </h5>
                </div>      
                </div>
                <div className="footer">

                <div style={{ display: "inline-flex" }}>

                
              <Pdf targetRef={ref} filename="post.pdf" >
                {({ toPdf }) => 
                
                   
          
                <button className="footer" onClick={toPdf}>Capture as PDF</button>
                }
              </Pdf>
              </div>
                </div>
          </div>
        </div>
      </div>
      </div>

    </>
  );
}

export default PDF;