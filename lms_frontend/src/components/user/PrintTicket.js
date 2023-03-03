import { useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../home.module.css';
import { useReactToPrint } from 'react-to-print';

const PrintTicket = () => {
    const location = useLocation();
    let bookingId = location.state["bookingId"]

    const componentRef = useRef();


    const handlePrint = useReactToPrint ({
        
        content: () => componentRef.current,
        ducumentTitle: 'ticket',
        onAfterPrint: () => alert("Print successful!")
    })
    
    const [bookingData, setBookingData] = useState([]);
    const [isUpdated, setIsupdated] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        let mounted = true;
        if (bookingData.length && !isUpdated) {
            return;
        }
    
        if (!bookingId) {
            return;
        }
        axios.get(`http://localhost:8000/base/booking/${bookingId}/`)
            .then(res => {
                if (mounted) {
                    setBookingData(res.data)
                }
            })
            .catch(error => {
                if (mounted) {
                    setError(error);
                }
            });
    
        return () => {
            mounted = false;
            setIsupdated(false);
        };
    }, [bookingId]);

    if(!bookingData) return <div>Loading...</div>
    if(error) return <div>Error Occurred: {error.message}</div>

    return (
    <div className='container card mt-2'>
            <div ref={componentRef} >
                <div className="card mt-4 ms-4 me-4">
                    <div className="card-header">
                        <h3> Booking Details</h3>
                    </div>
                    
                    <div className="card-body">
                        {bookingData.id && <span className="card-title fs-5">PNR: {bookingData.id}</span>} &nbsp; &nbsp; {bookingData.userid && <span className="card-title fs-5">User ID: {bookingData.userid.id}</span>} 
                        <br/><br/>
                        {bookingData.train && <span className="card-title fs-5">Train No.: {bookingData.train.id}</span>} &nbsp; &nbsp; {bookingData.train && <span className="card-title fs-5">Train Name: {bookingData.train.name}</span>}
                        <br/><br/>
                        {bookingData.source && <h5 className="card-title">From: {bookingData.source.name}</h5>}
                        <br/>
                        {bookingData.destination && <h5 className="card-title">To: {bookingData.destination.name}</h5>}
                        <br/>
                        <h5 className="card-text">Class: {bookingData.class_field}</h5>
                        <br/>
                        <h5 className="card-text">Travel Date: {bookingData.traveldate}</h5>
                        <br/>
                        <h5 className="card-text">Fare: {bookingData.fare}</h5>
                        <br/>
                    </div>
                </div>

                <div className="card mt-4 ms-4 me-4">
                    <div className="card-header">
                        <h3>Passengers</h3>
                    </div>
                    
                    <div className="card-body">
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Mobile No.</th>
                                </tr>
                            </thead>
                            <tbody>
                            {bookingData.ticket && bookingData.ticket.map((book) =>
                                        <tr key={book.id}>
                                        <td>{book.passenger.name}</td>
                                        <td>{book.passenger.age}</td>
                                        <td>{book.passenger.mobile}</td>
                                        </tr>   
                                    )}
                            </tbody>
                        </table> 
                    </div>
                    
                </div>
            </div> 
            <div style= {{textAlign: "right"}}>
                <button onClick={handlePrint} className="btn btn-primary mt-2 mb-2 me-4">Print ticket</button>
            </div>   
        </div>
    );

}

export default PrintTicket;