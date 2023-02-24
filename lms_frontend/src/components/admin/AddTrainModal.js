import React from "react";
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import {addTrain} from "../../services/trainService";
import {getStation} from "../../services/stationService";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AddTrainModal = (props) => {
    
    const [formData, setFormData] = useState({
        source: "",
        destination: "",
        name: "",
        sl: 0,
        ac1: 0,
        ac2: 0,
        ac3: 0,
        traveltime: 0,
      });
    const [station, setStation] = useState([]);


    useEffect(() => {
        fetch('http://127.0.0.1:8000/base/station/')
          .then(response => response.json())
          .then(data => setStation(data));
      }, []);



    const handleSubmit = (e) => {
        // const location = useLocation();
        e.preventDefault();
        // const formData = new FormData(e.target);
        addTrain(e.target)
          .then((result) => {
              alert(result);
              props.setUpdated(true);
          },
          (error) => {
            alert("Failed to add train!");
          }); 
      };

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
                Enter train information
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Row>
                <Col sm={6}>
                    {/* <form>
                        <label>Enter your name:
                            <input
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                    </form> */}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" onChange={handleChange} required placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="source">
                            <Form.Label>From</Form.Label>
                            <span>&nbsp; &nbsp;</span>
                            <select name="source" value={formData.source} onChange={handleChange}
                            required>
                                <option value="">Choose a station</option>
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
                            <select name="destination" value={formData.destination} onChange={handleChange} required>
                                <option value="">Choose a station</option>
                                {station && station.map(st => (
                                    <option key={st.id} value={st.id}>
                                        {st.name}
                                    </option>
                                ))}
                            </select>
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="traveltime">
                                <Form.Label>Travel Time</Form.Label>
                                <Form.Control type="number" name="traveltime" onChange={handleChange} required placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="sl">
                                <Form.Label>SL</Form.Label>
                                <Form.Control type="number" name="sl" onChange={handleChange} required placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="ac1">
                                <Form.Label>1A</Form.Label>
                                <Form.Control type="number" name="ac1" onChange={handleChange} required placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="ac2">
                                <Form.Label>2A</Form.Label>
                                <Form.Control type="number" name="ac2" onChange={handleChange} required placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="ac3">
                                <Form.Label>3A</Form.Label>
                                <Form.Control type="number" name="ac3" onChange={handleChange} required placeholder="" />
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

export default AddTrainModal;