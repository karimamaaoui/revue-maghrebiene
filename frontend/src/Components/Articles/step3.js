import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listAttribute } from "../../redux/Actions/attributeActions";
import { addNewFile } from "../../redux/Actions/fileActions";
import { listTypes } from "../../redux/Actions/typeAction";
import './formArticle.css'

function Step3() {


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
  const [authors, setAuthors] = useState([userInfo.user._id]);
  const [tags, setTags] = useState([]);
  const [attributesAticle, setAttributesAticle] = useState([]);



  // const handleKeyDown = (e) => {
  //   if (e.key !== 'Enter') return
  //   const value = e.target.value;
  //   if (!value.trim()) return
  //   setTags([...tags, value])

  //   setFormData({ ...formData, keyWords: value });
  //   const { keyWords } = formData;

  //   setFormData({ ...formData, keyWords: [...keyWords, value] })



  //   e.target.value = ''
  // }
  const addFile = useSelector((state) => state.addFile);
  const { loading, error, files } = addFile;


  // const removeTag = (index) => {
  //   setTags(tags.filter((el, i) => i !== index))
  // }


  const handleSubmit = (e) => {
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
    //  console.log("formdata",formData)

    dispatch(addNewFile(formData));

  }
  const handlePhoto = (e) => {
    setMultiple_files(e.target.files);
    setFilename(e.target.files[0].names);
  }

  const handleChange = (e) => {
    setTitle(e.target.value);

  }

  const handleChangeBio = (e) => {
    setBio(e.target.value);

  }

  useEffect(() => {
    dispatch(listTypes());
    dispatch(listAttribute());
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
          <div class="container mt-5">
        <div class="d-flex justify-content-center row">
          <div class="col-md-10 col-lg-10">
            <div class="border">
              <div class="question bg-white p-3 border-bottom">
                <div class="d-flex flex-row justify-content-between align-items-center mcq">
                  <h4>AQ VALIDATION</h4><span>(1 of 20)</span></div>
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

export default Step3;