import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { listAttribute } from "../../../redux/Actions/attributeActions";
import { addNewFile } from "../../../redux/Actions/fileActions";
import { listTypes } from "../../../redux/Actions/typeAction";
import NavbarList from "../views/navbarList";
import SidebarScreen from "../../sideBar/sidebarScreen";
import '../../Articles/formArticle.css'


import { io } from "socket.io-client";
import 'antd/dist/antd.css';
import axios from "axios";
import { listRules } from "../../../redux/Actions/rulesActions";
import Swal from "sweetalert2";
const ENDPOINT = "http://localhost:5000";
export const socket = io(ENDPOINT);

function EditArticle({match}) {


    
    const dispatch = useDispatch();
    const history = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const attributeList = useSelector((state) => state.attributeList);
    const { loadingAttribute, errorAttribute, attributes } = attributeList;

    const typeList = useSelector((state) => state.typeList);
    const { loadingType, errorType, types } = typeList;

    const [multiple_files, setMultiple_files] = useState([]);
    const [filename, setFilename] = useState('choose file');
    const [typeArticle, setTypeArticle] = useState('');
    const [title, setTitle] = useState('');
    const [bio, setBio] = useState('');
    const [abstract, setAbstract] = useState('');
    const [keyWords, setKeyWords] = useState('');
    const [abbreviations, setAbbreviations] = useState('');

    const articleUpdate = useSelector((state) => state.articleUpdate);
    const { loadingArticle, errorArticle,successUpdate } = articleUpdate;
    const [attributesAticle, setAttributesAticle] = useState([]);


    useEffect(() => {
        if (!userInfo) {
            history("/");
        }
        else{
        dispatch(listTypes());
        dispatch(listAttribute());
        dispatch(listRules())
    }
    }, [
        dispatch,
        history,
        userInfo,
        successUpdate,

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
      
      let articleId = useParams();
    //   console.log('id article',articleId)

      const changeData = () => socket.emit("initial_data");

      useEffect(() => {
      const fetching = async () => {
        const config = {
            headers: {
              Accept: 'application/json',
              'content-type': 'multipart/form-data',
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          console.log('id article',articleId.id)

        const { data } = await axios.get(`http://localhost:5000/api/file/getsingle/${articleId.id}`,config);

          console.log('data from get axios',data)
          {console.log('files',data.multiple_files[0].name)}
        //   setMultiple_files(data.multiple_files[0].name)

        setTitle(data.title);
        setBio(data.bio);
        setAbbreviations(data.abbreviations);
        setAbstract(data.abstract);
        setKeyWords(data.keyWords)
        setTypeArticle(data.typeArticle)
        setAttributesAticle(data.attributesAticle);
      };
  
      fetching();
    }, [articleId]);

    const [tags, setTags] = useState([]);
    const addFile = useSelector((state) => state.addFile);
    const { loading, error, files } = addFile;

    const handleEdit = async(e) => {
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
        console.log(multiple_files.length);
        for (let i = 0; i < multiple_files.length; i++) {
            console.log(multiple_files[i]);

            formData.append('multiple_files', multiple_files[i]);
        }
         console.log("formdata",formData,title)

         const config = {
                headers: {
                    Accept: 'application/json',
                    'content-type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                
        
          }}
          console.log('config',userInfo.token)
          return  await axios.put(
            `http://localhost:5000/api/file/update/${articleId.id}`, formData,config).then((res) => {

                console.log(res.data);
                Swal.fire({
                    title: "Succces!",
                    text: "Comment Added Successfully",
                    icon: 'success',
                    button: "OK!"
                })})

          .catch(err => {
            console.log(err)
        })
    }
    const handlePhoto = (e) => {
        setMultiple_files(e.target.files);
        setFilename(e.target.files[0].names);
        console.log("handlephpoto")

    }
    return (

        <>
   {!userInfo ? history('/'):
 
            userInfo.roleuser === "Reader" ?

                <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
                    <div className="main-body" >
                        <div className="row gutters-sm" style={{ maxWidth: "100%" }}>
                            <SidebarScreen />
                            <div className="col-md-8" style={{ marginTop: '50px' }}>
                                <div className='container'>
                                    <div id="content" className="p-6 p-md-10 pt-12">
                                        <NavbarList />
                                        <div className="" style={{ backgroundColor: 'white' }}>
                                            <div class="card-body">
                                            <form  onSubmit={handleEdit} encType='multipart/form-data' >
                                                    <div class="row mb-3">
                                                        <div class="sign-up-container">

                                                            <label style={{ fontSize: '20px' }}>Select A Type</label>

                                                            <div class="col-sm-9 text-secondary">

                                                                <select className="select" name="typeArticle"
                                                                value={typeArticle}
                                                                    onChange={(e) => {
                                                                        setTypeArticle(e.target.value);

                                                                    }}
                                                                >

                                                                    <option value="">Choose one</option>
                                                                    {types?.map((type, key) => {

                                                                        return <option key={key} value={type._id} > {type.label}</option>;
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <br/>
                                                   

                                                    <div class="container">
                                                        <div className='row mb-3 '>
                                                            <div className="col-md-15 offset-md">
                                                                <div className='card'>
                                                                <div class="sign-up-container">
                                                                    <br/>
                                                                    <label style={{ fontSize: '20px' }}>Choose A Theme</label>
                                                                  
                                                                    <div style={{ display: "flex", fontSize: "50px", flexWrap:"wrap" }}>

                                                                        {attributes?.map((item, i) => (

                                                                            <div key={i}>
                                                                                {(attributesAticle[0]===item._id) ? 
                                                                                    <p>
                                                                                    <input type="checkbox" className='checkbox__box'  checked
                                                                                    defaultValue={item._id}
                                                                                    name="attributesAticle"
                                                                                    onChange={(e) => setAttributesAticle([e.target.value])}                                                              

                                                                                   />
                                                                                    </p>
                                                                                    
                                                                                    
                                                                                    :
                                                                                    <input type="checkbox" className='checkbox__box'  
                                                                                    defaultValue={item._id}
                                                                                    name="attributesAticle"
                                                                                   
                                                                                    
                                                                                    onChange={(e) => {
                                                                                        // Destructuring
                                                                                        const { value, checked } = e.target;
                                                                                        console.log(`${value} is ${checked}`);
                
                                                                                        // Case 1 : The user checks the box
                                                                                        if (checked) {
                                                                                            setAttributesAticle([value])
                
                                                                                        }
                                                                                    }}
                
                                                                                    /> 
                                                                              
                                                                                    }

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
                                                            <h6 class="mb-0">Title</h6>
                                                        </div>
                                                        <div class="col-sm-9 text-secondary">
                                                            <input
                                                                type="text"
                                                                name="title"
                                                                className="form-control"
                                                                value={title}
                                                                onChange={(e) => setTitle(e.target.value)}                                                              
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-sm-3">
                                                            <h6 class="mb-0">Bio</h6>
                                                        </div>
                                                        <div class="col-sm-9 text-secondary">

                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="bio"
                                                                value={bio}
                                                                onChange={(e) => setBio(e.target.value)}
                                                                                                                          
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-sm-3">
                                                            <h6 class="mb-0">Abstract</h6>
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
                                                                value={abstract}                                                              
                                                                onChange={(e) => {
                                                                    setAbstract(e.target.value);

                                                                }}

                                                            >

                                                            </textarea>

                                                        </div>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-sm-3">
                                                            <h6 class="mb-0">KeyWords</h6>
                                                        </div>
                                                        <div class="col-sm-9 text-secondary">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="keyWords"
                                                                value={keyWords}
                                                                onChange={(e) => {
                                                                    setKeyWords(e.target.value);

                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="row mb-3">
                                                        <div class="col-sm-3">
                                                            <h6 class="mb-0">Abbreviations</h6>
                                                        </div>
                                                        <div class="col-sm-9 text-secondary">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="abbreviations"
                                                                value={abbreviations}
                                                                onChange={(e) => {
                                                                    setAbbreviations(e.target.value);

                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* <div class="row mb-3">
                                                        <div class="col-sm-3">
                                                            <h6 class="mb-0">Content</h6>
                                                        </div>
                                                        <div class="col-sm-9 text-secondary">
                                                            <input
                                                                type="file"
                                                                name="multiple_files"
                                                                className="file-uploader "
                                                                multiple
                                                                onChange={handlePhoto}
                                                            />
                                                        </div>
                                                    </div> */}
                                                    <div class="row">
                                                    <div class="col-sm-3"></div>
                                                    <div class="col-sm-9 text-secondary">
                                                        <div className="footer">

                                                            <div style={{ display: "inline-flex" }}>

                                                                <button 
                                                                    style={{ borderRadius: "15px" }}
                                                                >
                                                                    Edit Article
                                                                </button>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                </form>
                                                
                                            </div>
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

export default EditArticle;