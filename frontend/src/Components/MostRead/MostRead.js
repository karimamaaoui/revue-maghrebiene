import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-st-modal';
import Swal from 'sweetalert2';
import { getAllArticles } from '../../redux/Actions/articleActions';
import NavbarList from '../adminPanel/views/navbarList';
import SidebarScreen from '../sideBar/sidebarScreen';
import FileDownload from "js-file-download"

export default function MostRead() {
    const dispatch = useDispatch();
    const history = useNavigate();


    const [articles, setArticles] = useState([]);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [viewArticle, setViewArticle] = useState([]);
    const [likeArticle, setLikeArticle] = useState([]);
    const [text, setText] = useState('');
    const [noOfElement, setNoOfElement] = useState(3);

    const [view, setView] = useState([]);

    const handleGet = async () => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,

            },
        };

        // console.log("user token", config)

        const { data } = await axios.get('http://localhost:5000/api/file/getallfiles', config);
        console.log("user data", data)
        setArticles(data)


        console.log(data.map((v) => {
            setView(v.view)

            return (
                v.view.length
            )
        }))
    }

    const loadMore = () => {
        setNoOfElement(noOfElement + noOfElement)
    
      }

    useEffect(() => {
        handleGet()

        if (!userInfo) {
            history("/");
        }
    },
        [
            dispatch,
            history,
            userInfo,

        ]);

        const slice = articles?.slice(0, noOfElement)

        const handleView = async (id) => {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
    
                },
            };
            let userId = userInfo.user._id;
            let user = { userId }
    
    
            return await axios.put(`http://localhost:5000/api/file/view/${id}`, user, config)
                .then((res) => {
    
                    console.log(res.data);
                    setViewArticle(res.data)
               
                }).catch(err => {
                    console.log(err)
                })
    
        }
        const handleDownload = async (id) => {
            // const { data } = await axios.get(`http://localhost:5000/api/file/${id}`);
            // console.log("user data", data)
            await axios.get(`http://localhost:5000/api/file/${id}`
                , {
                    responseType: 'blob',
                }
            )
                .then((response) => {
                   // console.log("resp", articles);
    
                    if (response.data.type.includes('pdf')) {
    
                        FileDownload(response.data, 'downloaded.pdf')
                    }
                    else {
                        if (response.data.type.includes('document')) {
    
                            FileDownload(response.data, 'downloaded.docx')
                        }
                        //     else {
    
                        //         FileDownload(response.data, 'downloaded.png')
                        //     }
                    }
    
    
                }
    
                )
        }
        const makeComment = async (id) => {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
    
                },
            };
            let postedBy = userInfo.user._id;
    
            let user = { text, postedBy }
    
            return await axios.put(`http://localhost:5000/api/file/comment/${id}`, user, config)
                .then((res) => {
    
                   // console.log(res.data);
    
                    //console.log('article => ' + JSON.stringify(user));
    
                }).catch(err => {
                    console.log(err)
                })
        }
        const handleLike = async (id) => {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
    
                },
            };
            let userId = userInfo.user._id;
            let user = { userId }
        //    console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', user)
    
    
            return await axios.put(`http://localhost:5000/api/file/like/${id}`, user, config)
                .then((res) => {
    
                 //   console.log(res.data);
                    setLikeArticle(res.data)
    
                 //   console.log('article => ' + JSON.stringify(res.data));
    
                }).catch(err => {
                    console.log(err)
                })
    
        }
    
        const handleFavoris = async (article) => {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
    
                },
            };
            let userId = userInfo.user._id;
            let user = { userId, article }
           // console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', user)
    
    
            return await axios.post(`http://localhost:5000/api/favorite/add/`, user, config)
                .then((res) => {
    
                    console.log(res.data);
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
          

    return (
        <div>
            <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
                <div className="main-body" >
                    <div className="row gutters-sm" style={{ maxWidth: "100%" }}>
                        <SidebarScreen />
                        <div className="col-md-8" style={{ marginTop: '50px' }}>

                            <div className='container'>

                                <div id="content" className="p-6 p-md-10 pt-12">

                                    <NavbarList />


                                    <div className="card mb-3">

                                        <div className="card-body">

                                            <div className="row">
                                                <h1 style={{ color: '#B91736' }}>Most Read::::::::::::::::::::::::::::::::::::::::::::::::::::::::</h1>
                                            </div>
                                            <br />

                                            <div>
                                                {slice.sort((a, b) => b.view.length - a.view.length)
                                                    .map((tdata,index) => {
                                                        return (
                                                            <div>
                                                                <div className='card'>
                                                                    <div class="sign-up-container">
                                                                        <br />


                                                                        <div style={{ display: "inline-flex", fontSize: "50px" }}>


                                                                            <div key={index}>
                                                                                <div class="card-body">
                                                                                    <label style={{ fontSize: '20px' }}>Title:{tdata.title}</label>

                                                                                    <img src={tdata.pathFile} alt="" height="140px" width="30px" />

                                                                                    <p>
                                                                                        Abstract :
                                                                                        {tdata.abstract}
                                                                                        <br />
                                                                                        KeyWords :
                                                                                        {tdata.keyWords}
                                                                                        <br />

                                                                                       Views(s) {tdata.view.length}
                                                                                        <br />

                                                                                        Created At : {tdata.createdAt}

                                                                                        <br />
                                                                                        Type :
                                                                                        {tdata.typeArticle.map(
                                                                                            (type, i) => {
                                                                                                return (
                                                                                                    type.label
                                                                                                )
                                                                                            })
                                                                                        }

                                                                                        <div className="footer">
                                                                                            <div style={{ display: "inline-flex" }}>

                                                                                                <button type='submit' className='primary'
                                                                                                    style={{ borderRadius: "10px" }}
                                                                                                    onClick={async () => {
                                                                                                        handleView(tdata._id);


                                                                                                        const result = await Alert(

                                                                                                            <div className="footer">
                                                                                                                <div style={{ display: "inline-flex" }}>

                                                                                                                    <button type='submit' className='primary'
                                                                                                                        onClick={() => handleDownload(tdata._id)}>
                                                                                                                        download
                                                                                                                    </button>
                                                                                                                </div>
                                                                                                                <div style={{ display: "inline-flex" }}>



                                                                                                                </div>
                                                                                                                <div style={{ display: "inline-flex", }}>

                                                                                                                    <button className="bi bi-hand-thumbs-up-fill"
                                                                                                                        style={{ borderRadius: '10px', width: '100%' }}
                                                                                                                        onClick={() => handleLike(tdata._id)}
                                                                                                                    ></button>
                                                                                                                    <br />
                                                                                                                </div>

                                                                                                                <div style={{ display: "inline-flex", }}>

                                                                                                                    <button className="bi bi-star-fill"
                                                                                                                        style={{ borderRadius: '10px', width: '100%' }}
                                                                                                                        onClick={() => handleFavoris(tdata._id)}
                                                                                                                    ></button>
                                                                                                                    <br />
                                                                                                                </div>

                                                                                                                {(tdata.like.length) > 0 ?

                                                                                                                    <h6 style={{ fontSize: '14px', marginTop: '12px' }}>
                                                                                                                        {tdata.like.length} like(s)
                                                                                                                    </h6>
                                                                                                                    : <h6> </h6>
                                                                                                                }
                                                                                                                {(tdata.view.length) > 0 ?

                                                                                                                    <h6 style={{ fontSize: '14px', marginTop: '12px' }}>
                                                                                                                        <i class="bi bi-eye"></i>

                                                                                                                        {tdata.view.length} view(s)
                                                                                                                    </h6>
                                                                                                                    : <h6> </h6>
                                                                                                                }

                                                                                                                Abstract :
                                                                                                                {tdata.abstract}

                                                                                                            </div>,
                                                                                                            'Load More'


                                                                                                        );

                                                                                                        if (result) {
                                                                                                            //  this.handleBooking(item.id);
                                                                                                            { console.log("id", tdata._id) }

                                                                                                        }
                                                                                                    }}

                                                                                                >

                                                                                                    Load More
                                                                                                </button>
                                                                                                <br />
                                                                                                <form
                                                                                                    onSubmit={(e) => {
                                                                                                        e.preventDefault()
                                                                                                        makeComment(tdata._id)
                                                                                                    }}
                                                                                                >  <input type="text"
                                                                                                    name='text'
                                                                                                    required
                                                                                                    onChange={(e) => {
                                                                                                        setText(e.target.value);

                                                                                                    }} style={{
                                                                                                        borderLeftColor: 'transparent',
                                                                                                        borderTopColor: 'transparent',
                                                                                                        borderRightColor: 'transparent',

                                                                                                    }} placeholder="add a comment" />

                                                                                                </form>

                                                                                            </div>
                                                                                        </div>

                                                                                    </p>
                                                                                </div>


                                                                            </div>


                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                            <div className="row">
                                <div className="col-sm-12">
                                  <button className="btn btn-dark " style={{ textAlign: "center" }} onClick={loadMore}  >
                                    Show More Articles
                                  </button>
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
    )
}
