import { useTranslation } from "react-i18next";
import '../../../../../i18n'
import React, { useState, useEffect } from "react";
import HeaderTran from "./headerTrans";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listAttribute } from "../../../../../redux/Actions/attributeActions";
import { addNewFile } from "../../../../../redux/Actions/fileActions";
import { listTypes } from "../../../../../redux/Actions/typeAction";
import { listRules } from "../../../../../redux/Actions/rulesActions";

import { io } from "socket.io-client";
import 'antd/dist/antd.css';
const ENDPOINT = "http://localhost:5000";
export const socket = io(ENDPOINT);

const Forms = () => {
	const { t } = useTranslation(["common", "profile"]);
	const dispatch = useDispatch();
    const history = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const attributeList = useSelector((state) => state.attributeList);
    const { loadingAttribute, errorAttribute, attributes } = attributeList;

    const typeList = useSelector((state) => state.typeList);
    const { loadingType, errorType, types } = typeList;


    const getAllRule = useSelector((state) => state.getAllRule);
    const { loadingRule, errorRule, rules } = getAllRule;


    const [multiple_files, setMultiple_files] = useState([]);
    const [filename, setFilename] = useState('choose file');
    const [typeArticle, setTypeArticle] = useState('');
    const [title, setTitle] = useState('');
    const [bio, setBio] = useState('');
    const [abstract, setAbstract] = useState('');
    const [keyWords, setKeyWords] = useState('');
    const [abbreviations, setAbbreviations] = useState('');




    useEffect(() => {
        if (!userInfo) {
            history("/");
        }
        else {
            dispatch(listTypes());
            dispatch(listAttribute());
            dispatch(listRules())
        }
    }, [
        dispatch,
        history,
        userInfo,
    ]);
	useEffect(() => {
        socket.emit("initial_data");
        // socket.on("get_data", getData);
        socket.on("change_data", changeData);
        return () => {
            //  socket.off("get_data");
            socket.off("change_data");
        };
    }, []);
    const changeData = () => socket.emit("initial_data");



    //  const [authors, setAuthors] = useState([userInfo.user._id]);
    const [tags, setTags] = useState([]);
    const [attributesAticle, setAttributesAticle] = useState([]);

    const [rulesChecked, setRulesChecked] = useState([]);


    const handleKeyDown = (e) => {
        if (e.key !== 'Enter') return
        const value = e.target.value;
        if (!value.trim()) return
        setTags([...tags, value])

        //   setFormData({ ...formData, keyWords: value });
        //   const { keyWords } = formData;

        setKeyWords(...keyWords, [value])



        e.target.value = ''
    }
    const addFile = useSelector((state) => state.addFile);
    const { loading, error, files } = addFile;


    const removeTag = (index) => {
        setTags(tags.filter((el, i) => i !== index))
    }


    const handleSubmit = (e) => {
        console.log("inside handle submit");

        e.preventDefault();
        const formData = new FormData();
        formData.append('multiple_files', multiple_files);
        formData.append('title', title);
        formData.append('bio', bio);
        formData.append('abstract', abstract);
        formData.append('keyWords', keyWords);
        formData.append('abbreviations', abbreviations);
        formData.append('typeArticle', typeArticle);
        formData.append('attributesAticle', attributesAticle);
        formData.append('rulesChecked', rulesChecked);



        console.log(multiple_files.length);
        for (let i = 0; i < multiple_files.length; i++) {
            console.log(multiple_files[i]);

            formData.append('multiple_files', multiple_files[i]);
        }
        console.log("formdata", formData, title)

        dispatch(addNewFile(formData));


    }
    const handlePhoto = (e) => {
        setMultiple_files(e.target.files);
        setFilename(e.target.files[0].names);
        console.log("handlephpoto")

    }

    const handleChange = (e) => {
        setTitle(e.target.value);

        console.log(title)
    }

    const handleChangeBio = (e) => {
        setBio(e.target.value);

    }



	return (
		<>
		<div className="container mt-5 col-9 col-md-6">
			<h1 className="text-center">{t("common:profile")}</h1>
			<HeaderTran/>

			<div className="form-group">
				<label htmlFor="">{t("profile:content")}:</label>
				<input
					type="text"
					className="form-control"
					placeholder="John Doe"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="">{t("profile:title")}:</label>
				<input
					type="number"
					className="form-control"
					placeholder="25"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="">{t("profile:bio")}:</label>
				<input
					type="text"
					className="form-control"
					placeholder="john@john.com"
				/>
			</div>
			
			
			<br />
			<div className="text-center">
				<button className="btn btn-dark">{t("common:submit")}</button>
			</div>
		</div>
		<h1 className="text-center">{t("common:profile")}</h1>

		 <div class="card-body">
		 <form onSubmit={handleSubmit} encType='multipart/form-data' >
			 <div class="row mb-3">
				 <div class="sign-up-container">

					 <label style={{ fontSize: '20px' }}>{t("profile:selectAType")}</label>

					 <div class="col-sm-9 text-secondary">

						 <select className="select" name="typeArticle"
							 required
							 onChange={(e) => {
								 setTypeArticle(e.target.value);

							 }}
						 >

							 <option value="">{t("profile:chooseatheme")}</option>
							 {types?.map((type, key) => {

								 return <option key={key} value={type._id}  > {type.label}</option>;
							 })}
						 </select>
					 </div>
				 </div>
			 </div>
			 <br />

			 <div class="container">
				 <div className='row mb-3 '>
					 <div className="col-md-15 offset-md">
						 <div className='card'>
							 <div class="sign-up-container">
								 <br />
								 <label style={{ fontSize: '20px' }}>Choose A Theme</label>

								 <div style={{ display: "flex", fontSize: "50px", flexWrap: "wrap" }}>

									 {attributes?.map((item, i) => (

										 <div key={i}>

											 <input type="checkbox" className='checkbox__box'
												 value={item._id}

												 name={attributesAticle}
												 onChange={(e) => {
													 // Destructuring
													 const { value, checked } = e.target;
													 console.log(`${value} is ${checked}`);

													 // Case 1 : The user checks the box
													 if (checked) {
														 setAttributesAticle([value])

													 }
												 }

												 }
											 />
											 <label className='col' id="check" style={{ fontSize: '17px' }}  >{item.label}  </label>


										 </div>
									 ))
									 }

								 </div>
							 </div>
						 </div>

					 </div>
				 </div>
			 </div>

			 <div class="row mb-3">

				 <div class="col-sm-3">
					 <h6 class="mb-0">{t("profile:title")}</h6>
				 </div>
				 <div class="col-sm-9 text-secondary">
					 <input
						 type="text"
						 name="title"
						 className="form-control"
						 required
						 onChange={handleChange}
					 />
				 </div>
			 </div>
			 <div class="row mb-3">
				 <div class="col-sm-3">
					 <h6 class="mb-0">{t("profile:bio")}</h6>
				 </div>
				 <div class="col-sm-9 text-secondary">

					 <input
						 type="text"
						 className="form-control"
						 name="bio"
						 required
						 onChange={handleChangeBio}
					 />
				 </div>
			 </div>
			 <div class="row mb-3">
				 <div class="col-sm-3">
					 <h6 class="mb-0">{t("profile:abstract")}</h6>
				 </div>
				 <div class="col-sm-9 text-secondary">
					 {/* <input
					 type="text"
					 className="form-control"
					 name="abstract"
					 onChange={(e) => {
						 setAbstract(e.target.value);

					 }}
				 /> */}

					 <textarea name="abstract"
						 rows="5" cols="33"
						 className="form-control"
						 required
						 onChange={(e) => {
							 setAbstract(e.target.value);

						 }}

					 >

					 </textarea>

				 </div>
			 </div>
			 <div class="row mb-3">
				 <div class="col-sm-3">
					 <h6 class="mb-0">{t("profile:keyWords")}</h6>
				 </div>
				 <div class="col-sm-9 text-secondary">
					 <input
						 type="text"
						 className="form-control"
						 name="keyWords"
						 required
						 onChange={(e) => {
							 setKeyWords(e.target.value);

						 }}
					 />
					 {/* <div className="tags-input-container">

					 {

						 tags.map((tag,index)=>{
							 <div className="tag-item">
								 <span className="text">
									 {tag}
								   

								 </span>
								 <span className="close">
									 &times;
								 </span>
								 </div>
						 })
					 }
					   <input
						 type="text"
						 className="form-control"
						 name="keyWords"
						 required
						 onChange={(e) => {
							 setKeyWords(e.target.value);

						 }}
						 onClick={handleKeyDown}
					 />
				   
			 </div> */}

				 </div>
			 </div>
			 <div class="row mb-3">
				 <div class="col-sm-3">
					 <h6 class="mb-0">{t("profile:abbreviations")}</h6>
				 </div>
				 <div class="col-sm-9 text-secondary">
					 <input
						 type="text"
						 className="form-control"
						 name="abbreviations"
						 required
						 onChange={(e) => {
							 setAbbreviations(e.target.value);

						 }}
					 />
				 </div>
			 </div>
			 <div class="row mb-3">
				 <div class="col-sm-3">
					 <h6 class="mb-0">{t("profile:content")}</h6>
				 </div>
				 <div class="col-sm-9 text-secondary">
					 <input
						 type="file"
						 required
						 name="multiple_files"
						 className="file-uploader "
						 multiple
						 onChange={handlePhoto}
					 />
				 </div>
			 </div>

			 <div class="">
				 <div className='row  '>
					 <div className="col-md-15 offset-md">
						 <div className='card'>

							 <label>{t("profile:articleRequirements")} </label>
							 <p style={{ fontSize: '10px' }}>You muse read and acknowledge that you've completed the requirements below proceeding</p>
							 <div style={{ display: "inline-flex" }}>

								 {rules?.map((item, i) => (

									 <div key={i}>

										 <input type="checkbox" className='checkbox'
											 value={item._id}
											 name={rulesChecked}
											 required
											 onChange={(e) => {
												 // Destructuring
												 const { value, checked } = e.target;
												 console.log(`${value} is ${checked}`);

												 // Case 1 : The user checks the box
												 if (checked) {
													 setRulesChecked(e.target.value);

												 }
											 }
											 }
										 />
										 <label className='col' id="check" style={{ fontSize: '10px' }}  >{item.label}  </label>
									 </div>
								 ))
								 }
							 </div>
						 </div>

					 </div>
				 </div>
			 </div>
			 <div class="row">
				 <div class="col-sm-3"></div>
				 <div class="col-sm-5 text-secondary">
					 <div className="footer">

						 <div style={{ display: "inline-flex" }}>

							 <button
								 style={{ borderRadius: "15px" }}
							 >
								 Add Article
							 </button>

						 </div>
					 </div>
				 </div>
			 </div>

		 </form></div>
		 </>
	);
};

export default Forms;

// import React from "react";
// import {useTranslation} from 'react-i18next'
//  import '../../../../../i18n'
// function Forms() {
//   const {t} = useTranslation()
//   return (
    
//     <>
//     <div class="alert alert-success" role="alert">
//         <h1 class="display-3">{t('home')}</h1>
//     </div>
//     <div class="alert alert-success" role="alert">
//     <h1 class="display-6">{t('description')}</h1>
//   </div>
//     </>
//   );
// }

// export default Forms;
