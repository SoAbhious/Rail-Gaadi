import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addStation, getStation } from '../../services/stationService';
import { Button, ButtonToolbar } from 'react-bootstrap';
import AddStationModal from './AddStationModal';
import UpdateStationModal from './UpdateStationModal';
import { deleteStation } from '../../services/stationService';
import axios from 'axios';



const Stations = () => {
    const [station, setStation] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editStation, setEditStation] = useState([]);
    const [isUpdated, setIsupdated] = useState(false);

    // pagination variables
    const [prev, setPrev] = useState()
    const [next, setNext] = useState()

    let AddModalClose = () => setAddModalShow(false);
    let EditModalClose = () => setEditModalShow(false);

    useEffect(() => {
        let mounted = true;
        if (station.length && !isUpdated) {
            return;
        }
        axios.get('http://127.0.0.1:8000/base/stations/')
            .then(response => {
                if (mounted) {
                    setStation(response.data.results)
                    setPrev(response.data.previous)
                    setNext(response.data.next)
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
        return () => {
            mounted = false;
            setIsupdated(false);
        };
    }, [isUpdated]);

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleUpdate = (e, us) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditStation(us);
    };

    const handleDelete = (e, id) => {
        if (window.confirm('Are you sure?')) {
            e.preventDefault();
            deleteStation(id)
                .then((result) => {
                    alert(result);
                    setIsupdated(true);
                },
                    (error) => {
                        alert('Failed to delete train!')
                    }
                );
        }
    };

    const paginationHandler = (url) => {
        try {
            axios.get(url)
                .then((response) => {
                    setNext(response.data.next)
                    setPrev(response.data.previous)
                    setStation(response.data.results)
                });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container mt-4">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
            <div className="row">
                <section>
                    <div className='card mb-4' style={{backgroundColor: '#40445a', boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px' }}>
                        <h5 className='card-header text-white fw-bold'>Stations</h5>
                        <div className='card-body'>
                            <table className='table table-dark table-striped'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Station code</th>
                                        <th>Address</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {station && station.map((station) =>
                                        <tr key={station.id}>
                                            <td>{station.id}</td>
                                            <td>{station.name}</td>
                                            <td>{station.station_code}</td>
                                            <td>{station.address}</td>
                                            <td>
                                                <button type="button" className="btn btn-danger btn-sm"
                                                    onClick={event => handleDelete(event, station.id)}>
                                                    <i class="fa-solid fa-trash"></i>
                                                </button>
                                                <span>&nbsp; &nbsp;</span>
                                                <button type="button" className="btn btn-primary btn-sm"
                                                    onClick={event => handleUpdate(event, station)}>
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <UpdateStationModal show={editModalShow} onHide={EditModalClose}
                                                    station={editStation} setUpdated={setIsupdated}>
                                                </UpdateStationModal>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <ButtonToolbar>
                                <button onClick={handleAdd} type="button" className="btn btn-success">
                                    Add
                                </button>
                                <AddStationModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsupdated}></AddStationModal>
                            </ButtonToolbar>
                        </div>
                    </div>
                </section>
            </div>
            <div className='mt-4'>
                <nav aria-label='Page navigation example'>
                    <ul className='pagination justify-content-center'>
                        {prev &&
                            <li className='page-item' style={{ boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px' }}>
                                <button className='page-link' onClick={() => paginationHandler(prev)}><i className='bi bi-arrow-bar-left'></i>
                                    Previous
                                </button>
                            </li>
                        }
                        <span>&nbsp;</span>
                        {next &&
                            <li className='page-item' style={{ boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px' }}>
                                <button className='page-link' onClick={() => paginationHandler(next)}><i className='bi bi-arrow-bar-left'></i>
                                    Next
                                </button>
                            </li>
                        }
                    </ul>
                </nav>
            </div>
        </div>
    );

};


export default Stations;