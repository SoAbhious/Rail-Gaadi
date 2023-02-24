import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import routeCSS from '../home.module.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Ticket = () => {
    const location = useLocation();
    let formData = location.state?.data

    const navigate = useNavigate()

    let userid = localStorage.getItem('userid')
    userid = userid.toString()

    const [user, setUser] = useState([])
    const [passengers, setPassengers] = useState([
        {
            name: '',
            age: '',
            mobile: '',
            userid: userid
        }
    ])

    Date.prototype.subHours = function (h) {
        this.setTime(this.getTime() - (h * 60 * 60 * 1000));
        return this;
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[parseInt(formData.date.substr(5, 2) - 1)];

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const d = new Date(formData.date);
    const day = days[d.getDay()];
    const date = formData.date.substr(8, 2)
    const year = d.getFullYear()

    const hh = parseInt(formData.time.substr(0, 2))
    const mm = parseInt(formData.time.substr(3, 2))
    d.setHours(hh, mm)
    d.subHours(10 / 60)

    let arrival = d.toLocaleTimeString('en-US', {
        hour12: false,
    }).substring(0, 5)

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/base/user/${userid}/`)
            .then(response => response.data)
            .then(data => {
                setUser(data)
            })
    }, [])

    const handleFormChange = (e, index) => {
        let val = e.target.name.toString()
        let data = [...passengers]
        data[index][val] = e.target.value
        setPassengers(data)
    }

    const addFields = () => {
        let object = {
            name: '',
            age: '',
            mobile: '',
            userid: userid
        }

        setPassengers([...passengers, object])
    }

    const removeFields = (index) => {
        let data = [...passengers];
        data.splice(index, 1)
        setPassengers(data)
    }

    const handleSubmit = () => {
        let helper = []
        axios.post('http://127.0.0.1:8000/base/post-passengers/', passengers)
            .then(response => response.data)
            .then(data => {
                helper = [...data]
            })
        let ticket = []    
        let finalForm = {}
        finalForm.userid = userid;
        finalForm.train = formData.train.id;
        finalForm.source = formData.sourceId
        finalForm.destination = formData.destId
        finalForm.class_field = formData.class
        finalForm.traveldate = formData.date
        finalForm.fare = (formData.baseFare*passengers.length).toString()
        axios.post('http://127.0.0.1:8000/base/booking/', finalForm)
            .then(response => response.data)
            .then(data => {
                for(let i = 0; i < passengers.length; i++) {
                    let obj = {
                        bookingid: data.id, 
                        passenger: helper[i]["id"]
                    }
                    ticket = [...ticket, obj]
                }
                axios.post('http://127.0.0.1:8000/base/ticket/', ticket)
            })
            .then(() => {
                navigate('/payment')
            })
    }

    return (
        <div className='container card mt-2 mb-4' style={{backgroundColor: 'rgb(0,0,0, 0.2)'}}>
            <div className='card mt-4 ms-4 me-4'>
                <div className='card-header' style={{ backgroundColor: '#ECEFF1' }}>
                    <span className='h5 pt-4 pb-4'><b>{formData.train.name} ({formData.train.id}</b>)</span>
                </div>
                <div className='card-body' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <div className='h5'><b className=''>{formData.time.substr(0, 5)} | {formData.sourceName}</b> </div>
                        <div className='d-flex justify-content-center'>{day}, {date} {month}</div>
                    </div>
                    <span className='h5'>---- {formData.tt} ----</span>
                    <div>
                        <div className='h5'><b>{formData.reachingTime} | {formData.destName}</b> </div>
                        <div className='d-flex justify-content-center'>{days[formData.datetime.getDay()]}, {formData.datetime.getDate()} {months[formData.datetime.getMonth()]}</div>
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    {formData.class == 'sl' && <b>Sleeper (SL)</b>}
                    {formData.class == 'ac1' && <b>AC 1 Tier (1A)</b>}
                    {formData.class == 'ac2' && <b>AC 2 Tier (2A)</b>}
                    {formData.class == 'ac3' && <b>AC 3 Tier (3A)</b>}
                </div>
                <div className='card mt-2 ms-4 me-4 mb-4'
                    style={{
                        borderWidth: 'medium', height: '35px',
                        borderColor: '#0066b2', borderRadius: '0'
                    }}>
                    <div className='mt-1 ms-1 d-flex justify-content-evenly'
                        style={{ color: '#2a52be' }}>
                        Boarding station: <b>{formData.sourceName}</b> | Arrival: <b>{arrival}</b> | Departure: <b>{formData.time.substr(0, 5)}</b> | Boarding Date: <b>{date} {month}, {year}</b>
                    </div>
                </div>
            </div>
            <div className='card mt-4 ms-4 me-4'>
                <div className='card-header fw-bold h5'>Passenger Details</div>
                <div className='card-body mt-2'>
                    <div>
                        <Form onSubmit={handleSubmit}>
                            {passengers && passengers.map((form, index) => {
                                return (
                                    <div key={index} className={routeCSS.flexParent}>
                                        <input className={routeCSS.flexfChild}
                                            name='name' type='text'
                                            value={form.name}
                                            onChange={event => handleFormChange(event, index)}
                                            placeholder='Name'
                                            required>
                                        </input>
                                        <input className={routeCSS.flexfChild}
                                            name='age' type='number'
                                            value={form.age}
                                            onChange={event => handleFormChange(event, index)}
                                            placeholder='Age'
                                            required>
                                        </input>
                                        <input className={routeCSS.flexfChild}
                                            name='mobile' type='text'
                                            value={form.mobile}
                                            onChange={event => handleFormChange(event, index)}
                                            placeholder='Mobile No.'
                                            required>
                                        </input>
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
                    </div>
                </div>
            </div>

            <div className='card mt-4 ms-4 me-4'>
                <div className='card-header fw-bold h5'>Contact Details</div>
                <div className='card-body mt-2 d-flex'>
                    <span className='card ps-2 pt-2 pb-2 pe-2' style={{ borderRadius: '2px', backgroundColor: '#E8E8E8', color: '#707070' }}>91</span>
                    <input defaultValue={user && user.phone} className='card ps-2 pt-2 pb-2' type='text' style={{ borderRadius: '2px', color: 'blue' }} />
                </div>
            </div>

            <div className='card mt-4 ms-4 me-4'>
                <div className='card-header fw-bold h5'>Payment mode</div>
                <div className='card-body mt-2 d-flex'>
                    <form>
                        <input type="radio" id="html" name="fav_language" value="HTML" />
                        <label className='ms-1' for="html">Pay through Credit & Debit cards</label><br />
                        <input type="radio" id="css" name="fav_language" value="CSS" />
                        <label className='ms-1' for="css">Pay through BHIM/UPI</label><br />
                    </form>
                </div>
            </div>
            <div className="mb-3 mt-3 ms-4">
                <Button onClick={handleSubmit} variant="primary" type="submit">
                    Continue
                </Button>
            </div>
        </div>
    );
}

export default Ticket;