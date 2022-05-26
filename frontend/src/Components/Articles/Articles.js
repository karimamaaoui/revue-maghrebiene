import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listAttribute } from "../../redux/Actions/attributeActions";
import { addNewFile } from "../../redux/Actions/fileActions";
import { listTypes } from "../../redux/Actions/typeAction";
import NavbarList from "../adminPanel/views/navbarList";
import SidebarScreen from "../sideBar/sidebarScreen";
import './formArticle.css'
import { useTranslation } from "react-i18next";
import { io } from "socket.io-client";
import 'antd/dist/antd.css';
import { listRules } from "../../redux/Actions/rulesActions";
import HeaderTran from "../adminPanel/views/ui/TRANSLATE/headerTrans";
import { Button, Card, Form, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import PDF from "./PDF";
import axios from "axios";
import AddForm from "./addFrom";
import Swal from "sweetalert2";

import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import RichTextEditor from "./RichTextEditor";
const ENDPOINT = "http://localhost:5000";

export const socket = io(ENDPOINT);

function Article() {


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
    const [postSubmitted, setPostSubmitted] = useState(false);
    const [isValidKeyWords, setIsValidKeyWords] = useState(false);
    const [messageKeyWords, setMessageKeyWords] = useState('');
    const [authorList, setAuthorList] = useState([]);
    const [firstname, setFirstname] = useState('');

    const [university, setUniversity] = useState('');
    const [placeofpractice, setPlaceofpractice] = useState('');

    const getAuthor = async () => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,

            },
        };

        return await axios.get(`http://localhost:5000/api/author/get`, config)
            .then((res) => {
                //    console.log(res.data);
                setAuthorList(res.data)
            }).catch(err => {
                console.log(err)
            })


    }
    useEffect(() => {
        if (!userInfo) {
            history("/");
        }
        else {
            dispatch(listTypes());
            dispatch(listAttribute());
            dispatch(listRules())
            getAuthor();
        }
    }, [
        dispatch,
        history,
        userInfo,
        //authorList
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

    const [filesname, setFilesname] = useState([]);
    const [filesnameName, setFilesnameName] = useState('');

    const { t } = useTranslation(["common", "profile"]);



    const handleKeyDown = (e) => {
        if (e.key !== 'Enter') return
        const value = e.target.value;
        if (!value.trim()) return

        if (tags.length === 5) {
            setIsValidKeyWords(false);
            setMessageKeyWords('Please enter only five keywords!');

        }
        else {
            setTags([...tags, value])
            setKeyWords([...keyWords, value])
            setIsValidKeyWords(true);
            setMessageKeyWords('Your keywprds looks good!');

        }
        //   setFormData({ ...formData, keyWords: value });
        //   const { keyWords } = formData;

        e.target.value = ''
    }

    const removeTags = (index) => {
        setTags(tags.filter((el, i) => i !== index))
    }

    const addFile = useSelector((state) => state.addFile);
    const { loading, error, files } = addFile;
    const [show, setShow] = useState(false);
    const [requiredItem, setRequiredItem] = useState(0);

    const [bold, setBold] = useState(false);
    const [italized, setItalized] = useState(false);
    const [underlined, setUnderlined] = useState(false);
    const [imagename, setImagename] = useState("");
    const [pathFile, setFilePath] = useState('');
    const [profilePicMessage, setProfilePicMessage] = useState();

    const postDetails = (pics) => {
        setProfilePicMessage(null);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            setImagename(pics)
            data.append("upload_preset", "notezipper");
            data.append("cloud_name", "piyushproj");
            fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setFilePath(data.url.toString());
                    // console.log(data.url.toString());
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            return setProfilePicMessage("Please Select an Image");
        }

    };


    const [value, setValue] = useState("");
    const getValue = (value) => {
        // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',createMarkup (value))
        setValue(value);
        setAbstract(value)
    };

    const handleEdit = (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,

            },
        };

        const auteur = { university, placeofpractice }
        //  addEmployee(name, email, phone, address);
        return axios.put(`http://localhost:5000/api/author/updateauthor`, auteur, config)
            .then((res) => {

                console.log(res.data);

                console.log('article => ' + JSON.stringify(auteur));
                Swal.fire({
                    title: "Succces!",
                    text: "Request Sended Successfully",
                    icon: 'success',
                    button: "OK!"
                });

            }).catch(err => {
                console.log(err)
                Swal.fire({
                    title: "Error!",
                    text: "Request Already Send",
                    icon: 'error',
                    button: "OK!"
                });

            })

    }

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    const [convertedContent, setConvertedContent] = useState(null);

    const handleEditorChange = (state) => {
        setEditorState(state);

        convertContentToHTML();
    }

    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());

        setConvertedContent(currentContentAsHTML);
    }

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }


    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

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
        formData.append('pathFile', pathFile);
        formData.append('imagename', imagename);





        console.log(multiple_files.length);
        for (let i = 0; i < multiple_files.length; i++) {
            console.log(multiple_files[i]);

            formData.append('multiple_files', multiple_files[i]);
            setFilesname(multiple_files[i])
        }
        setPostSubmitted(true)
        console.log("form", formData)
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

    const replaceModalItem = (id) => {
        handleShow()
        setRequiredItem(id)
    }




    return (

        <>
            {!userInfo ? history('/') :

                userInfo.roleuser === "Author" ?
                    <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>

                        <div className="main-body" >
                            <div className="row gutters-sm" style={{ maxWidth: "100%" }}>
                                <SidebarScreen />
                                <div className="col-md-8" style={{ marginTop: '50px' }}>
                                    <div className='container'>
                                        <div id="content" className="p-6 p-md-10 pt-12">
                                            <NavbarList />
                                            <div className="" style={{ backgroundColor: 'white' }}>
                                                <HeaderTran />
                                                {!postSubmitted ?

                                                    <div class="card-body">
                                                        {/* <div className="row">
                                                            <div className="col-md-6" style={{ margin: "auto", marginTop: "50px" }}>
                                                                <div style={{ textAlign: "center" }}>
                                                                    <h3>Rich Text Editor</h3>
                                                                </div>
                                                                {/* <Editor
                                                                    editorState={editorState}
                                                                    onEditorStateChange={handleEditorChange}
                                                                    wrapperClassName="wrapper-class"
                                                                    editorClassName="editor-class"
                                                                    toolbarClassName="toolbar-class"
                                                                    name="abstract"
                                                                
                                                                /> */}

                                                        {/* <RichTextEditor initialValue="" getValue={getValue}
                                                                    name="abstract"
                                                                    value={abstract}
                                                                    

                                                                />
                                                                <div className="preview" dangerouslySetInnerHTML={createMarkup(value)}

                                                                ></div>

                                                                <br /> 
                                                                <div>

                                                                </div>


                                                            </div>

                                                        </div> */}
                                                        {/* <div className="headText">
                                                            <span className="Control">
                                                                <button className="btnText" onClick={onBoldClick}><strong>B</strong></button>
                                                                <button className="btnText" onClick={onItalicsClick}><em>I</em></button>
                                                                <button className="btnText" onClick={onUnderlineClick}><u>U</u></button>
                                                            </span>
                                                            <textarea rows="5" className="Text" />
                                                        </div> */}

                                                        <div className="row">
                                                            <h1 style={{ color: '#B91736' }}>Add New Article::::::::::::::::::::::::::::::::::::::::::::::::::</h1>
                                                        </div>
                                                        <br />

             




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
                                                                                <label style={{ fontSize: '20px' }}>{t("profile:chooseattribute")}</label>

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
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="abstract"
                                                                        defaultValue={abstract}
                                                                        onChange={(e) => {
                                                                            setAbstract(e.target.value);

                                                                        }}
                                                                    />

                                                                    {/* <textarea name="abstract"
                                                                        rows="5" cols="33"
                                                                        className="form-control"
                                                                        required
                                                                        onChange={(e) => {
                                                                            setAbstract(e.target.value);

                                                                        }}

                                                                    >

                                                                    </textarea> */}

                                                                </div>
                                                            </div>
                                                            <div class="row mb-3">
                                                                <div class="col-sm-3">
                                                                    <h6 class="mb-0">image</h6>
                                                                </div>
                                                                <div class="col-sm-9 text-secondary">
                                                                    <input
                                                                        type="file"
                                                                        required
                                                                        name="imagename"
                                                                        className="file-uploader "
                                                                        defaultValue={imagename}
                                                                        onChange={(e) => postDetails(e.target.files[0])}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className='widget-49-meeting-points'>
                                                                {imagename != '' ?
                                                                    <img src={pathFile} alt="" height="210px" width="10%" />
                                                                    : <></>}

                                                            </div>

                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="pathFile"
                                                                defaultValue={pathFile}
                                                                onChange={(e) => setFilePath(e.target.value)}
                                                                style={{ visibility: 'hidden' }}
                                                            />


                                                            <div class="row mb-3">
                                                                <div class="col-sm-3">
                                                                    <h6 class="mb-0">{t("profile:keyWords")}</h6>
                                                                </div>
                                                                <div class="col-sm-9 text-secondary">
                                                                    <div className="tags-input-container" style={{ borderColor: "#B91736" }}>
                                                                        {
                                                                            tags.map((tag, index) => (
                                                                                <div className="tag-item" key={index}>
                                                                                    <span className="text">
                                                                                        {tag}
                                                                                    </span>
                                                                                    <span className="close" onClick={() => removeTags(index)}>
                                                                                        &times;
                                                                                    </span>
                                                                                </div>

                                                                            ))}
                                                                        <input
                                                                            name="keyWords"
                                                                            type="text"
                                                                            className="tags-input"
                                                                            onKeyDown={handleKeyDown}
                                                                        />
                                                                    </div>
                                                                    <div className={`message ${isValidKeyWords ? 'success' : 'error'}`}>
                                                                        {messageKeyWords}
                                                                    </div>
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

                                                            <div class="container">
                                                                <div className='row mb-3 '>
                                                                    <div className="col-md-15 offset-md">
                                                                        <div className='card'>
                                                                            <div class="">

                                                                                <label style={{ fontSize: '20px' }}>author</label>
                                                                                <br />
                                                                                <div style={{ display: "inline-flex", fontSize: "50px", flexWrap: "wrap" }}>
                                                                                    <p>
                                                                                        {/* <div className="col-sm-6">
                                                                                            <OverlayTrigger 
                                                                                                overlay={
                                                                                                    <Tooltip id={`tooltip-top`}>
                                                                                                        Edit 
                                                                                                    </Tooltip>
                                                                                                }>
                                                                                                <button onClick={handleShow} className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
                                                                                            </OverlayTrigger>
                                                                                            </div> */}
                                                                                        Email: {userInfo.user.email} username: {userInfo.user.username}
                                                                                        {authorList?.map((auth, key) => {

                                                                                            return (
                                                                                                <>
                                                                                                    <div class="row justify-content-around" style={{ marginLeft: '110%', marginTop: "-40px" }}>
                                                                                                        <div class="col">
                                                                                                        </div>
                                                                                                        <div class="col-20">
                                                                                                            <div key={key}>

                                                                                                                <button className="btn btn-primary"
                                                                                                                    data-toggle="modal" data-target="#exampleModal"
                                                                                                                    onDoubleClick={() => {
                                                                                                                        replaceModalItem(auth._id)
                                                                                                                    }}
                                                                                                                >
                                                                                                                    <i class="bi bi-pencil-square"></i>
                                                                                                                </button>
                                                                                                            </div>
                                                                                                        </div>

                                                                                                        <Modal show={show} onHide={handleClose}>
                                                                                                            <Modal.Header closeButton >
                                                                                                                <Modal.Title>
                                                                                                                    Edit
                                                                                                                </Modal.Title>
                                                                                                            </Modal.Header>
                                                                                                            <Modal.Body>
                                                                                                                <Form >
                                                                                                                    <Form.Group>
                                                                                                                        <Form.Label>
                                                                                                                            University
                                                                                                                        </Form.Label>
                                                                                                                        <Form.Control
                                                                                                                            type="text"
                                                                                                                            placeholder="university *"
                                                                                                                            name="university"
                                                                                                                            defaultValue={auth.university}
                                                                                                                            onChange={(e) => {
                                                                                                                                setUniversity(e.target.value);

                                                                                                                            }}


                                                                                                                        />
                                                                                                                    </Form.Group>

                                                                                                                    <Form.Group>
                                                                                                                        <Form.Label>
                                                                                                                            Place Of Practice
                                                                                                                        </Form.Label>

                                                                                                                        <Form.Control
                                                                                                                            type="text"
                                                                                                                            placeholder="placeofpractice *"
                                                                                                                            name="placeofpractice"
                                                                                                                            defaultValue={auth.placeofpractice}
                                                                                                                            onChange={(e) => {
                                                                                                                                setPlaceofpractice(e.target.value);

                                                                                                                            }} />
                                                                                                                    </Form.Group>


                                                                                                                    <br />
                                                                                                                    <Button variant="primary" type="submit" block onClick={handleEdit}>
                                                                                                                        Update
                                                                                                                    </Button>
                                                                                                                </Form>

                                                                                                            </Modal.Body>

                                                                                                        </Modal>

                                                                                                    </div>
                                                                                                    <p>Place Of Practice  {auth.placeofpractice}</p>
                                                                                                    <p>University : {auth.university}</p>

                                                                                                </>
                                                                                            )
                                                                                        })}

                                                                                    </p>

                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
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
                                                                                {t("common:submit")}
                                                                            </button>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* <div container spacing={2} justify="flex-end">
                                                                <Card p={2}>
                                                                    {
                                                                        JSON.stringify({ title, bio, keyWords, abbreviations ,attributesAticle }, null, 4)
                                                                    }
                                                                </Card>
                                                            </div> */}

                                                        </form>

                                                    </div>
                                                    : <PDF
                                                        title={title}
                                                        abstract={abstract}
                                                        filesname={filesname.name}
                                                        attribute={attributesAticle}
                                                        type={typeArticle}
                                                        keyWords={keyWords}
                                                        abbreviations={abbreviations}
                                                        bio={bio}
                                                        author={authorList}

                                                    />}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                    : "Not Authorized"
            }


        </>
    );
}

export default Article;