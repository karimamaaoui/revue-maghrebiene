import axios from 'axios';
import React , {useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SidebarScreen from '../../sideBar/sidebarScreen';
import NavbarList from '../views/navbarList';

export default function AddType() {
    const [label, setLabel] = useState('');


    const dispatch = useDispatch();
    const history = useNavigate();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
    
        if (!userInfo) {
          history("/");
        }
      }, [
        dispatch,
        history,
        userInfo,
        
      ]);
     
    const handleSubmit = async(e) => {
        console.log("inside handle submit");
        e.preventDefault();
        const formData = new FormData();
        formData.append('label', label);
        
         const config = {
                headers: {
                    Accept: 'application/json',
                    'content-type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                
        
          }}
          return  await axios.post(
            `http://localhost:5000/api/type/add`, formData,config).then((res) => {

                console.log(res.data);
                history('/types')

                Swal.fire({
                    title: "Succces!",
                    text: "Type Added Successfully",
                    icon: 'success',
                    button: "OK!"
                })})

          .catch(err => {
            console.log(err)
               Swal.fire({
                    title: "Error!",
                    text: "Type already exist",
                    icon: 'error',
                    button: "OK!"
                })

        })
    }
  

  return (
             <>
   {!userInfo ? history('/'):
 
            userInfo.roleuser === "Admin" ?

                <div className="containerr" style={{ backgroundColor: '#f7fafc' }}>
                    <div className="main-body" >
                        <div className="row gutters-sm" style={{ maxWidth: "100%" }}>
                            <SidebarScreen />
                            <div className="col-md-8" style={{ marginTop: '50px' }}>
                                <div className='container'>
                                    <div id="content" className="p-6 p-md-10 pt-12">
                                        <NavbarList />
                                        <div className="" style={{ backgroundColor: 'white' }}>
                                        <h3 className="fieldset-title">Add New Type</h3>
                                
                                            <div class="card-body">
                                            <form  onSubmit={handleSubmit}  >
                                                    <div class="row mb-3">
                                                        <div class="col-sm-3">
                                                            <h6 class="mb-0">Label</h6>
                                                        </div>
                                                        <div class="col-sm-9 text-secondary">
                                                            <input
                                                                type="text"
                                                                name="label"
                                                                className="form-control"
                                                                value={label}
                                                                onChange={(e) => setLabel(e.target.value)}                                                              
                                                            />
                                                        </div>
                                                    </div>
                                                          <div class="row">
                                                    <div class="col-sm-3"></div>
                                                    <div class="col-sm-9 text-secondary">
                                                        <div className="footer">

                                                            <div style={{ display: "inline-flex" }}>

                                                                <button 
                                                                    style={{ borderRadius: "15px" }}
                                                                >
                                                                    Add Type
                                                                </button>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                </form>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : "Not Authorized"
                     }


        </>
   
  )
}
