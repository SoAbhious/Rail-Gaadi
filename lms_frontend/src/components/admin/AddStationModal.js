import React from "react";
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { addStation } from "../../services/stationService";
import { getStation } from "../../services/stationService";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AddStationModal = (props) => {
    const [formErrors, setFormErrors] = useState({})

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        station_code: "",
    });
    const [station, setStation] = useState([]);


    useEffect(() => {
        fetch('http://127.0.0.1:8000/base/station/')
            .then(response => response.json())
            .then(data => setStation(data));
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();

        // ------Form Validation-------
        const errors = {}
        const name_regex = /^[a-zA-Z0-9\s]{1,50}$/g;
        const code_regex = /^[a-zA-Z0-9]{1,50}$/g;
        if (!name_regex.test(e.target.name.value)) {
            errors.name = "Invalid name!";
        }
        if (!code_regex.test(e.target.station_code.value)) {
            errors.code = "Station code can only contain letters and numbers, no spaces!";
        }
        setFormErrors(errors)

        if (Object.keys(errors).length === 0) {
            addStation(e.target)
                .then((result) => {
                    alert(result);
                    props.setUpdated(true);
                },
                    (error) => {
                        alert("Failed to add station!");
                    });
        };
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                            Enter station information
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" onChange={handleChange} required placeholder="" />
                                        {formErrors.name &&
                                            <p className='text-danger'>{formErrors.name}</p>
                                        }
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="address">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" name="address" onChange={handleChange} required placeholder="" />
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="station_code">
                                        <Form.Label>Station Code</Form.Label>
                                        <Form.Control type="text" name="station_code" onChange={handleChange} required placeholder="" />
                                        {formErrors.code &&
                                            <p className='text-danger'>{formErrors.code}</p>
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

export default AddStationModal;