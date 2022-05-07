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
    <div className="" style={{ backgroundColor: 'white' }}>
      <div class="card-body">
        <form onSubmit={handleSubmit} encType='multipart/form-data' >

          <div class="row mb-3">
            <div class="col-sm-2">
            </div>
            <div class="col-sm-9 text-secondary">

              <select className="select" name="typeArticle"
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


          <div class="row mb-3">
            <div class="sign-up-container">

              <label style={{ fontSize: '20px' }}>Choose Categorie</label>

              <div style={{ display: "inline-flex", fontSize: "50px" }}>

                {attributes?.map((item, i) => (

                  <div
                    key={i}>

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

          <div class="row mb-3">
            <div class="col-sm-3">
              <h6 class="mb-0">Title</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              <input
                type="text"
                name="title"
                className="form-control"

                onChange={handleChange}
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
                onChange={handleChangeBio}
              />
            </div>
          </div>



          <div class="row mb-3">
            <div class="col-sm-3">
              <h6 class="mb-0">Abstract</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              <input
                type="text"
                className="form-control"
                name="abstract"
                onChange={(e) => {
                  setAbstract(e.target.value);

                }}
              />
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
                onChange={(e) => {
                  setAbbreviations(e.target.value);

                }}
              />
            </div>
          </div>

          <div class="row mb-3">
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
          </div>

          
        </form>
        <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-9 text-secondary">
              <div  className="footer">

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
   
      </div>

    </div>
  );
}

export default Step3;