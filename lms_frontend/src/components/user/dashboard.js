import {Link} from 'react-router-dom'
import Sidebar from './sidebar';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';

function Dashboard() {
    const userid = localStorage.getItem('userid')
    const [userData, setUserData] = useState([]);
    const [isUpdated, setIsupdated] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        let mounted = true;
        if (userData.length && !isUpdated) {
            return;
        }
    
        if (!userid) {
            return;
        }
        axios.get(`http://localhost:8000/base/user/${userid}/`)
            .then(res => {
                if (mounted) {
                    setUserData(res.data)
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
    }, [userid]);

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className='card'>
                        <div className='mt-4 ms-4'>
                            <div style={{display: "flex"}}> <h3 style={{flex: 0.5}}>ID: {userData.id}</h3><h3>Username: {userData.username}</h3></div>
                            <hr/>
                            <p>Name: {userData.firstname} {userData.lastname}</p>
                            <p>Date of birth: {userData.dob}</p>
                            <p>Email: {userData.email}</p>
                            <p>Phone: {userData.phone}</p>
                            <p>Aadhar No.: {userData.aadhar}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>    
    );
}

export default Dashboard;