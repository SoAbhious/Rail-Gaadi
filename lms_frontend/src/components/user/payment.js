import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { updateTrainSeats } from '../../services/trainService';

const Payment = () => {
    const location = useLocation();
    let data = location.state

    const navigate = useNavigate();

    const handleSubmit = () => {
        let seats = data['seats']
        console.log(seats)
        updateTrainSeats(data.id, data['class'], seats)
            .then((result) => {
                alert("Booking successful!!");
            },
            (error)=>{
                alert("Booking failed!");
            }); 
        navigate('/printTicket', { state: { bookingId: data['bookingId'] } })
    }

    return (
        <div className='container card mt-4 ms-4 me-4'>
            {data['mode'] == 'card' &&
                <>
                    <div>
                        <img className='card-image me-2 mt-2' src={require('./images/master.png')} style={{ height: '80px' }} />
                        <img className='card-image me-2 mt-2' src={require('./images/rupay.jpeg')} style={{ height: '80px' }} />
                        <img className='card-image me-2 mt-2' src={require('./images/visa.png')} style={{ height: '80px' }} />
                        <img className='card-image me-2 mt-2' src={require('./images/tap.png')} style={{ height: '80px' }} />
                    </div>
                    <Form onSubmit={handleSubmit} className='mt-4 mb-2'>
                        <Form.Group controlId="number">
                            <Form.Control type="text" name="number" required
                                placeholder="Credit/Debit card number" />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="Customer Name">
                            <Form.Control type="text" name="Customer Name" required
                                placeholder="Name of the card holder" />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="cvv">
                            <Form.Control type="text" name="cvv" required
                                placeholder="CVV" />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="exDate">
                            <Form.Control type="text" name="exDate" required
                                placeholder="Valid through (MM/YY)" />
                        </Form.Group>
                        <br />
                        <div className='h4 pt-2 ps-2 pb-2 pe-2 w-25'
                            style={{ backgroundColor: 'white', boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px' }}>Total Fare : {data["fare"]}</div>
                        <br />
                        <Form.Group>
                            <p></p>
                            <Button onSubmit={handleSubmit} variant="btn btn-primary" type="submit">
                                PAY
                            </Button>
                        </Form.Group>
                    </Form>
                </>
            }
            {data['mode'] == 'upi' &&
                <>
                    <div>
                        <img className='card-image me-2 mt-2' src={require('./images/upi.png')} style={{ height: '80px' }} />
                    </div>
                    <Form onSubmit={handleSubmit} className='mt-4 mb-2'>
                        <Form.Group controlId="upiId">
                            <Form.Control type="text" name="upiId" required
                                placeholder="UPI ID" />
                        </Form.Group>
                        <br />
                        <div className='h5 pt-2 ps-2 pb-2 pe-2 w-25 fw-bold'
                            style={{ backgroundColor: 'white', boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px' }}>Total Fare : {data["fare"]}</div>
                        <br />
                        <Form.Group>
                            <p></p>
                            <Button onSubmit={handleSubmit} variant="primary" type="submit">
                                PAY
                            </Button>
                        </Form.Group>
                    </Form>
                </>

            }

        </div>
    )

}

export default Payment;