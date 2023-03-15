import Sidebar from './sidebar';
import { updateAdminPassword } from "../../services/adminService";
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

function AdminChangePassword() {
    const adminid = localStorage.getItem('adminid')

    const [formErrors, setFormErrors] = useState({})
    const [errorMsg, setErrorMsg] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        // ------Form Validation-------
        const errors = {}
        const password_regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!password_regex.test(e.target.password.value)) {
            errors.password = "Password should be of min 8 letter, with at least a symbol, upper and lower case letters and a number!";
        }
        if (!password_regex.test(e.target.password1.value)) {
            errors.password1 = "Password should be of min 8 letter, with at least a symbol, upper and lower case letters and a number!";
        }
        setFormErrors(errors)


        if (Object.keys(errors).length === 0) {
            if (e.target.password1.value == e.target.password.value) {
                updateAdminPassword(adminid, e.target)
                    .then((result) => {
                        alert("Password changed successfully!!");
                    },
                        (error) => {
                            alert("Failed to change password!");
                        });
            } else {
                setErrorMsg("Passwords do not match!!")
            }
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
                    <div className='card' style={{ boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px' }}>
                        <div className='card-header'>Change Password</div>
                        {errorMsg && <p className='text-danger mt-2' style={{ textAlign: "center" }}>{errorMsg}</p>}
                        <div className='card-body'>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="password">
                                    <Form.Label>New password</Form.Label>
                                    <Form.Control type="text" name="password" required
                                        placeholder="Type new password" />
                                    {formErrors.password &&
                                        <p className='text-danger'>{formErrors.password}</p>
                                    }
                                </Form.Group>
                                <br />
                                <Form.Group controlId="password1">
                                    <Form.Label>New password</Form.Label>
                                    <Form.Control type="text" name="password1" required
                                        placeholder="Type new password again" />
                                    {formErrors.password1 &&
                                        <p className='text-danger'>{formErrors.password1}</p>
                                    }
                                </Form.Group>
                                <br />
                                <Form.Group>
                                    <p></p>
                                    <Button variant="primary" type="submit">
                                        Change
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

export default AdminChangePassword;