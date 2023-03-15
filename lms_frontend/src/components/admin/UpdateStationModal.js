import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { updateStation } from "../../services/stationService";


const UpdateStationModal = (props) => {
    const [formErrors, setFormErrors] = useState({})
    const [station, setStation] = useState([]);

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
            updateStation(props.station.id, e.target)
                .then((result) => {
                    alert(result);
                    props.setUpdated(true);
                },
                    (error) => {
                        alert("Failed to upadate station!");
                    });
        }

    };

    useEffect(() => {
        fetch('http://127.0.0.1:8000/base/station/')
            .then(response => response.json())
            .then(data => setStation(data));
    }, []);

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
                            Update train information
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={10}>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" required
                                            defaultValue={props.station.name}
                                            placeholder="" />
                                        {formErrors.name &&
                                            <p className='text-danger'>{formErrors.name}</p>
                                        }
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="address">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" name="address" required
                                            defaultValue={props.station.address}
                                            placeholder="" />
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="station_code">
                                        <Form.Label>Station Code</Form.Label>
                                        <Form.Control type="text" name="station_code" required
                                            defaultValue={props.station.station_code}
                                            placeholder="" />
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

export default UpdateStationModal;