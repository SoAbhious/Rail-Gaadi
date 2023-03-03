import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {addStation, getStation} from '../../services/stationService';
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddStationModal from './AddStationModal';
import UpdateStationModal from './UpdateStationModal';
import {deleteStation} from '../../services/stationService';



const Stations = () => {
    const [station, setStation] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editStation, setEditStation] = useState([]);
    const [isUpdated, setIsupdated] = useState(false);

    let AddModalClose = () => setAddModalShow(false);
    let EditModalClose = () => setEditModalShow(false);

    useEffect(() => {
        let mounted = true;
        if(station.length && !isUpdated) {
            return;
        }
        getStation()
            .then(data => {
                if(mounted) {
                    setStation(data)
                    console.log(data)
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
        if(window.confirm('Are you sure?')) {
            e.preventDefault();
            deleteStation(id)
            .then((result) =>{
                alert(result);
                setIsupdated(true);
            },
            (error)=>{
                alert('Failed to delete train!')
            }
            );
        }
    };

    return (
        <div className="container mt-4">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"/>
            <div className="row">
                <section>
                    <div className='card mb-4' style={{boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px'}}>
                        <h5 className='card-header'>Stations</h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
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
                                                station = {editStation} setUpdated={setIsupdated}>
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
        </div>    
    );    

};
    

export default Stations;