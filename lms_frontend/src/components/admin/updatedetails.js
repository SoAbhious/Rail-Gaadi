import { Link } from 'react-router-dom'
import Sidebar from './sidebar';
import { updateAdmin } from "../../services/adminService";
import { Form, Button, row, col } from 'react-bootstrap';
import { getAdmin } from "../../services/adminService";
import { useEffect, useState } from 'react';


function AdminUpdateDetails() {
    const adminid = localStorage.getItem('adminid')

    const [formErrors, setFormErrors] = useState({})
    const [gender, setGender] = useState("")

    const handleChange = (event) => {
        setGender(event.target.value);
    };

    const [admin, setAdmin] = useState([]);
    let flag = false;

    useEffect(() => {
        let mounted = true;
        if (admin.length) {
            return;
        }
        getAdmin()
            .then(data => {
                if (mounted) {
                    setAdmin(data)
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
        return () => {
            mounted = false;
        };
    }, []);

    if (admin.gender == 'Female') {
        flag = true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // ------Form Validation-------
        const errors = {}
        const email_regex = /^([a-zA-Z0-9\.-]{4,10})([@][a-zA-Z-]{3,10})([\.][a-z]{2,10})$/;
        const phone_regex = /^[0-9]{10}$/;
        const aadhar_regex = /^[0-9]{12}$/;
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
        setFormErrors(errors)

        if (Object.keys(errors).length === 0) {
            updateAdmin(adminid, e.target)
                .then((result) => {
                    alert(result);
                },
                    (error) => {
                        alert("Failed to update admin!");
                    });
        }

    };

    return (
        <div className="container mt-4">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className='card mb-4' style={{ boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px' }}>
                        <div className='card-header'>Update details</div>
                        <div className='card-body'>
                        <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" name="username" required
                                        defaultValue={admin.username}
                                        placeholder="" />
                                    {formErrors.username &&
                                        <p className='text-danger'>{formErrors.username}</p>
                                    }
                                </Form.Group>
                                <br />
                                <Form.Group controlId="firstname">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name="firstname" required
                                        defaultValue={admin.firstname}
                                        placeholder="" />
                                    {formErrors.firstname &&
                                        <p className='text-danger'>{formErrors.firstname}</p>
                                    }
                                </Form.Group>
                                <br />
                                <Form.Group controlId="lastname">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="lastName" required
                                        defaultValue={admin.lastname}
                                        placeholder="" />
                                    {formErrors.firstname &&
                                        <p className='text-danger'>{formErrors.firstname}</p>
                                    }
                                </Form.Group>
                                <br />
                                <Form.Group controlId="gender">
                                    <Form.Label>Gender </Form.Label>
                                    <span>&nbsp; &nbsp;</span>
                                    {
                                        !flag &&
                                        <select value={gender} name="gender" onChange={handleChange} required>
                                            <option value="male">Male</option>
                                            <option value="female" >Female</option>
                                        </select>
                                    }
                                    {
                                        flag &&
                                        <select value={gender} name="gender" onChange={handleChange} required>
                                            <option value="female">Female</option>
                                            <option value="male" >Male</option>
                                        </select>
                                    }
                                </Form.Group>
                                <br />
                                <Form.Group controlId="dob">
                                    <Form.Label>DOB</Form.Label>
                                    <Form.Control type="text" name="dob" required
                                        defaultValue={admin.dob}
                                        placeholder="" />
                                </Form.Group>
                                <br />
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" name="email" required
                                        defaultValue={admin.email}
                                        placeholder="" />
                                    {formErrors.email &&
                                        <p className='text-danger'>{formErrors.email}</p>
                                    }
                                </Form.Group>
                                <br />
                                <Form.Group controlId="phone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="text" name="phone" required
                                        defaultValue={admin.phone}
                                        placeholder="" />
                                    {formErrors.phone &&
                                        <p className='text-danger'>{formErrors.phone}</p>
                                    }
                                </Form.Group>
                                <br />
                                <Form.Group controlId="aadhar">
                                    <Form.Label>Aadhar</Form.Label>
                                    <Form.Control type="text" name="aadhar" required
                                        defaultValue={admin.aadhar}
                                        placeholder="" />
                                    {formErrors.aadhar &&
                                        <p className='text-danger'>{formErrors.aadhar}</p>
                                    }
                                </Form.Group>
                                <br />
                                <Form.Group>
                                    <p></p>
                                    <Button variant="primary" type="submit">
                                        Update
                                    </Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AdminUpdateDetails;