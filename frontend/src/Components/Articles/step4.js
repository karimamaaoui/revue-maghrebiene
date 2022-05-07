import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { addnewArticle } from "../../redux/Actions/articleActions";
import './formArticle.css'
import { addNewFile } from "../../redux/Actions/fileActions";
import Loading from "../Authentification/Loading";
import ErrorMessage from "../Authentification/ErrorMessage";
import { Button } from "react-bootstrap";

function Step4({ formData, setFormData }) {

  const dispatch = useDispatch();
  const history = useNavigate();

  const addArticle = useSelector((state) => state.addArticle);
  const { loading, error, article, success } = addArticle;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [multiple_files, setMultiple_files] = useState([]);

  const formFileData = new FormData();
  formFileData.append('multiple_files', multiple_files);


  const addFile = useSelector((state) => state.addFile);
  const { loadingAddFile, errorAddFile, multiple_file } = addFile;


  const [filename, setFilename] = useState('choose file');

  const submitHandler = async (e) => {

    e.preventDefault();
    //console.log("user info from register",addnewArticle(formData))

    dispatch(addNewFile(formData));

  }

  const handleFile = async (e) => {


    e.preventDefault();
    console.log(multiple_files.length);
    for (let i = 0; i < multiple_files.length; i++) {
      console.log(multiple_files[i]);

      formFileData.append('multiple_files', multiple_files[i]);
    }
    dispatch(addNewFile(formFileData));
    console.log(" FILE ", formFileData)

    const { articleFiles } = formData;

    setFormData({ ...formData, articleFiles: [...articleFiles, addFile.multiple_files._id] });
    console.log('addFile.multiple_files._id', addFile.multiple_files._id)

  }
  console.log("MULTIPLE FILE ", multiple_files._id)

  const handlePhoto = (e) => {
    setMultiple_files(e.target.files);
    setFilename(e.target.files[0].names);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('multiple_files', multiple_files);
    formData.append('title', title);
    formData.append('bio', bio);

    console.log(multiple_files.length);
    for (let i = 0; i < multiple_files.length; i++) {
      console.log(multiple_files[i]);

      formData.append('multiple_files', multiple_files[i]);
    }

    dispatch(addNewFile(formData));
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    addArticle,

  ]);

  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');

  const handlefileAdd = (e) => {
    setMultiple_files(e.target.files);

    setFilename(e.target.files[0].names);
}

const handleChange = (e) => {
    setTitle(e.target.value);

}

const handleChangeBio = (e) => {
    setBio(e.target.value);

}


  return (
    <>
      {loading && <Loading />}
      {error && <ErrorMessage variant="danger">Error</ErrorMessage>}

      <div className="personal-info-container" style={{ backgroundColor: 'white' }}>
        <form onSubmit={handleFile} encType='multipart/form-data'>
          <label style={{ marginLeft: '-150px' }}>File</label>
          <br />
          <input
            type="file"
            name="multiple_files"
            multiple
            onChange={handlePhoto}
          />



          <Button
            type="submit" >Add</Button>
        </form>




      </div>

      {/* <form onSubmit={handleSubmit} encType='multipart/form-data'>


        <input
          type="file"
          name="multiple_files"
          multiple
          onChange={handlefileAdd}
        />

        <input
          type="text"
          name="title"
          onChange={handleChange}
        />


        <input
          type="text"
          name="bio"
          onChange={handleChangeBio}


        />
        <input
          type="submit"
        />
      </form> */}

    </>

  );
}

export default Step4;