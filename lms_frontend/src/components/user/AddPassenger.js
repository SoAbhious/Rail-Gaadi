import React from "react";
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import {addPassenger} from "../../services/userService";


const AddPassengerModal = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        addPassenger(e.target)
        .then((result) => {
            alert(result);
            props.setUpdated(true);
        },
        (error)=>{
         alert("Failed to add passenger!");
        }); 
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
                Enter user information
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Row>
                <Col sm={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" required placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="text" name="age" required placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="mobile">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control type="text" name="mobile" required placeholder="" />
                        </Form.Group>
                        <br/>
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

export default AddPassengerModal;