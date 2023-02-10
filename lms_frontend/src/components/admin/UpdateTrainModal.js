import React, { useState, useEffect } from "react";
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import {updateTrain} from "../../services/trainService";


const UpdateTrainModal = (props) => {
    const [station, setStation] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTrain(props.train.id, e.target)
        .then((result) => {
            alert(result);
            props.setUpdated(true);
        },
        (error)=>{
            alert("Failed to upadate train!");
        }); 
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
                <Col sm={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" required 
                            defaultValue={props.train.name}
                            placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="source">
                            <Form.Label>From</Form.Label>
                            <span>&nbsp; &nbsp;</span>
                            <select name="source"
                            defaultValue={{label: "choose a station"}} >
                                <option value={props.train.source && props.train.source.id}>
                                    {props.train.source && props.train.source.name}
                                </option>
                                {station && station.map(st => (
                                    <option key={st.id} value={st.id} >
                                        {st.name}
                                    </option>
                                ))}
                            </select>
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="destination">
                                <Form.Label>To</Form.Label>
                                <span>&nbsp; &nbsp; &nbsp;</span>
                                <select name="destination"
                                defaultValue={props.train.destination && props.train.destination.name} >
                                    <option value={props.train.destination && props.train.destination.id}>
                                        {props.train.destination && props.train.destination.name}
                                    </option>
                                    {station && station.map(st => (
                                        <option key={st.id} value={st.id} >
                                            {st.name}
                                        </option>
                                    ))}
                                </select>
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="traveltime">
                                <Form.Label>Travel Time</Form.Label>
                                <Form.Control type="number" name="traveltime" required
                                defaultValue={props.train.traveltime}
                                placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="sl">
                                <Form.Label>SL</Form.Label>
                                <Form.Control type="number" name="sl" required
                                defaultValue={props.train.sl}
                                placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="ac1">
                                <Form.Label>1A</Form.Label>
                                <Form.Control type="number" name="dob" required
                                defaultValue={props.train.ac1}
                                placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="ac2">
                                <Form.Label>2A</Form.Label>
                                <Form.Control type="number" name="ac2" required
                                defaultValue={props.train.ac2}
                                placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="ac3">
                                <Form.Label>3A</Form.Label>
                                <Form.Control type="number" name="ac3" required
                                defaultValue={props.train.ac3}
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

export default UpdateTrainModal;