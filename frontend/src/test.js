import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewFile } from './redux/Actions/fileActions';
import SidebarScreen from './Components/sideBar/sidebarScreen';
import NavbarList from './Components/adminPanel/views/navbarList';
import Loading from './Components/Authentification/Loading';
import ErrorMessage from './Components/Authentification/ErrorMessage';

const Test = () => {
    const [newTest, setNewTest] = useState(
        {
            multiple_files: '',
        }
    );
    const [multiple_files, setMultiple_files] = useState([]);
    const [filename, setFilename] = useState('choose file');
    const [selectecdFiles, setSelectedFiles] = [];
    const [title, setTitle] = useState('');
    const [bio, setBio] = useState('');

    const dispatch = useDispatch();
    const history = useNavigate();

    const addFile = useSelector((state) => state.addFile);
    const { loading, error, files } = addFile;
    
  

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

        //     const config = {
        //         headers: {
        //             Accept: 'application/json',
        //             'content-type': 'multipart/form-data',

        //         },
        //     };
        //     axios.post('http://localhost:5000/api/file/multiple-upload', formData, config)
        //         .then(res => {

        //             console.log("res", res);

        //         })
        //         .catch(err => {
        //             console.log(err);
        //         });
        // 
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
    return (
        <>
          {/* <label style={{ marginLeft: '-150px' }}>Title</label>

      <input
        type="text"
        placeholder="Enter title..."
        value={formData.title}
        onChange={(event) =>
          setFormData({ ...formData, title: event.target.value })
        }
      />
      <label style={{ marginLeft: '-130px' }}>Abstract</label>

      <input
        type="text"
        placeholder="Enter abstract..."
        value={formData.abstract}
        onChange={(event) =>
          setFormData({ ...formData, abstract: event.target.value })
        }
      />
      <label style={{ marginLeft: '-130px' }}>Content</label>

      <input
        type="text"
        placeholder="Enter content..."
        value={formData.content}
        onChange={(event) =>
          setFormData({ ...formData, content: event.target.value })
        }
      />


      <label style={{ marginLeft: '-100px' }}>Abbreviations</label>

      <input
        type="text"
        placeholder="Enter abbreviations..."
        value={formData.other}
        onChange={(e) => {
          setFormData({ ...formData, abbreviations: e.target.value });
        }}
      />
      <label style={{ marginLeft: '-120px' }}>KeyWords</label>

      <div className="tags-input-container">
        {console.log("tags", tags)}
        {tags.map((tag, index) => (
          <div className="tag-item" key={index}>
            <span className="text"

            >
              {tag}
            </span>
            <span className="close" onClick={() => removeTag(index)}>
              &times;
            </span>

          </div>

        )
        )}

        <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="type something" onChange={(e) => {
          setFormData({ ...formData, keyWords: tags });
          { console.log("formData.keyWords", formData.keyWords) }

        }}
        />
      </div>*/}
    
   {loading && <Loading />}
      {error && <ErrorMessage variant="danger">Error</ErrorMessage>}

   
            <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
                <div className="main-body" >
                    <div className="row gutters-sm" style={{ maxWidth: "100%" }}>
                        <SidebarScreen />
                        <div className="col-md-8" style={{ marginTop: '50px' }}>

                            <div className='container'>

                                <div id="content" className="p-6 p-md-10 pt-12">
                                    <NavbarList />


                                    {/* <div className="progressbar">
                  <div
                    style={{ width: page === 0 ? "25%" : page === 1 ? "50%" : page === 2 ? "75%": "100%" }}>

                  </div>
                </div>
   */}


                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="row">
                                                <h1>Add New Article</h1>
                                            </div>
                                            <div className="other-info-container" style={{ backgroundColor: 'white' }}>
                                            <div className="footer">
                    <br/>
                    <div style={{display:"inline-flex"}}>

                                            <form onSubmit={handleSubmit} encType='multipart/form-data'>


                                                <input
                                                    type="file"
                                                    name="multiple_files"
                                                    multiple
                                                    onChange={handlePhoto}
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
                                            </form>
                                            </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Test;