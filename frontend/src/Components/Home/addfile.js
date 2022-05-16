import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import {
    FacebookIcon,
    FacebookShareButton,

} from "react-share";

import { RWebShare } from "react-web-share";

import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import TextArea from 'antd/lib/input/TextArea';
import ima from '../../assets/bg1.jpg'
import { Alert } from 'reactstrap';

export default function AddFile(props) {

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );
      const  [convertedContent, setConvertedContent] = useState(null);
    
      const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
      }
    
      const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
      }
    
      const createMarkup = (html) => {
        return  {
          __html: DOMPurify.sanitize(html)
        }
      }


    //     const defaultLayoutPluginInstance = defaultLayoutPlugin();

    //     // for onchange event
    //     const [pdfFile, setPdfFile] = useState(null);
    //     const [pdfFileError, setPdfFileError] = useState('');

    //     // for submit event
    //     const [viewPdf, setViewPdf] = useState(null);
    //     const [viewPdfAxios, setViewPdfAxios] = useState(null);

    //     // onchange event
    //     const fileType = ['application/pdf'];
    //     const handlePdfFileChange = (e) => {



    //         let selectedFile = e.target.files[0];
    //         console.log('selectedFile',selectedFile)
    //         if (selectedFile) {
    //             if (selectedFile && fileType.includes(selectedFile.type)) {
    //                 let reader = new FileReader();
    //                 reader.readAsDataURL(selectedFile);
    //                 reader.onloadend = (e) => {
    //                     setPdfFile(e.target.result);
    //                     setPdfFileError('');
    //                 }
    //             }
    //             else {
    //                 setPdfFile(null);
    //                 setPdfFileError('Please select valid pdf file');
    //             }
    //         }
    //         else {
    //             console.log('select your file');
    //         }
    //     }

    //     // form submit
    //     const handlePdfFileSubmit = (e) => {
    //         e.preventDefault();
    //         if (pdfFile !== null) {
    //             setViewPdf(pdfFile);
    //         }
    //         else {
    //             setViewPdf(null);
    //         }
    //     }
    //     const shareUrl = "facebook.com/sharer";
    //     const [selectetdFile, setSelectedFile] = useState([]);
    //     const [fileBase64String, setFileBase64String] = useState("");
    //     const onFileChange = (e) => {
    //         setSelectedFile(e.target.files);
    //     //     console.log(e.target.files[0]);
    //     //     console.log(e.target.files[0].name);
    //     //     console.log(e.target.files[0].size);
    //     //     console.log(e.target.files[0].type);
    //     //   
    // };

    //       const encodeFileBase64 = (file) => {
    //         var reader = new FileReader();
    //         if (file) {
    //           reader.readAsDataURL(file);
    //           reader.onload = () => {
    //             var Base64 = reader.result;
    //           //  console.log(Base64);
    //             setFileBase64String(Base64);
    //           };
    //           reader.onerror = (error) => {
    //             console.log("error: ", error);
    //           };
    //         }
    //       };
    //       const decodeFileBase64 = (base64String) => {
    //         // From Bytestream to Percent-encoding to Original string
    //         return decodeURIComponent(
    //           atob(base64String)
    //             .split("")
    //             .map(function (c) {
    //                 console.log(base64String)
    //               return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    //             })
    //             .join("")
    //         );
    //       };

    //       const decodeBase64 = decodeFileBase64(
    //         fileBase64String.substring(fileBase64String.indexOf(",") + 1)
    //       );

    //     const handleRead = async () => {
    //         // const { data } = await axios.get(`http://localhost:5000/api/file/${id}`);
    //         // console.log("user data", data)
    //         await axios.get(`http://localhost:5000/api/file/get/62706d3a50c1d16c7e27f8b2`,
    //                 )
    //             .then((response) => {
    //                     console.log(response);

    //                     let selectedFile =response.data.data ;
    //                     if (selectedFile) {
    //                         if (selectedFile ) {
    //                             let reader = new FileReader();
    //                             reader.readAsDataURL(selectedFile);
    //                             reader.onloadend = () => {
    //                                 setPdfFile(response.data.path);
    //                                 setPdfFileError('');
    //                             }
    //                         }
    //                     }

    //                 }



    //             )
    //           //  setViewPdfAxios(viewPdfAxios)

    //     }


    // return (
    //     <div className='container'>
    //           <input type="file" id="input" accept='application/pdf' onChange={onFileChange} />
    //   <textarea
    //     maxRows={20}
    //     value={fileBase64String}
    //     onChange={encodeFileBase64(selectetdFile[0])}
    //   />
    //    <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       backgroundColor: "#D50201",
    //       height: "60px",
    //       width: "100%",
    //       color: "#FFF",
    //       fontSize: "30px",
    //     }}
    //   >
    //     Files/Image Base64 Decoding
    //   </div>
    //   <br />
    //   <textarea
    //     style={{ width: "500px" }}
    //     maxRows={20}
    //     value={fileBase64String}
    //   />{" "}
    //   <textarea
    //     style={{ width: "500px" }}
    //     maxRows={20}
    //     value={decodeBase64}
    //     onChange={decodeBase64}
    //   />

    //         <br></br>

    //         <form className='form-group' onSubmit={handlePdfFileSubmit}>
    //             <input type="file" className='form-control' 
    //                 required onChange={handlePdfFileChange}
    //             />
    //             {pdfFileError && <div className='error-msg'>{pdfFileError}</div>}
    //             <br></br>
    //             <button type="submit" className='btn btn-success btn-lg'>
    //                 UPLOAD
    //             </button>
    //         </form>
    //         <br>


    //         </br>
    //         <h4>View PDF</h4>
    //         <div className='pdf-container'>
    //             {/* show pdf conditionally (if we have one)  */}
    //             {viewPdf && <><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
    //                 <Viewer fileUrl={viewPdf}
    //                     plugins={[defaultLayoutPluginInstance]} />
    //             </Worker></>}

    //             {/* if we dont have pdf or viewPdf state is null */}
    //             {!viewPdf && <>No pdf file selected</>}
    //         </div>

    //         <br />
    //         <br />
    //         <div style={{
    //             height: '60vh',
    //             width: '100%'
    //         }}>


    //             <button onClick={handleRead}>read</button>
    //             {!viewPdfAxios ? "No pdf file selected" :
    //                 <>
    //                     <FileViewer fileType="application/json" filePath={viewPdfAxios} />
    //                 </>
    //             }

    //         </div>

    //     </div>
    // )
    //     return(
    //       <>
    // {/* 
    // <a href="#" class="card education">
    //      <div class="overlay"></div>
    //   <div class="circle">

    // <svg width="71px" height="76px" viewBox="29 14 71 76" version="1.1" xmlns="http://www.w3.org/2000/svg" >
    //     <desc>Created with Sketch.</desc>
    //     <defs></defs>
    //     <g id="Group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(30.000000, 14.000000)">
    //         <g id="Group-8" fill="#D98A19">
    //             <g id="Group-7">
    //                 <g id="Group-6">
    //                     <path d="M0,0 L0,75.9204805 L69.1511499,75.9204805 L0,0 Z M14.0563973,32.2825679 L42.9457663,63.9991501 L14.2315268,63.9991501 L14.0563973,32.2825679 Z" id="Fill-1"></path>
    //                 </g>
    //             </g>
    //         </g>
    //         <g id="Group-20" transform="translate(0.000000, 14.114286)" stroke="#FFFFFF" stroke-linecap="square">
    //             <path d="M0.419998734,54.9642857 L4.70316223,54.9642857" id="Line"></path>
    //             <path d="M0.419998734,50.4404762 L4.70316223,50.4404762" id="Line"></path>
    //             <path d="M0.419998734,45.9166667 L4.70316223,45.9166667" id="Line"></path>
    //             <path d="M0.419998734,41.3928571 L2.93999114,41.3928571" id="Line"></path>
    //             <path d="M0.419998734,36.8690476 L4.70316223,36.8690476" id="Line"></path>
    //             <path d="M0.419998734,32.3452381 L4.70316223,32.3452381" id="Line"></path>
    //             <path d="M0.419998734,27.8214286 L4.70316223,27.8214286" id="Line"></path>
    //             <path d="M0.419998734,23.297619 L2.93999114,23.297619" id="Line"></path>
    //             <path d="M0.419998734,18.7738095 L4.70316223,18.7738095" id="Line"></path>
    //             <path d="M0.419998734,14.25 L4.70316223,14.25" id="Line"></path>
    //             <path d="M0.419998734,9.72619048 L4.70316223,9.72619048" id="Line"></path>
    //             <path d="M0.419998734,5.20238095 L2.93999114,5.20238095" id="Line"></path>
    //             <path d="M0.419998734,0.678571429 L4.70316223,0.678571429" id="Line"></path>
    //         </g>
    //     </g>
    // </svg>
    //   </div>
    //   <p>Education</p>
    // </a>
    // <a href="#" class="card credentialing">
    //      <div class="overlay"></div>
    //   <div class="circle">

    // <svg width="64px" height="72px" viewBox="27 21 64 72" version="1.1" xmlns="http://www.w3.org/2000/svg" >
    //     <desc>Created with Sketch.</desc>
    //     <defs>
    //         <polygon id="path-1" points="60.9784821 18.4748913 60.9784821 0.0299638385 0.538377293 0.0299638385 0.538377293 18.4748913"></polygon>
    //     </defs>
    //     <g id="Group-12" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(27.000000, 21.000000)">
    //         <g id="Group-5">
    //             <g id="Group-3" transform="translate(2.262327, 21.615176)">
    //                 <mask id="mask-2" fill="white">
    //                 </mask>
    //                 <g id="Clip-2"></g>
    //                 <path d="M7.17774177,18.4748913 L54.3387782,18.4748913 C57.9910226,18.4748913 60.9789911,15.7266455 60.9789911,12.3681986 L60.9789911,6.13665655 C60.9789911,2.77820965 57.9910226,0.0299638385 54.3387782,0.0299638385 L7.17774177,0.0299638385 C3.52634582,0.0299638385 0.538377293,2.77820965 0.538377293,6.13665655 L0.538377293,12.3681986 C0.538377293,15.7266455 3.52634582,18.4748913 7.17774177,18.4748913" id="Fill-1" fill="#59A785" mask="url(#mask-2)"></path>
    //             </g>
    //             <polygon id="Fill-4" fill="#FFFFFF" transform="translate(31.785111, 30.877531) rotate(-2.000000) translate(-31.785111, -30.877531) " points="62.0618351 55.9613216 7.2111488 60.3692832 1.50838775 5.79374073 56.3582257 1.38577917"></polygon>
    //             <ellipse id="Oval-3" fill="#25D48A" opacity="0.216243004" cx="30.0584472" cy="21.7657707" rx="9.95169733" ry="9.17325562"></ellipse>
    //             <g id="Group-4" transform="translate(16.959615, 6.479082)" fill="#54C796">
    //                 <polygon id="Fill-6" points="10.7955395 21.7823628 0.11873799 11.3001058 4.25482787 7.73131106 11.0226557 14.3753897 27.414824 1.77635684e-15 31.3261391 3.77891399"></polygon>
    //             </g>
    //             <path d="M4.82347935,67.4368303 L61.2182039,67.4368303 C62.3304205,67.4368303 63.2407243,66.5995595 63.2407243,65.5765753 L63.2407243,31.3865871 C63.2407243,30.3636029 62.3304205,29.5263321 61.2182039,29.5263321 L4.82347935,29.5263321 C3.71126278,29.5263321 2.80095891,30.3636029 2.80095891,31.3865871 L2.80095891,65.5765753 C2.80095891,66.5995595 3.71126278,67.4368303 4.82347935,67.4368303" id="Fill-8" fill="#59B08B"></path>
    //             <path d="M33.3338063,67.4368303 L61.2181191,67.4368303 C62.3303356,67.4368303 63.2406395,66.5995595 63.2406395,65.5765753 L63.2406395,31.3865871 C63.2406395,30.3636029 62.3303356,29.5263321 61.2181191,29.5263321 L33.3338063,29.5263321 C32.2215897,29.5263321 31.3112859,30.3636029 31.3112859,31.3865871 L31.3112859,65.5765753 C31.3112859,66.5995595 32.2215897,67.4368303 33.3338063,67.4368303" id="Fill-10" fill="#4FC391"></path>
    //             <path d="M29.4284029,33.2640869 C29.4284029,34.2202068 30.2712569,34.9954393 31.3107768,34.9954393 C32.3502968,34.9954393 33.1931508,34.2202068 33.1931508,33.2640869 C33.1931508,32.3079669 32.3502968,31.5327345 31.3107768,31.5327345 C30.2712569,31.5327345 29.4284029,32.3079669 29.4284029,33.2640869" id="Fill-15" fill="#FEFEFE"></path>
    //             <path d="M8.45417501,71.5549073 L57.5876779,71.5549073 C60.6969637,71.5549073 63.2412334,69.2147627 63.2412334,66.3549328 L63.2412334,66.3549328 C63.2412334,63.4951029 60.6969637,61.1549584 57.5876779,61.1549584 L8.45417501,61.1549584 C5.34488919,61.1549584 2.80061956,63.4951029 2.80061956,66.3549328 L2.80061956,66.3549328 C2.80061956,69.2147627 5.34488919,71.5549073 8.45417501,71.5549073" id="Fill-12" fill="#5BD6A2"></path>
    //         </g>
    //     </g>
    // </svg>

    //   </div>
    //   <p>Credentialing</p>
    // </a>


    // <a href="#" class="card wallet">
    //      <div class="overlay"></div>
    //   <div class="circle">


    // <svg width="78px" height="60px" viewBox="23 29 78 60" version="1.1" xmlns="http://www.w3.org/2000/svg" >
    //     <desc>Created with Sketch.</desc>
    //     <defs></defs>
    //     <g id="icon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(23.000000, 29.500000)">
    //         <rect id="Rectangle-3" fill="#AC8BE9" x="67.8357511" y="26.0333433" width="9.40495664" height="21.8788565" rx="4.70247832"></rect>
    //         <rect id="Rectangle-3" fill="#6A5297" x="67.8357511" y="38.776399" width="9.40495664" height="10.962961" rx="4.70247832"></rect>
    //         <polygon id="Rectangle-2" fill="#6A5297" points="57.3086772 0 67.1649301 26.3776902 14.4413177 45.0699507 4.58506484 18.6922605"></polygon>
    //         <path d="M0,19.6104296 C0,16.2921718 2.68622235,13.6021923 5.99495032,13.6021923 L67.6438591,13.6021923 C70.9547788,13.6021923 73.6388095,16.2865506 73.6388095,19.6104296 L73.6388095,52.6639057 C73.6388095,55.9821635 70.9525871,58.672143 67.6438591,58.672143 L5.99495032,58.672143 C2.68403068,58.672143 0,55.9877847 0,52.6639057 L0,19.6104296 Z" id="Rectangle" fill="#8B6FC0"></path>
    //         <path d="M47.5173769,27.0835169 C45.0052827,24.5377699 40.9347162,24.5377699 38.422622,27.0835169 L36.9065677,28.6198808 L35.3905134,27.0835169 C32.8799903,24.5377699 28.8078527,24.5377699 26.2957585,27.0835169 C23.7852354,29.6292639 23.7852354,33.7559532 26.2957585,36.3001081 L36.9065677,47.0530632 L47.5173769,36.3001081 C50.029471,33.7559532 50.029471,29.6292639 47.5173769,27.0835169" id="Fill-12" fill="#F6F1FF"></path>
    //         <rect id="Rectangle-4" fill="#AC8BE9" x="58.0305835" y="26.1162588" width="15.6082259" height="12.863158"></rect>
    //         <ellipse id="Oval" fill="#FFFFFF" cx="65.8346965" cy="33.0919007" rx="2.20116007" ry="2.23319575"></ellipse>
    //     </g>
    // </svg>

    //   </div>
    //   <p>Wallet</p>
    // </a>
    // <a href="#" class="card human-resources">
    //      <div class="overlay"></div>
    //   <div class="circle">


    // <svg width="66px" height="77px" viewBox="1855 26 66 77" version="1.1" xmlns="http://www.w3.org/2000/svg" >
    //     <desc>Created with Sketch.</desc>
    //     <defs></defs>
    //     <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(1855.000000, 26.000000)">
    //         <path d="M4.28872448,42.7464904 C4.28872448,39.3309774 5.4159227,33.7621426 6.40576697,30.4912557 C10.5920767,32.1098991 14.3021264,35.1207513 18.69596,35.1207513 C30.993618,35.1207513 42.5761396,28.7162991 49.9992251,17.9014817 C56.8027248,23.8881252 60.8188351,33.0463165 60.8188351,42.7464904 C60.8188351,60.817447 47.6104607,76.6693426 32.5537798,76.6693426 C17.4970989,76.6693426 4.28872448,60.817447 4.28872448,42.7464904" id="Fill-8" fill="#AFCEFF"></path>
    //         <path d="M64.3368879,31.1832696 L62.8424171,46.6027478 L60.6432609,46.7824348 L59.8340669,34.6791304 L47.6573402,25.3339478 C44.2906753,34.068487 34.3459503,40.2903304 24.4684093,40.2903304 C17.7559812,40.2903304 10.046244,37.4168 5.80469412,32.8004522 L5.80469412,34.6791304 L5.80469412,46.6027478 L4.28932167,46.6027478 L1.30187314,27.8802435 C1.30187314,20.9790957 3.52342407,15.5432 7.27229127,11.3578087 C13.132229,4.79558261 21.8124018,0.0492173913 30.5672235,0.342852174 C37.4603019,0.569286957 42.6678084,2.72991304 50.8299179,0.342852174 C51.4629405,1.44434783 51.8615656,3.00455652 51.5868577,5.22507826 C51.4629405,6.88316522 51.2106273,7.52302609 50.8299179,8.45067826 C58.685967,14.1977391 64.3368879,20.7073739 64.3368879,31.1832696" id="Fill-10" fill="#3B6CB7"></path>
    //         <path d="M58.9405197,54.5582052 C62.0742801,54.8270052 65.3603242,52.60064 65.6350321,49.5386574 C65.772386,48.009127 65.2617876,46.5570226 64.3182257,45.4584487 C63.3761567,44.3613357 62.0205329,43.6162922 60.4529062,43.4818922 L58.9405197,54.5582052 Z" id="Fill-13" fill="#568ADC"></path>
    //         <path d="M6.32350389,54.675367 C3.18227865,54.8492104 0.484467804,52.4957496 0.306803449,49.4264626 C0.217224782,47.8925496 0.775598471,46.4579757 1.75200594,45.3886191 C2.7284134,44.3192626 4.10792487,43.6165843 5.67853749,43.530393 L6.32350389,54.675367 Z" id="Fill-15" fill="#568ADC"></path>
    //     </g>
    // </svg>

    //   </div>
    //   <p>Human Resources</p>
    // </a> */}
    // {/* 
    // <h1>Card Flip with Text</h1>
    // <h3>Hover over the image below:</h3>

    // <div class="flip-card">
    //   <div class="flip-card-inner">
    //     <div class="flip-card-front">
    //       <img src="img_avatar.png" alt="Avatar" style={{width:"300px",height:"300px"}}/>
    //     </div>
    //     <div class="flip-card-back">
    //       <h1>John Doe</h1> 
    //       <p>Architect and Engineer</p> 
    //       <p>We love that guy</p>
    //     </div>
    //   </div>
    // </div> */}
    // {/* <div class="row mb-3" >
    // <div class="col-lg-4 mb-3 ">
    // <div class="content">
    // <div class="content-overl­ay"></div> <img alt="users" class="content-image" src="" />
    // <div class="content-detai­ls fadeIn-bottom">
    // <h3 class="content-title­" style={{ fontFamily:'bold', fontSize: '20px', color:'black' }}> Utilisateurs</h3>
    // </div>
    // </div>
    // </div>
    // <div class="col-lg-4 mb-3">
    // <div class="content">
    // <div class="content-overl­ay">
    //   </div>­
    //    <img alt="orders" class="content-image" src=""  />
    // <div class="content-detai­ls fadeIn-bottom">
    // <h3 class="content-title­" style={{ fontFamily:'bold', fontSize: '20px', color:'black' }}>dvddf­Commandes</h3>
    // </div>
    // </div>
    // </div>
    // <div class="col-lg-4 mb-3">
    // <div class="content">
    // <div class="content-overl­ay"></div>
    //  <img alt="products" class="content-image" src="" />
    // <div class="content-detai­ls fadeIn-bottom">
    // <h3 class="content-title­" style={{ fontFamily:'bold', fontSize: '20px', color:'black' }}>fgfgP­roduits</h3>
    // </div>
    // </div>
    // </div>
    // </div> */}
    // {/* 
    //   <div className='wrapper'>
    //   <div className='card'>
    //     <img src={ima} />
    //     <div className='info'>
    //       <h1>dfdfd</h1>
    //       <p>
    //         sdsdddddddddddddddddddddddddddddddddd
    //       </p>
    //       <button>read more</button>
    //     </div>
    //   </div>

    //   <div className='card'>
    //   <img src={ima} />
    //     <div className='info'>
    //       <h1>dfdfd</h1>
    //       <p>
    //         sdsdddddddddddddddddddddddddddddddddd
    //       </p>
    //       <button>read more</button>
    //     </div>
    //   </div>

    //   <div className='card'>
    //   <img src={ima} />
    //     <div className='info'>
    //       <h1>dfdfd</h1>
    //       <p>
    //         sdsdddddddddddddddddddddddddddddddddd
    //       </p>
    //       <button>read more</button>
    //     </div>
    //   </div>


    //   </div>
    //        */}


    //     <>
    //     <div class="container mt-40">
    //             <h3 class="text-center">Hover Effect Style : Demo - 15</h3>
    //             <div class="row mt-30">
    //                 <div class="col-md-3 col-sm-6">
    //                     <div class="box15">
    //                         <img class="pic-1" src="https://www.w3schools.com/bootstrap4/img_avatar3.png"/>
    //                         <div class="box-content">
    //                             <h3 class="title">Williamson</h3>
    //                             <ul class="icon">
    //                                 <li><a href="#"><i class="fa fa-search"></i></a></li>
    //                                 <li><a href="#"><i class="fa fa-link"></i></a></li>
    //                             </ul>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div class="col-md-3 col-sm-6">
    //                     <div class="box15">
    //                         <img class="pic-1" src="https://www.w3schools.com/bootstrap4/img_avatar4.png"/>
    //                         <div class="box-content">
    //                             <h3 class="title">Kristiana</h3>
    //                             <ul class="icon">
    //                                 <li><a href="#"><i class="fa fa-search"></i></a></li>
    //                                 <li><a href="#"><i class="fa fa-link"></i></a></li>
    //                             </ul>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div class="col-md-3 col-sm-6">
    //                     <div class="box15">
    //                         <img class="pic-1" src="https://www.w3schools.com/bootstrap4/img_avatar5.png"/>
    //                         <div class="box-content">
    //                             <h3 class="title">Kristiana</h3>
    //                             <ul class="icon">
    //                                 <li><a href="#"><i class="fa fa-search"></i></a></li>
    //                                 <li><a href="#"><i class="fa fa-link"></i></a></li>
    //                             </ul>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div class="col-md-3 col-sm-6">
    //                     <div class="box15">
    //                         <img class="pic-1" src="https://www.w3schools.com/bootstrap4/img_avatar3.png"/>
    //                         <div class="box-content">
    //                             <h3 class="title">Kristiana</h3>
    //                             <ul class="icon">
    //                                 <li><a href="#"><i class="fa fa-search"></i></a></li>
    //                                 <li><a href="#"><i class="fa fa-link"></i></a></li>
    //                             </ul>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //        <br/>
    //        <br/>


    //        <br/>
    //        <br/>

    //         <div class="col-md-4 col-xl-3">
    //             <div >

    //               <div class="card-block" >

    //             <div class="box15">
    //                         <div class="box-content">
    //                         <img class="pic-1" src="https://www.w3schools.com/bootstrap4/img_avatar3.png" />

    //                             <h3 class="title">Kristiana</h3>
    //                             <ul class="icon">
    //                                 <li><a href="#"><i class="fa fa-search"></i></a></li>
    //                                 <li><a href="#"><i class="fa fa-link"></i></a></li>
    //                             </ul>
    //                         </div>
    //                     </div>

    //                  <br/>


    //                  <br/>


    // {/*         
    //                 <h6 class="m-b-20"  >
    //                   <a href="#usersList" style={{ color: "white" }} >

    //                     Users List
    //                   </a>
    //                 </h6>
    //                 <h2 class="text-right"><i class="fa fa-cart-plus f-left"></i><span></span></h2>
    //                 <a href="">
    //                   <p class="m-b-0">Users<span class="f-right"></span></p></a> */}
    //               </div>
    //             </div>
    //           </div>



    //       </>

    //       </>
    //     )

    const [url, setUrl] = useState("");
    const [file, setFile] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("file", file.data);
        const response = await axios.post("http://localhost:5000/file/drive", formData
        );

        const responseWithBody = await response.json();
        if (response) setUrl(responseWithBody.publicUrl);
    };



    const handleFileChange = (e) => {
        const file = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        };
        setFile(file);
    };

    const [fileURL, setFileURL] = useState(null);
    let urlfile;
    const [files, setFiles] = useState(null);

    const [tags, setTags] = useState([]);

    const handleRead = async (id) => {
        const { data: pdf } = await axios.get(`http://localhost:5000/api/file/get/627a644444f9c7fa0bb8ae64`,

            {
                responseType: 'arraybuffer',
                responseEncoding: 'binary',

                headers: {
                    "Content-type": "application/pdf",
                },
            }
        );

        const blob = new Blob([pdf], {
            type: 'application/pdf'
        });
        const fileURL = URL.createObjectURL(blob);
        let params = URL.revokeObjectURL(fileURL);

        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', params)

        setFileURL(fileURL)

        window.open(fileURL, '_blank', 'location=yes,height=650,width=1000,scrollbars=yes,status=yes');

        //  console.log(new Blob([new Uint8Array(pdf)]))
        //  { console.log("eeeeeeeeeeeeeeeee", fileURL) }
        //  urlfile=fileURL.slice(5,fileURL.length)

        // console.log("urfdfdf",urlfile)
    }
    const [keyWords, setKeyWords] = useState([]);
    const [isValidKeyWords, setIsValidKeyWords] = useState(false);
    const [messageKeyWords, setMessageKeyWords] = useState('');

    const handleKeyDown = (e) => {
        if (e.key !== 'Enter') return
        const value = e.target.value;
        if (!value.trim()) return

        if (tags.length ===5) 
        {
            setIsValidKeyWords(false);
            setMessageKeyWords('Please enter only five keywords!');
        
        }
          else{
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

    console.log('tags', tags)
    console.log('keyword', keyWords)


    const handleFiles = async (id) => {
        const { data } = await axios.get(`http://localhost:5000/api/file/getfiles/627a644444f9c7fa0bb8ae64`,


        );

        console.log("urfdfdf", data)
    }


    useEffect(() => {
        //  handleRead()
    },
        [

        ]);

    return (

        <>
                 <div className="row">

                                                            <div className="col-md-6" style={{ margin: "auto", marginTop: "50px" }}>
                                                                <div style={{ textAlign: "center" }}>
                                                                    <h3>Rich Text Editor</h3>
                                                                </div>
                                               
           <div className="">
        Rich Text Editor Example
      </div>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
      </div>
      </div>
            {/*         
            <button type='submit' className='primary'
                onClick={() => handleFiles()}>


                Read
            </button>
            <FacebookShareButton
                url={files}
                quote={"CampersTribe - World is yours to explore"}
                hashtag="#camperstribe"
            >
                <FacebookIcon size={36} />
            </FacebookShareButton>
            {/* <form onSubmit={handleSubmit}>
      <input type="file" name="file" onChange={handleFileChange}></input>
      <button type="submit">Submit</button>
    </form> */}

                       
            <br />
            {/*       
        <div>
      <h1>Web Share - GeeksforGeeks</h1>
      <Link to={urlfile}>dfdd      </Link>

      <RWebShare
        data={{
          text: "Web Share - GfG",
          title: "GfG",
          url:""
        }}
        onClick={() => handleRead()}
      >
        <button>Share on Web</button>
      </RWebShare>
      
    </div>
       */}
        </>

    );
}

{/* <div class="container-fluid mb-5">
    <div class="text-center mt-5">
        <h1>Our Services</h1>
    </div>
    <div class="row">
   <div class="col-md-2 ">
             <div class="">
                   <div class="box">
                <div class="our-services settings">
                    <div class="icon"> <img src="https://i.imgur.com/6NKPrhO.png"/> </div>
                    <h4>Settings</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </div>
            </div></div>
        </div>
        <div class="col-md-2">
            <div class="box">
                <div class="our-services speedup">
                    <div class="icon"> <img src="https://i.imgur.com/KMbnpFF.png"/> </div>
                    <h4>Speedup</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </div>
            </div>
        </div>
        <div class="col-md-2">
            <div class="box">
                <div class="our-services privacy">
                    <div class="icon"> <img src="https://i.imgur.com/AgyneKA.png"/> </div>
                    <h4>Privacy</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
                </div>
            </div>
        </div>
    </div>
     <div class="row">
        <div class="col-md-2">
            <div class="box">
                <div class="our-services backups">
                    <div class="icon"> <img src="https://i.imgur.com/vdH9LKi.png"/> </div>
                    <h4>Backups</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
                </div>
            </div>
        </div>
        <div class="col-md-2">
            <div class="box">
                <div class="our-services ssl">
                    <div class="icon"> <img src="https://i.imgur.com/v6OnUqu.png"/> </div>
                    <h4>SSL secured</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </div>
            </div>
        </div>
        <div class="col-md-2">
            <div class="box">
                <div class="our-services database">
                    <div class="icon"> <img src="https://i.imgur.com/VzjZw9M.png"/> </div>
                    <h4>Database</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </div>
            </div>
        </div>
    </div> 
</div> */}


