import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userService';
import { Button, ButtonToolbar } from 'react-bootstrap';
import AddUserModal from './AddUserModal';
import UpdateUserModal from './UpdateUserModal';
import { deleteUser } from '../../services/userService';
import MaterialReactTable from 'material-react-table';
import axios from 'axios';


const AdminManage = () => {
    const [user, setUser] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editUser, setEditUser] = useState([]);
    const [isUpdated, setIsupdated] = useState(false);

    // pagination variables
    const [prev, setPrev] = useState()
    const [next, setNext] = useState()

    useEffect(() => {
        let mounted = true;
        if (user.length && !isUpdated) {
            return;
        }
        axios.get('http://127.0.0.1:8000/base/user/')
            .then(response => {
                if (mounted) {
                    setUser(response.data.results)
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
        if (window.confirm('Are you sure?')) {
            e.preventDefault();
            deleteUser(id)
                .then((result) => {
                    alert(result);
                    setIsupdated(true);
                },
                    (error) => {
                        alert('Failed to delete user!')
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
                    setUser(response.data.results)
                });
        } catch (error) {
            console.log(error)
        }
    }


    let AddModalClose = () => setAddModalShow(false);
    let EditModalClose = () => setEditModalShow(false);

    const columns = useMemo(
        () => [
          {
            accessorKey: 'id', //access nested data with dot notation
            header: 'ID',
          },
          {
            accessorKey: 'username',
            header: 'Username',
          },
          {
            accessorKey: 'firstname', //normal accessorKey
            header: 'Firstname',
          },
          {
            accessorKey: 'lastname',
            header: 'Lastname',
          },
          {
            accessorKey: 'gender',
            header: 'Gender',
          },
          {
            accessorKey: 'dob',
            header: 'DOB',
          },
          {
            accessorKey: 'aadhar',
            header: 'Aadhar',
          },
          {
            accessorKey: 'email',
            header: 'Email',
          },
          {
            accessorKey: 'phone',
            header: 'Phone',
          },
        ],
        [],
      );
    
    return (
        <div className='container mt-4 card' style={{ boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px' }}>
            <h5 className='card-header fw-bold'>Users</h5>
            <MaterialReactTable style={{backgroundColor:'blue', color: 'white',}} columns={columns} data={user} />
        </div>
    )

    // return (
    //     <div className="container mt-4">
    //         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
    //         <div className="row">
    //             <section>
    //                 <div className='card' style={{ boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px' }}>
    //                     <h5 className='card-header'>Users</h5>
    //                     <div className='card-body'>
    //                         <table className='table table-light table-hover'>
    //                             <thead>
    //                                 <tr>
    //                                     <th>ID</th>
    //                                     <th>Username</th>
    //                                     <th>Firstname</th>
    //                                     <th>Lastname</th>
    //                                     <th>Gender</th>
    //                                     <th>DOB</th>
    //                                     <th>Aadhar</th>
    //                                     <th>Email</th>
    //                                     <th>Phone</th>
    //                                     <th>Actions</th>
    //                                 </tr>
    //                             </thead>
    //                             <tbody>
    //                                 {user && user.map((us) =>
    //                                     <tr key={us.id}>
    //                                         <td>{us.id}</td>
    //                                         <td>{us.username}</td>
    //                                         <td>{us.firstname}</td>
    //                                         <td>{us.lastname}</td>
    //                                         <td>{us.gender}</td>
    //                                         <td>{us.dob}</td>
    //                                         <td>{us.aadhar}</td>
    //                                         <td>{us.email}</td>
    //                                         <td>{us.phone}</td>
    //                                         <td>
    //                                             <button type="button" className="btn btn-danger btn-sm"
    //                                                 onClick={event => handleDelete(event, us.id)}>
    //                                                 <i class="fa-solid fa-trash"></i>
    //                                             </button>
    //                                             <span>&nbsp; &nbsp;</span>
    //                                             <button type="button" className="btn btn-primary btn-sm"
    //                                                 onClick={event => handleUpdate(event, us)}>
    //                                                 <i className="fa-solid fa-pen-to-square"></i>
    //                                             </button>
    //                                             <UpdateUserModal show={editModalShow} onHide={EditModalClose}
    //                                                 user={editUser} setUpdated={setIsupdated}>
    //                                             </UpdateUserModal>
    //                                         </td>
    //                                     </tr>
    //                                 )}
    //                             </tbody>
    //                         </table>
    //                     </div>
    //                 </div>
    //             </section>
    //         </div>
    //         <div className='mt-4'>
    //             <nav aria-label='Page navigation example'>
    //                 <ul className='pagination justify-content-center'>
    //                     {prev &&
    //                         <li className='page-item'><button className='page-link' onClick={() => paginationHandler(prev)}><i className='bi bi-arrow-bar-left'></i>Previous</button></li>
    //                     }
    //                     <span>&nbsp;</span>
    //                     {next &&
    //                         <li className='page-item'><button className='page-link' onClick={() => paginationHandler(next)}><i className='bi bi-arrow-bar-left'></i>Next</button></li>
    //                     }
    //                 </ul>
    //             </nav>
    //         </div>
    //     </div>
    // );

};


export default AdminManage;