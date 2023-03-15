import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getRoute} from '../../services/routeService';
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddTrainModal from './AddTrainModal';
import UpdateTrainModal from './UpdateTrainModal';
import {deleteRoute} from '../../services/routeService';



const AdminRoutes = () => {
    const [route, setRoute] = useState([]);
    // const [addModalShow, setAddModalShow] = useState(false);
    // const [editModalShow, setEditModalShow] = useState(false);
    // const [editTrain, setEditTrain] = useState([]);
    const [isUpdated, setIsupdated] = useState(false);

    // let AddModalClose = () => setAddModalShow(false);
    // let EditModalClose = () => setEditModalShow(false);

    useEffect(() => {
        let mounted = true;
        if(route.length && !isUpdated) {
            return;
        }
        getRoute()
            .then(data => {
                if(mounted) {
                    setRoute(data)
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
        return () => {
            mounted = false;
            setIsupdated(false); 
        }; 
    }, [isUpdated, route]);

    // const handleUpdate = (e, us) => {
    //     e.preventDefault();
    //     setEditModalShow(true);
    //     setEditTrain(us);
    // };

    const handleDelete = (e, id) => {
        if(window.confirm('Are you sure?')) {
            e.preventDefault();
            deleteRoute(id)
            .then((result) =>{
                alert(result);
                setIsupdated(true);
            },
            (error)=>{
                alert('Failed to delete route!')
            }
            );
        }
    };

    return (
        <div className="container mt-4">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"/>
            <div className="row">
                <section>
                    <div className='card' style={{backgroundColor: '#40445a', boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px'}}>
                        <h5 className='card-header text-white fw-bold'>Trains</h5>
                        <div className='card-body'>
                            <table className='table table-dark table-striped'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Source</th>
                                        <th>Destination</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {route && route.map((route) => 
                                        <tr key={route.id}> 
                                            <td>{route.id}</td>
                                            <td>{route.name}</td>
                                            <td>{route.source && route.source.name}</td>
                                            <td>{route.destination && route.destination.name}</td>
                                            <td>
                                                <button type="button" className="btn btn-danger btn-sm"
                                                onClick={event => handleDelete(event, route.id)}>
                                                    <i class="fa-solid fa-trash"></i>
                                                </button>
                                                <span>&nbsp; &nbsp;</span>
                                                {/* <button type="button" className="btn btn-primary btn-sm" 
                                                onClick={event => handleUpdate(event, train)}>
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <UpdateTrainModal show={editModalShow} onHide={EditModalClose}
                                                train = {editTrain} setUpdated={setIsupdated}>
                                                </UpdateTrainModal> */}
                                            </td>
                                        </tr> 
                                    )}
                                </tbody>
                            </table>
                            <ButtonToolbar>
                                <Link to='/add-routes' type="button" className="btn btn-success">
                                    Add
                                </Link>
                            </ButtonToolbar>
                        </div>
                    </div>
                </section>
            </div>
        </div>    
    );    

};
    

export default AdminRoutes;