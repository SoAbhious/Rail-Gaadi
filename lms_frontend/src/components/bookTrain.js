import homeCSS from './home.module.css';
import { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { Form, Button, Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


const BookTrain = () => {
    const location = useLocation();
    let formData = location.state?.data

    const [finalForm, setFinalForm] = useState([]);
    const [flag, setFlag] = useState(false);
    const bookInProgress = localStorage.getItem('bookInProgress')
    const [selectedClass, setSelectedClass] = useState()
    const [baseFare, setBaseFare] = useState('0')

    const [errorMsg, setErrorMsg] = useState('')
    const sendData = new FormData();
    sendData.append('source', formData.source);
    sendData.append('destination', formData.destination);
    sendData.append('date', formData.date);
    sendData.append('destName', formData.destName);
    sendData.append('sourceName', formData.sourceName);

    Date.prototype.addHours = function (h) {
        this.setTime(this.getTime() + (h * 60 * 60 * 1000));
        return this;
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[parseInt(formData.date.substr(5, 2) - 1)];

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const d = new Date(formData.date);
    const day = days[d.getDay()];
    const date = formData.date.substr(8, 2)


    useEffect(() => {
        if(bookInProgress == 'true') {
            localStorage.setItem('bookInProgress', false);
            window.location.reload();
        }
        
        axios.post('http://127.0.0.1:8000/base/helper-route/', sendData)
            .then(response => response.data)
            .then(data => {
                if (data.length == 0) {
                    setErrorMsg('No direct trains available between the selected stations!!')
                }
                for (let i = 0; i < data.length; i++) {
                    var decimalTimeString = data[i].stations;
                    var n = new Date(0, 0);
                    n.setMinutes(+decimalTimeString * 60);
                    data[i].tt = n.toTimeString().slice(0, 5);
                    const new_date = new Date(formData.date)
                    const hh = parseInt(data[i].time.substr(0, 2))
                    const mm = parseInt(data[i].time.substr(3, 2))
                    new_date.setHours(hh, mm)
                    new_date.addHours(data[i].stations)
                    data[i].datetime = new_date
                    data[i].reachingTime = new_date.toLocaleTimeString('en-US', {
                        hour12: false,
                    }).substring(0, 5)
                }
                setFinalForm(data)
            })
    }, [])

    useEffect(() => {
        let data = {}
        let data1 = {}
        let data2 = {}
        for (let key in finalForm) {
            data = { ...data, [finalForm[key].id]: false }
            data1 = { ...data1, [finalForm[key].id]: '' }
            data2 = { ...data2, [baseFare[key].id]: '' }
        }
        setFlag(data)
        setSelectedClass(data1)
    }, [])

    return (
        <div className="container mt-4 ms-4 me-4" >
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
            {finalForm.length > 0 && finalForm.map((gaadi, index) => (
                <div className='card mt-4' style={{boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'}}>
                    <div className='card-header' style={{ backgroundColor: '#ECEFF1' }}>
                        <span className='h5 pt-4 pb-4'><b>{gaadi.train.name} ({gaadi.train.id}</b>)</span>
                    </div>
                    <div className='card-body' style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className='h5'><b className=''>{gaadi.time.substr(0, 5)}</b> | {formData.sourceName} | {day}, {date} {month}</span>
                        <span className='h5'>---- {gaadi.tt} ----</span>
                        <span className='h5'><b className='text-dark'>{gaadi.reachingTime}</b> | {formData.destName} | {days[gaadi.datetime.getDay()]}, {gaadi.datetime.getDate()} {months[gaadi.datetime.getMonth()]}</span>
                    </div>
                    <div className='container mb-2'>
                        <div className='row mb-2' style={{ height: '80px', display: 'flex' }}>
                            <span className='col-lg-2 card ms-3 h-100'
                                style={selectedClass &&
                                {
                                    backgroundColor: (selectedClass[index] == 'sl') ? '#FAD5A5' : '#ECEFF1',
                                    borderStyle: (selectedClass[index] == 'sl') ? 'solid' : '',
                                    borderColor: (selectedClass[index] == 'sl') ? '#00308F' : '',
                                    borderWidth: '0px',
                                    boxShadow: (selectedClass[index] == 'sl') ? 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px': ''
                                }}
                                onClick={() => (setSelectedClass({ ...selectedClass, [index]: 'sl' }), setBaseFare({ ...baseFare, [index]: gaadi.stations * 100 }))}>
                                <div className='fw-bold mt-2'>
                                    Sleeper (SL)
                                </div>
                                {!flag[index] &&
                                    <div className='text-dark'
                                        style={{ textDecoration: 'none', cursor: 'pointer' }}
                                        onClick={() => setFlag(flag => ({ ...flag, [index]: !flag[index] }))}>
                                        Refresh <i className="fa-solid fa-rotate-right"></i>
                                    </div>
                                }
                                {flag[index] && gaadi.sl == 0 &&
                                    <div className='text-danger'>
                                        NOT AVAILABLE
                                    </div>
                                }
                                {flag[index] && gaadi.sl > 0 &&
                                    <div className='text-success'>
                                        AVAILABLE - {gaadi.sl}
                                    </div>
                                }
                            </span>
                            <span className='col-lg-2 card ms-4 h-100'
                                style={selectedClass &&
                                {
                                    backgroundColor: (selectedClass[index] == 'ac3') ? '#FAD5A5' : '#ECEFF1',
                                    borderStyle: (selectedClass[index] == 'ac3') ? 'solid' : '',
                                    borderColor: (selectedClass[index] == 'ac3') ? '#00308F' : '',
                                    borderWidth: '0px',
                                    boxShadow: (selectedClass[index] == 'ac3') ? 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px': ''
                                }}
                                onClick={(e) => (setSelectedClass({ ...selectedClass, [index]: 'ac3' }), setBaseFare({ ...baseFare, [index]: gaadi.stations * 140 }))}>
                                <div className='mt-2 fw-bold'>
                                    AC 3 Tier (3A)
                                </div>
                                {!flag[index] &&
                                    <div className='text-dark'
                                        style={{ textDecoration: 'none', cursor: 'pointer' }}
                                        onClick={() => setFlag(flag => ({ ...flag, [index]: !flag[index] }))}>
                                        Refresh <i className="fa-solid fa-rotate-right"></i>
                                    </div>
                                }
                                {flag[index] && gaadi.ac3 == 0 &&
                                    <div className='text-danger'>
                                        NOT AVAILABLE
                                    </div>
                                }
                                {flag[index] && gaadi.ac3 > 0 &&
                                    <div className='text-success'>
                                        AVAILABLE - {gaadi.ac3}
                                    </div>
                                }
                            </span>
                            <span className='col-lg-2 card ms-4 h-100'
                                style={selectedClass &&
                                {
                                    backgroundColor: (selectedClass[index] == 'ac2') ? '#FAD5A5' : '#ECEFF1',
                                    borderStyle: (selectedClass[index] == 'ac2') ? 'solid' : '',
                                    borderColor: (selectedClass[index] == 'ac2') ? '#00308F' : '',
                                    borderWidth: '0px',
                                    boxShadow: (selectedClass[index] == 'ac2') ? 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px': ''
                                }}
                                onClick={(e) => (setSelectedClass({ ...selectedClass, [index]: 'ac2' }), setBaseFare({ ...baseFare, [index]: gaadi.stations * 200 }))}>
                                <div className='mt-2 fw-bold'>
                                    AC 2 Tier (2A)
                                </div>
                                {!flag[index] &&
                                    <div className='text-dark'
                                        style={{ textDecoration: 'none', cursor: 'pointer' }}
                                        onClick={() => setFlag(flag => ({ ...flag, [index]: !flag[index] }))}>
                                        Refresh <i className="fa-solid fa-rotate-right"></i>
                                    </div>
                                }
                                {flag[index] && gaadi.ac2 == 0 &&
                                    <div className='text-danger'>
                                        NOT AVAILABLE
                                    </div>
                                }
                                {flag[index] && gaadi.ac2 > 0 &&
                                    <div className='text-success'>
                                        AVAILABLE - {gaadi.ac2}
                                    </div>
                                }
                            </span>
                            <span className='col-lg-2 card ms-4 h-100'
                                style={selectedClass &&
                                {
                                    backgroundColor: (selectedClass[index] == 'ac1') ? '#FAD5A5' : '#ECEFF1',
                                    borderStyle: (selectedClass[index] == 'ac1') ? 'solid' : '',
                                    borderColor: (selectedClass[index] == 'ac1') ? '#00308F' : '',
                                    borderWidth: '0px',
                                    boxShadow: (selectedClass[index] == 'ac1') ? 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px': ''
                                }}
                                onClick={(e) => (setSelectedClass({ ...selectedClass, [index]: 'ac1' }), setBaseFare({ ...baseFare, [index]: gaadi.stations * 300 }))}>
                                <div className='mt-2 fw-bold'>
                                    AC 1 Tier (1A)
                                </div>
                                {!flag[index] &&
                                    <div className='text-dark' style={{ textDecoration: 'none', cursor: 'pointer' }} onClick={() => setFlag(flag => ({ ...flag, [index]: !flag[index] }))}>
                                        Refresh <i className="fa-solid fa-rotate-right"></i>
                                    </div>
                                }
                                {flag[index] && gaadi.ac1 == 0 &&
                                    <div className='text-danger'>
                                        NOT AVAILABLE
                                    </div>
                                }
                                {flag[index] && gaadi.ac1 > 0 &&
                                    <div className='text-success'>
                                        AVAILABLE - {gaadi.ac1}
                                    </div>
                                }
                            </span>
                        </div>
                    </div>
                    <div className='container ms-1 mt-2 mb-3'>
                        {(!selectedClass[index] || gaadi[selectedClass[index]] == 0) &&
                            <div className='btn btn-orange' style={{ backgroundColor: '#FFD580' }}>
                                Book Now
                            </div>
                        }
                        {selectedClass[index] && gaadi[selectedClass[index]] > 0 &&
                            <>
                                <span><Link to='/book-ticket'
                                    state={{
                                        data: {
                                            ...gaadi, class: selectedClass[index],
                                            sourceName: formData.sourceName, destName: formData.destName,
                                            baseFare: baseFare[index], sourceId: formData.source, destId: formData.destination
                                        }
                                    }}
                                    className='btn btn-orange'
                                    style={{ backgroundColor: '#E3963E', boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px'}}>
                                    Book Now
                                </Link>
                                </span>
                                <span className='ms-1'>
                                    &#8377; {baseFare[index]}
                                </span>

                            </>
                        }
                    </div>
                </div>
            ))}
            {errorMsg &&
                <div className='card ps-2 pt-2 pb-2 text-danger justify-content-center'>
                    {errorMsg}
                </div>
            }
        </div>
    );
}

export default BookTrain;
