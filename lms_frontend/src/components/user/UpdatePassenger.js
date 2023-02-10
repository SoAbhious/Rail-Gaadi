import React from "react";
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import {updatePassenger} from "../../services/userService";


const UpdatePassengerModal = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        updatePassenger(props.passenger.id, e.target)
        .then((result) => {
            alert(result);
            props.setUpdated(true);
        },
        (error)=>{
            alert("Failed to update passenger!");
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
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="source">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="text" name="age" required
                            defaultValue={props.passenger.age}
                            placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="mobile">
                            <Form.Label>Mobile No.</Form.Label>
                            <Form.Control type="text" name="mobile" required
                            defaultValue={props.passenger.mobile}
                            placeholder="" />
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

export default UpdatePassengerModal;