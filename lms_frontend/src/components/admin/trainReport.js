import { Link } from 'react-router-dom'
import Sidebar from './sidebar';
import { useEffect, useState } from 'react';
import { getBooking, getPassenger, getTicket } from '../../services/userService';
import { ButtonToolbar } from 'react-bootstrap';
import AdminTicket from './ticket';
import axios from 'axios';

const TrainReport = () => {

    const [train, setTrain] = useState([]);
    const [isUpdated, setIsupdated] = useState(false);


    useEffect(() => {
        let mounted = true;
        if (train.length && !isUpdated) {
            return;
        }
        axios.get('http://127.0.0.1:8000/base/train-report/')
            .then(response => response.data)
            .then(data1 => {
                axios.get('http://127.0.0.1:8000/base/train/')
                    .then(response => response.data)
                    .then(data => {
                        for(let i = 0; i < data1.length; i++) {
                            let obj = data.find(o => o.id == data1[i].train.id);
                            let count = obj.sl - data1[i].sl + obj.ac1 - data1[i].ac1 + obj.ac2 - data1[i].ac2 + obj.ac3 - data1[i].ac3
                            data1[i].passengers = count
                        }
                        if (mounted) {
                            setTrain(data1)
                        }
                    })   
            })
            .catch((error) => {
                console.log(error.response)
            })
        return () => {
            mounted = false;
            setIsupdated(false);
        };
    }, [isUpdated]);


    return (
        <div className="container mt-4">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className='card' style={{boxShadow: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px'}}>
                        <h5 className='card-header'>Train Report</h5>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Train</th>
                                        <th>Status</th>
                                        <th>Route</th>
                                        <th>Passengers</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {train.map((train) =>
                                        <tr key={train.id} >
                                            <td>{train.train.name} ({train.train.id})</td>
                                            <td>{train.status}</td>
                                            <td>{train.route.name}</td>
                                            <td>{train.passengers}</td>
                                            <td>{train.date}</td>
                                            <td>{train.time.substr(0,5)}</td>
                                            {/* <td> 
                                                <Link to={'/admin-bookings/' + book.id} className='btn btn-success btn-sm'>
                                                        <i class="fa-solid fa-circle-info"></i> 
                                                </Link>
                                                
                                            </td> */}
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

export default TrainReport;