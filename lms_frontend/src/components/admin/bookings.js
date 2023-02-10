import { Link } from 'react-router-dom'
import Sidebar from './sidebar';
import { useEffect, useState } from 'react';
import { getBooking, getPassenger, getTicket } from '../../services/userService';
import { ButtonToolbar } from 'react-bootstrap';
import AdminTicket from './ticket';

const AdminBooking = () => {

    const [booking, setBooking] = useState([]);
    const [isUpdated, setIsupdated] = useState(false);

    
    useEffect(() => {
        let mounted = true;
        if (booking.length && !isUpdated) {
            return;
        }
        getBooking()
            .then(data => {
                if (mounted) {
                    setBooking(data)
                }
            })
        return () => {
            mounted = false;
            setIsupdated(false);
        };
    }, [isUpdated, booking]);


    return (
        <div className="container mt-4">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className='card'>
                        <h5 className='card-header'>Bookings</h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>PNR</th>
                                        <th>User</th>
                                        <th>Train</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Passengers</th>
                                        <th>Date of departure</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {booking.map((book) =>
                                        <tr key = { book.id } >
                                            <td>{book.id}</td>
                                            <td>{book.userid.username}</td>
                                            <td>{book.train.name}</td>
                                            <td>{book.source.name}</td>
                                            <td>{book.destination.name}</td>
                                            <td>{book.ticket.length}</td>
                                            <td>{book.traveldate}</td>
                                            <td> 
                                                <Link to={'/admin-bookings/' + book.id} className='btn btn-success btn-sm'>
                                                        <i class="fa-solid fa-circle-info"></i> 
                                                </Link>
                                                
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
            </div>
        </section>
            </div >
        </div >    
    );
}

export default AdminBooking;