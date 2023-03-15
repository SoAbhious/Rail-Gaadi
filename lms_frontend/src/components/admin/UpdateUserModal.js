import React from "react";
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { updateUser } from "../../services/userService";
import { useState } from "react";


const UpdateUserModal = (props) => {
    const [formErrors, setFormErrors] = useState({})

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
        if (e.target.gender.value.toLowerCase() != 'male' && e.target.gender.value.toLowerCase() != 'female') {
            errors.gender = "Enter 'male' or 'female'!";
        }
        setFormErrors(errors)

        if (Object.keys(errors).length === 0) {
            updateUser(props.user.id, e.target)
                .then((result) => {
                    alert(result);
                    props.setUpdated(true);
                },
                    (error) => {
                        alert("Failed to upadate user!");
                    });
        }

    };

    return (
        <div className="modal show"
            style={{ display: 'block', position: 'initial' }}>
            <Modal {...props}
                className="modal-fullscreen-sm-down"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <div className="ms-5">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update user information
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" required
                                    defaultValue={props.user.username}
                                    placeholder="" />
                                {formErrors.username &&
                                    <p className='text-danger'>{formErrors.username}</p>
                                }
                            </Form.Group>
                            <br />
                            <div className="row">
                                <Form.Group className="col-md-6 mb-4" controlId="firstname">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name="firstname" required
                                        defaultValue={props.user.firstname}
                                        placeholder="" />
                                    {formErrors.firstname &&
                                        <p className='text-danger'>{formErrors.firstname}</p>
                                    }
                                </Form.Group>

                                <Form.Group className="col-md-6 mb-4" controlId="lastname">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="lastName" required
                                        defaultValue={props.user.lastname}
                                        placeholder="" />
                                    {formErrors.lastname &&
                                        <p className='text-danger'>{formErrors.lastname}</p>
                                    }
                                </Form.Group>
                            </div>
                            <Form.Group controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control type="text" name="gender" required
                                    defaultValue={props.user.gender}
                                    placeholder="" />
                                {formErrors.gender &&
                                    <p className='text-danger'>{formErrors.gender}</p>
                                }
                            </Form.Group>
                            <br />
                            <Form.Group controlId="dob">
                                <Form.Label>DOB</Form.Label>
                                <Form.Control type="text" name="dob" required
                                    defaultValue={props.user.dob}
                                    placeholder="" />
                            </Form.Group>
                            <br />
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name="email" required
                                    defaultValue={props.user.email}
                                    placeholder="" />
                                {formErrors.email &&
                                    <p className='text-danger'>{formErrors.email}</p>
                                }
                            </Form.Group>
                            <br />
                            <Form.Group controlId="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" name="phone" required
                                    defaultValue={props.user.phone}
                                    placeholder="" />
                                {formErrors.phone &&
                                    <p className='text-danger'>{formErrors.phone}</p>
                                }
                            </Form.Group>
                            <br />
                            <Form.Group controlId="aadhar">
                                <Form.Label>Aadhar</Form.Label>
                                <Form.Control type="text" name="aadhar" required
                                    defaultValue={props.user.aadhar}
                                    placeholder="" />
                                {formErrors.aadhar &&
                                    <p className='text-danger'>{formErrors.aadhar}</p>
                                }
                            </Form.Group>
                            <br />
                            <Form.Group className="">
                                <p></p>
                                <Button onSubmit={handleSubmit} className="mb-4 btn btn-primary" type="submit">
                                    Submit
                                </Button>

                                <span className="float-end mb-4 btn btn-danger" type="submit" onClick={props.onHide}>
                                    Close
                                </span>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </div>
            </Modal>
        </div>
    )
};

export default UpdateUserModal;