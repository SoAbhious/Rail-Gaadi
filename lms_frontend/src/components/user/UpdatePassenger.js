import React from "react";
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { updatePassenger } from "../../services/userService";
import { useState } from "react";


const UpdatePassengerModal = (props) => {
    const [formErrors, setFormErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();

        // ------Form Validation-------
        const errors = {}
        const name_regex = /^[a-zA-Z]+(\s[a-zA-Z]+){0,1}$/g;
        const mobile_regex = /^[0-9]{10}$/;
        if (!name_regex.test(e.target.name.value)) {
            errors.name = "Invallid name!";
        }
        if (e.target.age.value > 120) {
            errors.age = "Invallid age!";
        }
        if (!mobile_regex.test(e.target.mobile.value)) {
            errors.mobile = "Enter a valid mobile number!";
        }
        setFormErrors(errors)

        if (Object.keys(errors).length === 0) {
            updatePassenger(props.passenger.id, e.target)
                .then((result) => {
                    alert(result);
                    props.setUpdated(true);
                },
                    (error) => {
                        alert("Failed to update passenger!");
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
                            Update passenger information
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" required
                                            defaultValue={props.passenger.name}
                                            placeholder="" />
                                        {formErrors.name &&
                                            <p className='text-danger'>{formErrors.name}</p>
                                        }
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="source">
                                        <Form.Label>Age</Form.Label>
                                        <Form.Control type="text" name="age" required
                                            defaultValue={props.passenger.age}
                                            placeholder="" />
                                        {formErrors.age &&
                                            <p className='text-danger'>{formErrors.age}</p>
                                        }
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="mobile">
                                        <Form.Label>Mobile No.</Form.Label>
                                        <Form.Control type="text" name="mobile" required
                                            defaultValue={props.passenger.mobile}
                                            placeholder="" />
                                        {formErrors.mobile &&
                                            <p className='text-danger'>{formErrors.mobile}</p>
                                        }
                                    </Form.Group>
                                    <br />
                                    <Form.Group>
                                        <p></p>
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" type="submit" onClick={props.onHide}>
                            Close
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
    )
};

export default UpdatePassengerModal;