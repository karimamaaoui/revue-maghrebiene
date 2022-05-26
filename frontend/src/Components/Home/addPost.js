import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addNewFile, addNewPost } from '../../redux/Actions/fileActions';
import axios from 'axios';
import Swal from 'sweetalert2';


export default function AddPost() {

    const dispatch = useDispatch();
    const history = useNavigate();
    
    
    const addPost = useSelector((state) => state.addPost);
    const { loading, error, posts } = addPost;

    const [imagename, setImagename] = useState("");
    const [pathFile, setFilePath] = useState('');
    const [title, setTitle] = useState('');
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


    const handleSubmit = async(e) => {
        console.log("inside handle submit");

        e.preventDefault();
        const formdata = new FormData();
        formdata.append('title', title);
        formdata.append('pathFile', pathFile);
        formdata.append('imagename', imagename);
       
        const data={imagename,pathFile,title}
        //const data={imagename,pathFile,title}
        // console.log(imagename.length);
        // for (let i = 0; i < imagename.length; i++) {
        //     console.log(imagename[i]);

        //     setImagename(imagename[i]);
        // }
      //  console.log("datta",data)

        dispatch(addNewPost(formdata));
    }

  return (
    <div>
                         <form onSubmit={handleSubmit} encType='multipart/form-data' >
                                                         
                                                            <div class="row mb-3">

                                                                <div class="col-sm-3">
                                                                    <h6 class="mb-0">title</h6>
                                                                </div>
                                                                <div class="col-sm-9 text-secondary">
                                                                    <input
                                                                        type="text"
                                                                         name="title"
                                                                        className="form-control"
                                                                        required
                                                                        defaultValue={title}
                                                                        onChange={ (e) => {

                                                                            setTitle(e.target.value);
                                                                    
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div class="row mb-3">
                                                                <div class="col-sm-3">
                                                                    <h6 class="mb-0">pathFile</h6>
                                                                </div>
                                                                <div class="col-sm-9 text-secondary">

                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="pathFile"
                                                                        defaultValue={pathFile}
                                                                        onChange={(e) => setFilePath(e.target.value)}
                                                                   
                                                                        />
                                                                </div>
                                                            </div>
                                                            <div class="row mb-3">
                                                                <div class="col-sm-3">
                                                                    <h6 class="mb-0">file</h6>
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

                                         
                                                            <div class="row">
                                                                <div class="col-sm-3"></div>
                                                                <div class="col-sm-5 text-secondary">
                                                                    <div className="footer">

                                                                        <div style={{ display: "inline-flex" }}>

                                                                            <button
                                                                                style={{ borderRadius: "15px" }}
                                                                            >
                                                                                submit
                                                                            </button>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        
                                                        </form>
                                                        <div>
                <h1>vdsflkdsfdslfdf {(pathFile)}</h1>
                <img src={pathFile} height="400px"width="100px" className="card-img-top img-responsive" alt="img" />     </div>
            

    </div>
  )
}
