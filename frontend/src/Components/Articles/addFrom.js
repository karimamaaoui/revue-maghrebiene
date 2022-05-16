import { Form, Button } from "react-bootstrap"
import React ,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";



const AddForm = () =>{


    const [newEmployee, setNewEmployee] = useState({
        name:"", email:"", phone:"", address:""
    });

    const onInputChange = (e) => {
        setNewEmployee({...newEmployee,[e.target.name]: e.target.value})
    }

    const {university, placeofpractice} = newEmployee;

    const dispatch = useDispatch();
    const history = useNavigate();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

   
   
    useEffect(() => {
       
        if (!userInfo) {
            history("/");
        }
    },
        [
            dispatch,
            history,
            userInfo,
          
        ]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,

            },
        };
        
      //  addEmployee(name, email, phone, address);
      return  axios.put(`http://localhost:5000/api/author/updateauthor`,{newEmployee}, config)
            .then((res) => {

                console.log(res.data);

                console.log('article => ' + JSON.stringify(res.data));
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

        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="university *"
                    name="university"
                    value={university}
                    onChange = { (e) => onInputChange(e)}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="placeofpractice *"
                    name="placeofpractice"
                    value={placeofpractice}
                    onChange = { (e) => onInputChange(e)}
                />
            </Form.Group>
            <Button variant="success" type="submit" block>
                Add New Employee
            </Button>
        </Form>

     )
}

export default AddForm;