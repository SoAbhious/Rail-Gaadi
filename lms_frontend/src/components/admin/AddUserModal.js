import React from "react";
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import {addUser} from "../../services/userService";


const AddUserModal = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser(e.target)
        .then((result) => {
            alert(result);
            props.setUpdated(true);
        },
        (error)=>{
         alert("Failed to add user!");
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
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" required placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="firstname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="firstname" required placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="lastname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="lastName" required placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="text" name="password" required placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control type="text" name="gender" required placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="dob">
                                <Form.Label>DOB</Form.Label>
                                <Form.Control type="text" name="dob" required placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name="email" required placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" name="phone" required placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="aadhar">
                                <Form.Label>Adhar</Form.Label>
                                <Form.Control type="text" name="aadhar" required placeholder="" />
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

export default AddUserModal;