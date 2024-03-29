import {Link} from 'react-router-dom';


function AdminSidebar() {

    return (
        <div className='card' style={{boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px'}}>
            <Link to="/admin-dashboard" className='card-header'>Dashboard</Link>
            <div className="list-group list-group-flush">
                <Link to="/admin-manage-users" className="list-group-item list-group-item-action text-muted">Users</Link>
                <Link to="/admin-bookings" className="list-group-item list-group-item-action text-muted">Bookings</Link>
                <Link to="/admin-manage-trains" className="list-group-item list-group-item-action text-muted">Manage Trains</Link>
                <Link to="/admin-manage-stations" className="list-group-item list-group-item-action text-muted">Manage Stations</Link>
                <Link to="/routes" className="list-group-item list-group-item-action text-muted">Manage Routes</Link>
                <Link to="/train-report" className="list-group-item list-group-item-action text-muted">Train Report</Link>
                <Link to="/admin-update-details" className="list-group-item list-group-item-action text-muted">Update details</Link>
                <Link to="/admin-change-password" className="list-group-item list-group-item-action text-muted">Change password</Link>
                {/* <Link to="/admin-logout" className="list-group-item list-group-item-action text-danger">Logout</Link> */}
            </div>
        </div>
    );
}

export default AdminSidebar;