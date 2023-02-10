import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getUser} from '../../services/userService';
import Sidebar from './sidebar';




const AdminUsers = () => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        let mounted = true;
        getUser()
            .then(data => {
            if(mounted) {
                setUser(data)
            }
            })
        return () => mounted = false;  
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-2">
                    <Sidebar />
                </aside>
                <section className="col-md-10">
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
                                        <th>Password</th>
                                        <th>Gender</th>
                                        <th>DOB</th>
                                        <th>Email</th> 
                                        <th>Phone</th>
                                        <th>Aadhar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.map((us) => 
                                        <tr key={us.id}> 
                                        <td>{us.id}</td>
                                        <td>{us.username}</td>
                                        <td>{us.firstname}</td>
                                        <td>{us.lastname}</td>
                                        <td>{us.password}</td>
                                        <td>{us.gender}</td>
                                        <td>{us.dob}</td>
                                        <td>{us.email}</td>
                                        <td>{us.phone}</td>
                                        <td>{us.aadhar}</td>
                                        </tr> 
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>    
    );    

};
    

export default AdminUsers;