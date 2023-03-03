import {Link} from 'react-router-dom'
import Sidebar from './sidebar';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';

function Dashboard() {
    const adminid = localStorage.getItem('adminid')
    const [adminData, setAdminData] = useState([]);
    const [isUpdated, setIsupdated] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        let mounted = true;
        if (adminData.length && !isUpdated) {
            return;
        }
    
        if (!adminid) {
            return;
        }
        axios.get(`http://localhost:8000/base/admin/${adminid}/`)
            .then(res => {
                if (mounted) {
                    setAdminData(res.data)
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
    }, [adminid]);

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className='card' style={{boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px'}}>
                        <div className='mt-4 ms-4'>
                            <div style={{display: "flex"}}> <h3 style={{flex: 0.5}}>ID: {adminData.id}</h3><h3>username: {adminData.username}</h3></div>
                            <hr/>
                            <p>Name: {adminData.firstname} {adminData.lastname}</p>
                            <p>Date of birth: {adminData.dob}</p>
                            <p>Email: {adminData.email}</p>
                            <p>Phone: {adminData.phone}</p>
                            <p>Aadhar No.: {adminData.aadhar}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>    
    );
}

export default Dashboard;