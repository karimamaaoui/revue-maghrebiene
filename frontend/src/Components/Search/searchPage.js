import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllArticlePaginate, getAllArticles, getArticleByAttribute, getArticleByFilter, getArticleByType, getRandomArticle } from '../../redux/Actions/articleActions';
import NavbarList from '../adminPanel/views/navbarList'
import SidebarScreen from '../sideBar/sidebarScreen'
import FileDownload from "js-file-download"
import { listTypes } from '../../redux/Actions/typeAction';
import ReadMoreReact from 'read-more-react';
import { Confirm, Prompt, Alert } from 'react-st-modal';
import ReactPaginate from 'react-paginate'
import { listAttribute } from '../../redux/Actions/attributeActions';
import './search.css'


export default function SearchPahe() {

    const dispatch = useDispatch();
    const history = useNavigate();


    const getAllArticle = useSelector((state) => state.getAllArticle);
    const { loadingGetAllArticle, errorGetAllArticle, articles } = getAllArticle;
    const [searchResult, setSearchResult] = useState(articles);


    const articleFilters = useSelector((state) => state.articleFilters);
    const { loadingArticleFilters, errorArticleFilters, articleFilter } = articleFilters;


    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const typeList = useSelector((state) => state.typeList);
    const { loadingType, errorType, types } = typeList;
    //  const { typeList } = useSelector(state => state.typeList);
    const attributeList = useSelector((state) => state.attributeList);
    const { loadingAttribute, errorAttribute, attributes } = attributeList;
    const [searchInput, setSearchInput] = useState('');
    const [typeIds, setTypeIds] = useState([]);
    const [attributeIds, setAttributeIds] = useState([]);
    const [likeArticle, setLikeArticle] = useState([]);
    const [viewArticle, setViewArticle] = useState([]);

    const [text, setText] = useState('');
    //paginate
    const [items, setItems] = useState([])
    const handlePageClick = (data) => {

        console.log("efefef", data.selected);
        let currentPage = data.selected + 1;
        dispatch(getAllArticlePaginate(currentPage));
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", currentPage);

    }



    useEffect(() => {
        dispatch(getAllArticles());
        console.log('articme', articles)
        dispatch(listTypes());
        dispatch(listAttribute());

        //console.log("articles", types)

        if (!userInfo) {
            history("/");
        }
    },
        [
            dispatch,
            history,
            userInfo,
            viewArticle,
            likeArticle

        ]);

    const filterContent = (articleFilter, searchTerm) => {
        if (searchTerm !== '') {

            const result = articles.filter((article) => {
                return (article.title.toLowerCase().startsWith(searchTerm) ||
                    article.abstract.toLowerCase().startsWith(searchTerm) ||
                    article.abbreviations.toLowerCase().startsWith(searchTerm) ||
                    article.status.toLowerCase().startsWith(searchTerm)


                );
            }
            );
            setSearchResult(result);

        }
        else {
            setSearchResult(articles);

        }

        console.log("searchResult", searchResult)


    }

    const handleSearch = async (e) => {

        const searchTerm = e.currentTarget.value;
        setSearchInput(searchTerm)

        dispatch(getArticleByFilter(articleFilter, searchTerm));

        filterContent(articleFilter, searchTerm)

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
                console.log("resp", articles);

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

                console.log(res.data);

                console.log('article => ' + JSON.stringify(user));

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
        console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', user)


        return await axios.put(`http://localhost:5000/api/file/like/${id}`, user, config)
            .then((res) => {

                console.log(res.data);
                setLikeArticle(res.data)

                console.log('article => ' + JSON.stringify(res.data));

            }).catch(err => {
                console.log(err)
            })

    }


    const handleView = async (id) => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,

            },
        };
        let userId = userInfo.user._id;
        let user = { userId }
        console.log('view', user)


        return await axios.put(`http://localhost:5000/api/file/view/${id}`, user, config)
            .then((res) => {

                console.log(res.data);
                setViewArticle(res.data)
                console.log('vvvvvvvvvvvvvvvvvvvvvvvvv', viewArticle)

                console.log('view => ' + JSON.stringify(res.data));

            }).catch(err => {
                console.log(err)
            })

    }
    const [fileURL, setFileURL] = useState('');
console.log('fileURL',fileURL)

    const handleRead = async (id) => {
        const { data: pdf } = await axios.get(`http://localhost:5000/api/file/get/${id}`,

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
          setFileURL(fileURL)
          
          window.open(fileURL, '_blank', 'location=yes,height=650,width=1000,scrollbars=yes,status=yes');


           // console.log("user data", pdf)
            //  await axios.get(`http://localhost:5000/api/file/get/${id}`
            //     , {
            //         responseType: 'blob',
            //     }
            // )
            // .then((response) => {
            //     console.log("resp", response);
            // }

          //  )
        //  console.log(Buffer.from(pdf).toString('base64'));

          console.log(  new Blob([new Uint8Array(pdf)]))

    }
    const handleCategory = e => {

        const currentCategoryChecked = e.target.value;
        const allCategoriesChecked = [...typeIds];
        const indexFound = allCategoriesChecked.indexOf(currentCategoryChecked);

        let updatedCategoryIds;
        if (indexFound === -1) {
            // add
            updatedCategoryIds = [...typeIds, currentCategoryChecked];
            console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', updatedCategoryIds)
            setTypeIds(updatedCategoryIds);
        } else {
            // remove
            updatedCategoryIds = [...typeIds];
            updatedCategoryIds.splice(indexFound, 1);
            setTypeIds(updatedCategoryIds);
        }



        dispatch(getArticleByType(updatedCategoryIds));


    };


    const handleAttribute = e => {

        const currentAttributeChecked = e.target.value;
        const allAttributeChecked = [...attributeIds];
        const indexFound = allAttributeChecked.indexOf(currentAttributeChecked);

        let updatedAttributeIds;
        if (indexFound === -1) {
            // add
            updatedAttributeIds = [...attributeIds, currentAttributeChecked];
            console.log('updatedAttributeIds ', updatedAttributeIds)
            setAttributeIds(updatedAttributeIds);
        } else {
            // remove
            updatedAttributeIds = [...attributeIds];
            updatedAttributeIds.splice(indexFound, 1);
            setAttributeIds(updatedAttributeIds);
        }


        dispatch(getArticleByAttribute(updatedAttributeIds));


    };

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
                                                <h1 style={{ color: 'rgb(151, 213, 230)' }}>Search::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::</h1>
                                            </div>
                                            <br />
                                            <div className="row ">
                                                <div className='col-md-3 border-right'>

                                                    <div className='text-muted mb-2' >
                                                        Filters {' '} <span className="bi bi-sliders2" ></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='border-top border-bottom bg-light p-3 '>
                                                <div className='row justify-content-around'>
                                                    <div className='col-lg-3'>
                                                        <label>To research </label>
                                                        <input className="mr-sm-2"
                                                            type="search"
                                                            name="key"
                                                            placeholder="enter a word "
                                                            aria-label="Search"
                                                            onChange={handleSearch}
                                                        />
                                                    </div>

                                                    <div className='col-4' style={{ display: "flex", fontSize: "15px", flexWrap: "wrap" }}>
                                                        <p>   Choose  Type : </p>

                                                        {types &&
                                                            types.map(c => (
                                                                <div key={c._id} className='form-check' >
                                                                    <input
                                                                        className='form-check-input'
                                                                        type='checkbox'
                                                                        name='types'
                                                                        value={c._id}

                                                                        id='flexCheckChecked'
                                                                        checked={typeIds.includes(c._id)}
                                                                        onChange={handleCategory}
                                                                    />
                                                                    <label
                                                                        className='form-check-label'
                                                                        htmlFor='flexCheckChecked'
                                                                    >
                                                                        {c.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                    </div>



                                                    <div className='col-4' style={{ display: "flex", fontSize: "15px", flexWrap: "wrap" }}>
                                                        <p>   Choose  Attribute : </p>
                                                        {attributes &&
                                                            attributes.map(a => (
                                                                <div key={a._id} className='form-check' >
                                                                    <input
                                                                        className='form-check-input'
                                                                        type='checkbox'
                                                                        name='types'
                                                                        value={a._id}

                                                                        id='flexCheckChecked'
                                                                        checked={attributeIds.includes(a._id)}
                                                                        onChange={handleAttribute}
                                                                    />
                                                                    <label
                                                                        className='form-check-label'
                                                                        htmlFor='flexCheckChecked'
                                                                    >
                                                                        {a.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                    </div>
                                                </div>

                                            </div>
                                            <br />


                                            <div class="">

                                                <div className='row mb-3 '>
                                                    <div className="col-md-15 offset-md">
                                                        <div className="row">

                                                            <div className="col-sm-12"  >

                                                                <div className='pagination justify-content-center'>
                                                                    <ReactPaginate
                                                                        previousLabel={'previous'}
                                                                        nextLabel={"next"}
                                                                        breakLabel={'...'}
                                                                        pageCount={25}
                                                                        marginPagesDisplayed={2}
                                                                        pageRangeDisplayed={3}
                                                                        onPageChange={handlePageClick}
                                                                        containerClassName={'pagination justofy-content-center'}
                                                                        pageClassName={'page-item'}
                                                                        pageLinkClassName={'page-link'}
                                                                        previousClassName={'page-item'}
                                                                        previousLinkClassName={'page-link'}
                                                                        nextClassName={'page-item'}
                                                                        nextLinkClassName={'page-link'}
                                                                        breakClassName={'page-item'}
                                                                        breakLinkClassName={'page-link'}
                                                                        activeClassName={'active '}


                                                                    />
                                                                </div>


                                                            </div>

                                                        </div>

                                                        {searchInput.length > 1 ? (
                                                            searchResult.map((tdata, index) => {

                                                                return (<>

                                                                    <div className='card'>

                                                                        <div class="sign-up-container">
                                                                            <br />

                                                                            <div style={{ display: "inline-flex", fontSize: "50px" }}>


                                                                                <div key={index}>
                                                                                    <div class="card-body">
                                                                                        <label style={{ fontSize: '20px' }}>Title:{tdata.title}</label>
                                                                                        <p>
                                                                                            Abstract :
                                                                                            {tdata.abstract}
                                                                                            <br />
                                                                                            KeyWords :
                                                                                            {tdata.keyWords}
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
                                                                                                                    {/* <div style={{ display: "inline-flex" }}>
    
                                                                                                        <button type='submit' className='primary'
                                                                                                            onClick={() => handleDownload(tdata._id)}>
    
    
                                                                                                            Read
                                                                                                        </button>
    
    
                                                                                                    </div> */}
                                                                                                                    <div style={{ display: "inline-flex", }}

                                                                                                                    >


                                                                                                                        <button className="bi bi-hand-thumbs-up-fill"
                                                                                                                            style={{ borderRadius: '10px', width: '100%' }}
                                                                                                                            onClick={() => handleLike(tdata._id)}
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
                                                                                                                            {tdata.view.length} view(s)
                                                                                                                        </h6>
                                                                                                                        : <h6> </h6>
                                                                                                                    }
                                                                                                                    Abstract :
                                                                                                                    {tdata.abstract}

                                                                                                                </div>,
                                                                                                                'Read More'


                                                                                                            );

                                                                                                            if (result) {
                                                                                                                //  this.handleBooking(item.id);
                                                                                                                { console.log("id", tdata._id) }

                                                                                                            }
                                                                                                        }}

                                                                                                    >

                                                                                                        Read More
                                                                                                    </button>
                                                                                                    <form
                                                                                                        onSubmit={(e) => {
                                                                                                            e.preventDefault()
                                                                                                            makeComment(tdata._id)
                                                                                                        }}
                                                                                                    >  <input type="text"
                                                                                                        name='text'

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

                                                                </>

                                                                )

                                                            })

                                                        )


                                                            : (
                                                                articles?.map((tdata, index) => {

                                                                    <div className="row">
                                                                        <div className=""  >
                                                                            <div className='pagination justify-content-center'>
                                                                                <ReactPaginate
                                                                                    previousLabel={'previous'}
                                                                                    nextLabel={"next"}
                                                                                    breakLabel={'...'}
                                                                                    pageCount={25}
                                                                                    marginPagesDisplayed={2}
                                                                                    pageRangeDisplayed={3}
                                                                                    onPageChange={handlePageClick}
                                                                                    containerClassName={'pagination justofy-content-center'}
                                                                                    pageClassName={'page-item'}
                                                                                    pageLinkClassName={'page-link'}
                                                                                    previousClassName={'page-item'}
                                                                                    previousLinkClassName={'page-link'}
                                                                                    nextClassName={'page-item'}
                                                                                    nextLinkClassName={'page-link'}
                                                                                    breakClassName={'page-item'}
                                                                                    breakLinkClassName={'page-link'}
                                                                                    activeClassName={'active '}


                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    return (

                                                                        <div className='card'>
                                                                            <div class="sign-up-container">
                                                                                <br />


                                                                                <div style={{ display: "inline-flex", fontSize: "50px" }}>


                                                                                    <div key={index}>
                                                                                        <div class="card-body">
                                                                                            <label style={{ fontSize: '20px' }}>Title:{tdata.title}</label>


                                                                                            <p>
                                                                                                Abstract :
                                                                                                {tdata.abstract}
                                                                                                <br />
                                                                                                KeyWords :
                                                                                                {tdata.keyWords}

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
                                                                                                <button type='submit' className='primary'
                                                                                                    onClick={() => handleRead(tdata._id)}>


                                                                                                    Read
                                                                                                </button>

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
                                                                                                                    'Read More'


                                                                                                                );

                                                                                                                if (result) {
                                                                                                                    //  this.handleBooking(item.id);
                                                                                                                    { console.log("id", tdata._id) }

                                                                                                                }
                                                                                                            }}

                                                                                                        >

                                                                                                            Read More
                                                                                                        </button>
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


                                                                    )
                                                                })
                                                            )}
                                                        <div className="row">

                                                            <div className="col-sm-12"  >

                                                                <div className='pagination justify-content-center'>
                                                                    <ReactPaginate
                                                                        previousLabel={'previous'}
                                                                        nextLabel={"next"}
                                                                        breakLabel={'...'}
                                                                        pageCount={25}
                                                                        marginPagesDisplayed={2}
                                                                        pageRangeDisplayed={3}
                                                                        onPageChange={handlePageClick}
                                                                        containerClassName={'pagination justofy-content-center'}
                                                                        pageClassName={'page-item'}
                                                                        pageLinkClassName={'page-link'}
                                                                        previousClassName={'page-item'}
                                                                        previousLinkClassName={'page-link'}
                                                                        nextClassName={'page-item'}
                                                                        nextLinkClassName={'page-link'}
                                                                        breakClassName={'page-item'}
                                                                        breakLinkClassName={'page-link'}
                                                                        activeClassName={'active '}


                                                                    />
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

                    </div>
                </div>
            </div>

        </div>
    )
}
