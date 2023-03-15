import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getTrain} from '../../services/trainService';
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddTrainModal from './AddTrainModal';
import UpdateTrainModal from './UpdateTrainModal';
import {deleteTrain} from '../../services/trainService';



const AdminTrains = () => {
    const [train, setTrain] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editTrain, setEditTrain] = useState([]);
    const [isUpdated, setIsupdated] = useState(false);

    let AddModalClose = () => setAddModalShow(false);
    let EditModalClose = () => setEditModalShow(false);

    useEffect(() => {
        let mounted = true;
        if(train.length && !isUpdated) {
            return;
        }
        getTrain()
            .then(data => {
                if(mounted) {
                    setTrain(data)
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
        return () => {
            mounted = false;
            setIsupdated(false); 
        }; 
    }, [isUpdated, train]);

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleUpdate = (e, us) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditTrain(us);
    };

    const handleDelete = (e, id) => {
        if(window.confirm('Are you sure?')) {
            e.preventDefault();
            deleteTrain(id)
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
                    <div className='card' style={{backgroundColor: '#40445a', boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px'}}>
                        <h5 className='card-header text-white'>Trains</h5>
                        <div className='card-body'>
                            <table className='table table-dark table-striped'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Travel Time</th>
                                        <th>SL</th>
                                        <th>1A</th>
                                        <th>2A</th>
                                        <th>3A</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {train && train.map((train) => 
                                        <tr key={train.id}> 
                                            <td>{train.id}</td>
                                            <td>{train.name}</td>
                                            <td>{train.source.name}</td>
                                            <td>{train.destination.name}</td>
                                            <td>{train.traveltime}</td>
                                            <td>{train.sl}</td>
                                            <td>{train.ac1}</td>
                                            <td>{train.ac2}</td>
                                            <td>{train.ac3}</td>
                                            <td>
                                                <button type="button" className="btn btn-danger btn-sm"
                                                onClick={event => handleDelete(event, train.id)}>
                                                    <i class="fa-solid fa-trash"></i>
                                                </button>
                                                <span>&nbsp; &nbsp;</span>
                                                <button type="button" className="btn btn-primary btn-sm" 
                                                onClick={event => handleUpdate(event, train)}>
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <UpdateTrainModal show={editModalShow} onHide={EditModalClose}
                                                train = {editTrain} setUpdated={setIsupdated}>
                                                </UpdateTrainModal>
                                            </td>
                                        </tr> 
                                    )}
                                </tbody>
                            </table>
                            <ButtonToolbar>
                                <button onClick={handleAdd} type="button" className="btn btn-success">
                                    Add
                                </button>
                                <AddTrainModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsupdated}></AddTrainModal>
                            </ButtonToolbar>
                        </div>
                    </div>
                </section>
            </div>
        </div>    
    );    

};
    

export default AdminTrains;