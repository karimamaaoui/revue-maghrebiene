import React, { useState, useEffect } from "react";
import Pdf from "react-to-pdf";
import './pdf.css'
import { listTypes } from "../../redux/Actions/typeAction";
import { listAttribute } from "../../redux/Actions/attributeActions";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listRules } from '../../redux/Actions/rulesActions';
import axios from "axios";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(["common", "profile"]);




  return (
    <>




      <div class="receipt-content">
        <div class="container bootstrap snippets bootdey "ref={ref}>
          <div class="row">
            <div class="col-md-12">
              <div class="invoice-wrapper">
                <div class="intro">
                {t("profile:title")} : <strong>{props.title}</strong>,
                  <br />
                  Author : {userInfo.user.username}
                </div>

                <div class="payment-info">
                  <div class="row">
                    <div class="col-sm-5">
                      <span>Type :</span>
                      <strong>  {typeList.label}</strong>
                    </div>
                    <div class="col-sm-4 text-right">
                      <span>Theme :</span>
                      <strong>{attributeList.label}</strong>
                    </div>
                  </div>
                </div>
                <div class="payment-details">
                  <div class="row">
                    <div class="col-sm-5">
                      <span> {t("profile:content")} : </span>
                      <p>
                      {props.filesname} <br />
                      </p>
                    </div>
                    <div class="col-sm-4 text-right">
                      <span>{t("profile:keyWords")} :</span>
                      <p>
                        {props.keyWords}

                      </p>
                    </div>
                  
                 
                  </div>
                </div>
                <div class="payment-details">

                <div class="row">
                <div class="col-sm-5">
                      <span>File Password :</span>
                      <p>
                        {props.filepassword}

                      </p>
                    </div>
                 
                </div>
                </div>
                <div class="line-items">
                  <div class="total text-right">
                    <p class="extra-notes col-sm-12" >
                      <strong>{t("profile:abstract")} : </strong>
                      {props.abstract} 
                    </p>

                  </div>
                    <br/>
                  <div class="footer" >
                    <Pdf targetRef={ref} filename="article.pdf" >
                    {({ toPdf }) =>
                      <button className="" style={{marginTop:'-24px'}} onClick={toPdf}>Capture as PDF</button>
                    }
                  </Pdf>
                  </div>
                </div>
              </div>

              <div class="footer">
                Copyright © 2022. Revue Maghrebine
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PDF;