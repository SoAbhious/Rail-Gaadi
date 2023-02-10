import {Link} from 'react-router-dom'
import Sidebar from './sidebar';
import {useState, useEffect} from 'react';
import { getUserPassenger, deletePassenger } from '../../services/userService';
import UpdatePassengerModal from './UpdatePassenger';
import AddPassengerModal from './AddPassenger';
import {ButtonToolbar} from 'react-bootstrap';

function Passengers() {

    const [user, setUser] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editPassenger, setEditPassenger] = useState([]);
    const [isUpdated, setIsupdated] = useState(false);

    let AddModalClose = () => setAddModalShow(false);
    let EditModalClose = () => setEditModalShow(false);

    useEffect(() => {
        let mounted = true;
        if(user.length && !isUpdated) {
            return;
        }
        getUserPassenger()
            .then(data => {
            if(mounted) {
                setUser(data)
            }
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

    const handleUpdate = (e, pass) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditPassenger(pass);
    };

    const handleDelete = (e, id) => {
        if(window.confirm('Are you sure?')) {
            e.preventDefault();
            deletePassenger(id)
            .then((result) =>{
                alert(result);
                setIsupdated(true);
            },
            (error)=>{
                alert('Failed to delete passenger!')
            }
            );
        }
    };
    


    return (
        <div className="container mt-4">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"/>
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className='card'>
                        <h5 className='card-header'>My passengers</h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Mobile No.</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.passenger1 && user.passenger1.map((pass) =>
                                        <tr key = { pass.id } >
                                            <td>{pass.name}</td>
                                            <td>{pass.age}</td>
                                            <td>{pass.mobile}</td>
                                            <td> 
                                                <button type="button" className="btn btn-danger btn-sm"
                                                onClick={event => handleDelete(event, pass.id)}>
                                                    <i class="fa-solid fa-trash"></i>
                                                </button>
                                                <span>&nbsp; &nbsp;</span>
                                                <button type="button" className="btn btn-primary btn-sm" 
                                                onClick={event => handleUpdate(event, pass)}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <UpdatePassengerModal show={editModalShow} onHide={EditModalClose}
                                                passenger = {editPassenger} setUpdated={setIsupdated}>
                                                </UpdatePassengerModal>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <ButtonToolbar>
                                <button onClick={handleAdd} type="button" className="btn btn-success">
                                    Add
                                </button>
                                <AddPassengerModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsupdated}></AddPassengerModal>
                            </ButtonToolbar>
                        </div>
                    </div>
                </section>
            </div>
        </div>    
    );
}

export default Passengers;