import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewFile } from '../../redux/Actions/fileActions';
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
import FileViewer from "react-file-viewer";

import {
    FacebookIcon,
    FacebookShareButton,

} from "react-share";
import axios from 'axios';
import TextArea from 'antd/lib/input/TextArea';


export default function AddFile() {

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    // for onchange event
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfFileError, setPdfFileError] = useState('');

    // for submit event
    const [viewPdf, setViewPdf] = useState(null);
    const [viewPdfAxios, setViewPdfAxios] = useState(null);

    // onchange event
    const fileType = ['application/pdf'];
    const handlePdfFileChange = (e) => {


        
        let selectedFile = e.target.files[0];
        console.log('selectedFile',selectedFile)
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setPdfFile(e.target.result);
                    setPdfFileError('');
                }
            }
            else {
                setPdfFile(null);
                setPdfFileError('Please select valid pdf file');
            }
        }
        else {
            console.log('select your file');
        }
    }

    // form submit
    const handlePdfFileSubmit = (e) => {
        e.preventDefault();
        if (pdfFile !== null) {
            setViewPdf(pdfFile);
        }
        else {
            setViewPdf(null);
        }
    }
    const shareUrl = "facebook.com/sharer";
    const [selectetdFile, setSelectedFile] = useState([]);
    const [fileBase64String, setFileBase64String] = useState("");
    const onFileChange = (e) => {
        setSelectedFile(e.target.files);
    //     console.log(e.target.files[0]);
    //     console.log(e.target.files[0].name);
    //     console.log(e.target.files[0].size);
    //     console.log(e.target.files[0].type);
    //   
};
    
      const encodeFileBase64 = (file) => {
        var reader = new FileReader();
        if (file) {
          reader.readAsDataURL(file);
          reader.onload = () => {
            var Base64 = reader.result;
          //  console.log(Base64);
            setFileBase64String(Base64);
          };
          reader.onerror = (error) => {
            console.log("error: ", error);
          };
        }
      };
      const decodeFileBase64 = (base64String) => {
        // From Bytestream to Percent-encoding to Original string
        return decodeURIComponent(
          atob(base64String)
            .split("")
            .map(function (c) {
                console.log(base64String)
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
      };
    
      const decodeBase64 = decodeFileBase64(
        fileBase64String.substring(fileBase64String.indexOf(",") + 1)
      );

    const handleRead = async () => {
        // const { data } = await axios.get(`http://localhost:5000/api/file/${id}`);
        // console.log("user data", data)
        await axios.get(`http://localhost:5000/api/file/get/62706d3a50c1d16c7e27f8b2`,
                )
            .then((response) => {
                    console.log(response);

                    let selectedFile =response.data.data ;
                    if (selectedFile) {
                        if (selectedFile ) {
                            let reader = new FileReader();
                            reader.readAsDataURL(selectedFile);
                            reader.onloadend = () => {
                                setPdfFile(response.data.path);
                                setPdfFileError('');
                            }
                        }
                    }
                   
                }
                  
            

            )
          //  setViewPdfAxios(viewPdfAxios)

    }

    
    return (
        <div className='container'>
              <input type="file" id="input" accept='application/pdf' onChange={onFileChange} />
      <textarea
        maxRows={20}
        value={fileBase64String}
        onChange={encodeFileBase64(selectetdFile[0])}
      />
       <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#D50201",
          height: "60px",
          width: "100%",
          color: "#FFF",
          fontSize: "30px",
        }}
      >
        Files/Image Base64 Decoding
      </div>
      <br />
      <textarea
        style={{ width: "500px" }}
        maxRows={20}
        value={fileBase64String}
      />{" "}
      <textarea
        style={{ width: "500px" }}
        maxRows={20}
        value={decodeBase64}
        onChange={decodeBase64}
      />
    
            <br></br>

            <form className='form-group' onSubmit={handlePdfFileSubmit}>
                <input type="file" className='form-control' 
                    required onChange={handlePdfFileChange}
                />
                {pdfFileError && <div className='error-msg'>{pdfFileError}</div>}
                <br></br>
                <button type="submit" className='btn btn-success btn-lg'>
                    UPLOAD
                </button>
            </form>
            <br>


            </br>
            <h4>View PDF</h4>
            <div className='pdf-container'>
                {/* show pdf conditionally (if we have one)  */}
                {viewPdf && <><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
                    <Viewer fileUrl={viewPdf}
                        plugins={[defaultLayoutPluginInstance]} />
                </Worker></>}

                {/* if we dont have pdf or viewPdf state is null */}
                {!viewPdf && <>No pdf file selected</>}
            </div>

            <br />
            <br />
            <div style={{
                height: '60vh',
                width: '100%'
            }}>
                                
            <FacebookShareButton 
                url={"http://www.localhost:3000"}
                quote={"CampersTribe - World is yours to explore"}
                hashtag="#camperstribe"
                >
                 <FacebookIcon size={36} />
              </FacebookShareButton>

                <button onClick={handleRead}>read</button>
                {!viewPdfAxios ? "No pdf file selected" :
                    <>
                        <FileViewer fileType="application/json" filePath={viewPdfAxios} />
                    </>
                }

            </div>

        </div>
    )
}
