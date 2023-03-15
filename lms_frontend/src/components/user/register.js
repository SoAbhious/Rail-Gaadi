import registerCSS from '../home.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addUser } from '../../services/userService';
import { verifyUser } from '../../services/userService';


const AddUser = () => {
    const [formErrors, setFormErrors] = useState({})
    const [tarik, setTarik] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();

        // ------Form Validation-------
        const errors = {}
        const email_regex = /^([a-zA-Z0-9\.-]{4,10})([@][a-zA-Z-]{3,10})([\.][a-z]{2,10})$/;
        const phone_regex = /^[0-9]{10}$/;
        const aadhar_regex = /^[0-9]{12}$/;
        const password_regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        const username_regex = /^[a-z0-9_\.]+$/;
        const firstname_regex = /^[A-Za-z]{1,50}$/;
        const lastname_regex = /^[A-Za-z]{1,50}$/;
        if (!firstname_regex.test(e.target.firstname.value)) {
            errors.firstname = "Firstname can only contain lower and uppercase letters!";
        }
        if (!lastname_regex.test(e.target.lastname.value)) {
            errors.lastname = "Lastname can only contain lower and uppercase letters!";
        }
        if (!username_regex.test(e.target.username.value)) {
            errors.username = "Username can only contain lower case letters, numbers (0-9), dot(.) and underscore(_)!";
        }
        if (!email_regex.test(e.target.email.value)) {
            errors.email = "Enter a valid email format!";
        }
        if (!phone_regex.test(e.target.phone.value)) {
            errors.phone = "Enter a valid phone number!";
        }
        if (!aadhar_regex.test(e.target.aadhar.value)) {
            errors.aadhar = "Enter a valid AADHAR number!";
        }
        if (e.target.gender.value != 'male' && e.target.gender.value != 'female') {
            errors.gender = "Enter 'male' or 'female'!";
        }
        if (!password_regex.test(e.target.password.value)) {
            errors.password = "Password should be of min 8 letter, with at least a symbol, upper and lower case letters and a number!";
        }
        setFormErrors(errors)


        if (Object.keys(errors).length === 0) {
            verifyUser(e.target)
                .then((result) => {
                    // alert(result);
                    // window.location.href='user-login';
                },
                    (error) => {
                        alert("Failed to add user!");
                    });

            e.target.reset();
        }
    };

    useEffect(() => {
        document.title = 'user register';
        // var date = new Date();
        // date.setFullYear( date.getFullYear() - 18 );
        // var dateFormat = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
        // console.log(dateFormat)
        // setTarik(dateFormat)
    })

    return (
        <div className={registerCSS.logtainer}>
            <section className="text-center text-lg-start">
                <div className="container py-4">
                    <div className="row g-0 align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className={registerCSS.crd} style={{ boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px' }}>
                                <div className="card-body p-5 shadow-lg text-center">
                                    <h2 className="fw-bold mb-5">Register now</h2>
                                    <Form onSubmit={handleSubmit}>
                                        
                                        <Form.Group className="mb-4" controlId="username">
                                            <Form.Control type="text" name="username" required placeholder="username" />
                                            {formErrors.username &&
                                                <p className='text-danger'>{formErrors.username}</p>
                                            }
                                        </Form.Group>

                                        <div className="row">
                                            <Form.Group className="col-md-6 mb-4" controlId="firstname">
                                                <Form.Control type="text" name="firstname" required placeholder="firstname" />
                                                {formErrors.firstname &&
                                                    <p className='text-danger'>{formErrors.firstname}</p>
                                                }
                                            </Form.Group>

                                            <Form.Group className="col-md-6 mb-4" controlId="lastname">
                                                <Form.Control type="text" name="lastName" required placeholder="lastname" />
                                                {formErrors.lastname &&
                                                    <p className='text-danger'>{formErrors.lastname}</p>
                                                }
                                            </Form.Group>
                                        </div>

                                        <Form.Group className="mb-4" controlId="password">
                                            <Form.Control type="text" name="password" required placeholder="password" />
                                            {formErrors.password &&
                                                <p className='text-danger'>{formErrors.password}</p>
                                            }
                                        </Form.Group>

                                        <Form.Group className="mb-4" controlId="gender">
                                            <Form.Control type="text" name="gender" required placeholder="gender" />
                                            {formErrors.gender &&
                                                <p className='text-danger'>{formErrors.gender}</p>
                                            }
                                        </Form.Group>

                                        <Form.Group className="mb-4" controlId="dob">
                                            <Form.Control type="date" max='2005-03-01' name="dob" required placeholder="dob" />
                                        </Form.Group>
                                        
                                        <Form.Group className="mb-4" controlId="email">
                                            <Form.Control type="text" name="email" required placeholder="email" />
                                            {formErrors.email &&
                                                <p className='text-danger'>{formErrors.email}</p>
                                            }
                                        </Form.Group>

                                        <Form.Group className="mb-4" controlId="phone">
                                            <Form.Control type="text" name="phone" required placeholder="phone" />
                                            {formErrors.phone &&
                                                <p className='text-danger'>{formErrors.phone}</p>
                                            }
                                        </Form.Group>

                                        <Form.Group className="mb-4" controlId="aadhar">
                                            <Form.Control type="text" name="aadhar" required placeholder="aadhar" />
                                            {formErrors.aadhar &&
                                                <p className='text-danger'>{formErrors.aadhar}</p>
                                            }
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

                        <div className="col-lg-6 mb-5 mb-lg-0" style={{ boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px' }}>
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