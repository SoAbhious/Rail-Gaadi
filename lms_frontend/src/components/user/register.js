import registerCSS from '../home.module.css'
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Form, Button} from 'react-bootstrap';
import {addUser} from '../../services/userService';
import {verifyUser} from '../../services/userService';


const AddUser = () => {
    // const [userData, setUserData] = useState({
    //     'username':'',
    //     'firstname':'',
    //     'lastname':'',
    //     'password':'',
    //     'gender':'',
    //     'dob':'',
    //     'email':'',
    //     'phone':'',
    //     'aadhar':'',
    //     'otp_digit':'',
    // })

    // const handleChange = (event) => {
    //     setUserData ({
    //         ...userData,
    //         [event.target.name]: event.target.value
    //     });
    // }

    // const submitForm = () => {
    //     const otp_digit = Math.floor(100000 + Math.random() * 900000);
    //     const userFormData = new FormData();
    //     userFormData.append('username', userData.username)
    //     userFormData.append('firstname', userData.firstname)
    //     userFormData.append('lastname', userData.lastname)
    //     userFormData.append('password', userData.password)
    //     userFormData.append('gender', userData.gender)
    //     userFormData.append('dob', userData.dob)
    //     userFormData.append('email', userData.email)
    //     userFormData.append('phone', userData.phone)
    //     userFormData.append('aadhar', userData.aadhar)
    //     userFormData.append(otp_digit, userData.otp_digit)

    //     try {
    //         axios.post('http://127.0.0.1:8000/base/user/', userFormData).then((response) =>{
    //             console.log(response.data);
    //             window.location.href='/verify-user/'+response.data.id;
    //         })
    //     } catch(error) {
    //         console.log(error);
    //         setUserData({'status':'error'})
    //     }
    // };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        verifyUser(e.target)
        .then((result) => {
            // alert(result);
            // window.location.href='user-login';
        },
        (error)=>{
         alert("Failed to add user!");
        }); 


        e.target.reset();

    };

    useEffect(() => {
        document.title = 'user register';        
    })

    return (
        <div className={registerCSS.logtainer}>
            <section className="text-center text-lg-start">
            <div className="container py-4">
                <div className="row g-0 align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0">
                    <div className={registerCSS.crd}>
                    <div className="card-body p-5 shadow-lg text-center">
                        <h2 className="fw-bold mb-5">Register now</h2>
                        <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-4" controlId="username">
                            <Form.Control type="text" name="username" required placeholder="username" />
                        </Form.Group>
                        <div className="row">
                            <Form.Group className="col-md-6 mb-4" controlId="firstname">
                                <Form.Control type="text" name="firstname" required placeholder="firstname" />
                            </Form.Group>
                            <Form.Group className="col-md-6 mb-4" controlId="lastname">
                                    <Form.Control type="text" name="lastName" required placeholder="lastname" />
                            </Form.Group>
                        </div>
                        <Form.Group className="mb-4" controlId="password">
                                <Form.Control type="text" name="password" required placeholder="password" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="gender">
                                <Form.Control type="text" name="gender" required placeholder="gender" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="dob">
                                <Form.Control type="date" name="dob" required placeholder="dob" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="email">
                                <Form.Control type="text" name="email" required placeholder="email" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="phone">
                                <Form.Control type="text" name="phone" required placeholder="phone" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="aadhar">
                                <Form.Control type="text" name="aadhar" required placeholder="aadhar" />
                        </Form.Group>
                        <Form.Group className="d-grid gap-2">
                            <p></p>
                            <Button className="rounded" variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                    </div>
                    </div>
                </div>

                <div className="col-lg-6 mb-5 mb-lg-0">
                    <img src="https://images.pexels.com/photos/1639418/pexels-photo-1639418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="w-100 rounded-4 shadow-4"
                    alt="" />
                </div>
                </div>
            </div>
            </section>
        </div>
    );
}

export default AddUser;