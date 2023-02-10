import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getUser} from '../../services/userService';
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddUserModal from './AddUserModal';
import UpdateUserModal from './UpdateUserModal';
import {deleteUser} from '../../services/userService';


const AdminManage = () => {
    const [user, setUser] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editUser, setEditUser] = useState([]);
    const [isUpdated, setIsupdated] = useState(false);

    useEffect(() => {
        let mounted = true;
        if(user.length && !isUpdated) {
            return;
        }
        getUser()
            .then(data => {
            if(mounted) {
                setUser(data)
            }
            })
        return () => {
            mounted = false;
            setIsupdated(false); 
        }; 
    }, [isUpdated, user]);

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleUpdate = (e, us) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditUser(us);
    };

    const handleDelete = (e, id) => {
        if(window.confirm('Are you sure?')) {
            e.preventDefault();
            deleteUser(id)
            .then((result) =>{
                alert(result);
                setIsupdated(true);
            },
            (error)=>{
                alert('Failed to delete user!')
            }
            );
        }
    };


    let AddModalClose = () => setAddModalShow(false);
    let EditModalClose = () => setEditModalShow(false);

    return (
        <div className="container mt-4">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"/>
            <div className="row">
                <section>
                    <div className='card'>
                        <h5 className='card-header'>Users</h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Firstname</th>
                                        <th>Lastname</th>
                                        <th>Gender</th>
                                        <th>DOB</th>
                                        <th>Aadhar</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.map((us) => 
                                        <tr key={us.id}> 
                                            <td>{us.id}</td>
                                            <td>{us.username}</td>
                                            <td>{us.firstname}</td>
                                            <td>{us.lastname}</td>
                                            <td>{us.gender}</td>
                                            <td>{us.dob}</td>
                                            <td>{us.aadhar}</td>
                                            <td>{us.email}</td>
                                            <td>{us.phone}</td>
                                            <td>
                                                <button type="button" className="btn btn-danger btn-sm"
                                                onClick={event => handleDelete(event, us.id)}>
                                                    <i class="fa-solid fa-trash"></i>
                                                </button>
                                                <span>&nbsp; &nbsp;</span>
                                                <button type="button" className="btn btn-primary btn-sm" 
                                                onClick={event => handleUpdate(event, us)}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <UpdateUserModal show={editModalShow} onHide={EditModalClose}
                                                user = {editUser} setUpdated={setIsupdated}>
                                                </UpdateUserModal>
                                            </td>
                                        </tr> 
                                    )}
                                </tbody>
                            </table>
                            {/* <ButtonToolbar>
                                <button onClick={handleAdd} type="button" className="btn btn-success">
                                    <i class="fa-solid fa-user-plus"></i>
                                </button>
                                <AddUserModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsupdated}></AddUserModal>
                            </ButtonToolbar> */}
                        </div>
                    </div>
                </section>
            </div>
        </div>    
    );    

};
    

export default AdminManage;