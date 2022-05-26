import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addNewFile, addNewPost } from '../../redux/Actions/fileActions';
import axios from 'axios';
import Swal from 'sweetalert2';


export default function AddPost() {

    const dispatch = useDispatch();
    const history = useNavigate();
    
    

    const [posts, setPosts] = useState([])
    const getLisDemand = async () => {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        return await axios.get(`http://localhost:5000/api/post/get`, config)
            .then((res) => {
                console.log(res.data);
                setPosts(res.data)
                 console.log('article => ' + JSON.stringify(res.data));
            }).catch(err => {
                console.log(err)
            })
    }
 
    useEffect(() => {

        
            getLisDemand()
    
    },
        [
            dispatch,
            history,
            
            
        ]);

   
  return (
    <div>
            <div>
                {
                    posts.map((post)=>{
                        return(
                <img src={post.pathFile} height="400px"width="100px" className="card-img-top img-responsive" alt="img" /> 

                        )
                    })
                }
                <h1>vdsflkdsfdslfdf </h1>
                {/* <img src={pathFile} height="400px"width="100px" className="card-img-top img-responsive" alt="img" /> */}
                     </div>
            

    </div>
  )
}
