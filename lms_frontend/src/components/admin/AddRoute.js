import { Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { addRoute, addRouteStations } from "../../services/routeService";
import routeCSS from '../home.module.css';

const AddRoutes = () => {
    const [formFields, setFormFields] = useState([
        { route: '', station: '', number: '' }
    ])

    const [finalForm, setFinalForm] = useState([
        { route: '', station: '', number: '' }
    ])

    const [formData, setFormData] = useState({
        name: "",
        source: "",
        destination: ""
    });

    const [station, setStation] = useState([]);
    const [route, setRoute] = useState({ id: '', source: '', destination: '' });
    const [selectedStations, setSelectedStations] = useState([]);
    const [routeFlag, setRouteFlag] = useState("false");
    const [flag, setFlag] = useState("false");

    useEffect(() => {
        if (flag == "true") {
            console.log(finalForm);
            addRouteStations(finalForm)
                .then((result) => {
                    alert("Intermediate stations added successfully!!");
                },
                    (error) => {
                        console.log(error.response.data)
                        alert("Failed to add intermediate stations!");
                    });
        }
        fetch('http://127.0.0.1:8000/base/station/')
            .then(response => response.json())
            .then(data => setStation(data))
    }, [route, finalForm]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setRouteFlag("true")
        addRoute(e.target)
            .then((result) => {
                alert("Route added successfully!!");
                setRoute({
                    id: result["id"],
                    source: result["source"],
                    destination: result["destination"]
                });
            },
                (error) => {
                    alert("Failed to add route!");
                });

    };


    const handleFormChange = (event, index) => {
        let routeId = route["id"].toString();
        let data = [...formFields];
        let len = index + 2;
        len = len.toString();

        data[index]["route"] = routeId;
        data[index][event.target.name] = event.target.value;
        data[index]["number"] = len;
        setFormFields(data);
    }

    const handleSubmit2 = (e) => {
        e.preventDefault();
        let text = route["source"].toString();
        let routeId = route["id"].toString();

        let data = [...finalForm];
        data[0]["route"] = routeId;
        data[0]["station"] = text;
        data[0]["number"] = "1";

        text = route["destination"].toString();
        let len = formFields.length + 2;
        len = len.toString();

        let object = {
            route: routeId,
            station: text,
            number: len
        }

        setFlag("true")
        setFinalForm([...data, ...formFields, object])
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addFields = () => {
        let object = {
            route: '',
            station: '',
            number: ''
        }

        setFormFields([...formFields, object])
    }

    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
    }

    return (
        <div>
            <div className="card container mt-4 ms-4 me-4">
                <div className="card-body">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label style={{ float: 'left' }}>Name</Form.Label>
                            <span style={{
                                display: "block",
                                overflow: "hidden",
                                padding: "0px 4px 0px 6px"
                            }}>
                                <Form.Control type="text" name="name" onChange={handleChange} required placeholder="" />
                            </span>
                        </Form.Group>
                        <br />
                        <Form.Group controlId="source">
                            <Form.Label style={{ float: 'left' }}>Source</Form.Label>
                            <span style={{
                                display: "block",
                                overflow: "hidden",
                                padding: "0px 4px 0px 6px"
                            }}>
                                <select name="source" value={formData.source}
                                    onChange={handleChange}
                                    defaultValue={{ label: "choose a station" }} required>
                                    <option value="">Choose a station</option>
                                    {station && station.map(st => (
                                        <option key={st.id} value={st.id} >
                                            {st.name}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        </Form.Group>
                        <br />
                        <Form.Group controlId="destination">
                            <Form.Label style={{ float: 'left' }}>Destination</Form.Label>
                            <span style={{
                                display: "block",
                                overflow: "hidden",
                                padding: "0px 4px 0px 6px"
                            }}>
                                <select name="destination" value={formData.destination}
                                    onChange={handleChange}
                                    defaultValue={{ label: "choose a station" }} required>
                                    <option value="">Choose a station</option>
                                    {station && station.map(st => (
                                        <option key={st.id} value={st.id}>
                                            {st.name}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <p></p>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
            {routeFlag == 'true' &&
                <div className="card container mt-4 ms-4 me-4">
                    <div className="card-header">
                        <h4>Intermediate stations</h4>
                    </div>
                    <div className="card-body">
                        <div>
                            <Form onSubmit={handleSubmit2}>
                                {formFields.map((form, index) => {
                                    return (
                                        <div key={index} className={routeCSS.flexParent}>
                                            <select className={routeCSS.flexfChild}
                                                name='station' value={form.station}
                                                onChange={event => handleFormChange(event, index)}
                                                required>
                                                <option value="">Choose a station</option>
                                                {station && station
                                                    .map(st => (
                                                        <option key={st.id} value={st.id}>
                                                            {st.name}
                                                        </option>
                                                    ))}
                                            </select>
                                            <Button onClick={() => removeFields(index)} className={routeCSS.flexsChild} variant="danger">
                                                Remove
                                            </Button>
                                        </div>
                                    )
                                })}
                            </Form>
                            <br />
                            <div className="mt-3 ">
                                <Button onClick={addFields} variant="primary">
                                    Add another
                                </Button>
                            </div>
                            <div className="mb-3 mt-3">
                                <Button onClick={handleSubmit2} variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    );
}

export default AddRoutes;