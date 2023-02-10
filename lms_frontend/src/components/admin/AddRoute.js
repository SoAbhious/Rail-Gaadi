import {Button, Form} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import {addRoute} from "../../services/routeService";

const AddRoutes = () => {
    const [formFields, setFormFields] = useState([
        {name: ''}
    ])

    const [formData, setFormData] = useState({
        name:"",
        source: "",
        destination: ""
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
        console.log(e.target.id.value)
        addRoute(e.target)
          .then((result) => {
              alert("Route added successfully!!");
          },
          (error) => {
            alert("Failed to add route!");
          }); 
      };

    const handleFormChange = (event, index) => {
        console.log(index, event.value.name);
    }  

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    return (
        <div>
            <div className="card container mt-4 ms-4 me-4">
                <div className="card-body">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                                <Form.Label style={{float: 'left'}}>Name</Form.Label>
                                <span style={{display: "block",
                                            overflow: "hidden",
                                            padding: "0px 4px 0px 6px"}}>
                                    <Form.Control type="text" name="name" onChange={handleChange} required placeholder="" />
                                </span>    
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="source">
                            <Form.Label style={{float: 'left'}}>Source</Form.Label>
                            <span style={{display: "block",
                                            overflow: "hidden",
                                            padding: "0px 4px 0px 6px"}}>
                                <select name="source" value={formData.source} 
                                onChange={handleChange}
                                defaultValue={{label: "choose a station"}} required>
                                    <option value="">Choose a station</option>
                                    {station && station.map(st => (
                                        <option key={st.id} value={st.id} >
                                            {st.name}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="destination">
                            <Form.Label style={{float: 'left'}}>Destination</Form.Label>
                            <span style={{display: "block",
                                            overflow: "hidden",
                                            padding: "0px 4px 0px 6px"}}>
                                <select name="destination" value={formData.destination} 
                                onChange={handleChange}
                                defaultValue={{label: "choose a station"}}  required>
                                    <option value="">Choose a station</option>
                                    {station && station.map(st => (
                                        <option key={st.id} value={st.id}>
                                            {st.name}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        </Form.Group>
                        <br/>
                        <Form.Group>
                            <p></p>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
            <div className="card container mt-4 ms-4 me-4">
            <div className="card-header">
                    <h4>Intermediate stations</h4>
                </div>
                <div className="card-body">
                {formFields.map((form, index) => {
                    <Form className='container'>
                    <div>
                        <Form.Group className="mb-3" controlId="name" 
                        style={{display: "block",
                        overflow: "hidden",
                        padding: "0px 4px 0px 6px"}}>
                            <Form.Control placeholder="station" 
                            onChange={event => handleFormChange(event, index)}/>
                        </Form.Group>
                    </div>
                    <Form.Group className="mb-3">
                        <Button variant="primary" type="submit">
                            Add another
                        </Button>
                    </Form.Group>
                </Form>
                })}
                </div>
            </div>
        </div>
    );
}

export default AddRoutes;