import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react';
import {getUser} from '../../services/userService';
import { useParams } from 'react-router-dom';

const Sidebar = () => {

    return (
        <div className='card'>
            <Link to={`/user-dashboard`} className='card-header'>Dashboard</Link>
            <div className="list-group list-group-flush">
                <Link to="/" className="list-group-item list-group-item-action text-muted">Book ticket</Link>
                <Link to="/user-bookings" className="list-group-item list-group-item-action text-muted">My bookings</Link>
                <Link to="/user-passengers" className="list-group-item list-group-item-action text-muted">My passengers</Link>
                <Link to="/user-update-details" className="list-group-item list-group-item-action text-muted">Update details</Link>
                <Link to="/user-change-password" className="list-group-item list-group-item-action text-muted">Change password</Link>
                <Link to="/user-logout" className="list-group-item list-group-item-action text-danger">Logout</Link>
            </div>
        </div>
    );
}

export default Sidebar;