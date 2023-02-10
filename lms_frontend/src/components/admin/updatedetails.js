import {Link} from 'react-router-dom'
import Sidebar from './sidebar';
import {updateAdmin} from "../../services/adminService";
import {Form, Button, row, col} from 'react-bootstrap';
import {getAdmin} from "../../services/adminService";
import {useEffect, useState} from 'react';


function AdminUpdateDetails() {
    const adminid = localStorage.getItem('adminid')
    const [gender, setGender] = useState("")

    const handleChange = (event) => {
        setGender(event.target.value);
      };

    const [admin, setAdmin] = useState([]);    
    let flag = false;

    useEffect(() => {
        let mounted = true;
        if(admin.length) {
            return;
        }
        getAdmin()
            .then(data => {
            if(mounted) {
                setAdmin(data)
            }
            })
        return () => {
            mounted = false;
        }; 
    }, []);

    if(admin.gender == 'Female') {
        flag = true;
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        updateAdmin(adminid, e.target)
        .then((result) => {
            alert(result);
        },
        (error)=>{
         alert("Failed to update admin!");
        }); 
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className='card'>
                        <div className='card-header'>Update details</div>
                        <div className='card-body'>
                        <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" required 
                            defaultValue={admin.username}
                            placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="firstname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="firstname" required
                            defaultValue={admin.firstname}
                            placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="lastname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="lastName" required
                                defaultValue={admin.lastname}
                                placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <span>&nbsp; &nbsp;</span>
                                {
                                    !flag && 
                                    <select value={gender} name="gender" onChange={handleChange}required>
                                    <option value="male">Male</option>
                                    <option value="female" >Female</option>
                                    </select>
                                }
                                {
                                    flag && 
                                    <select value={gender} name="gender" onChange={handleChange}required>
                                    <option value="female">Female</option>
                                    <option value="male" >Male</option>
                                    </select>
                                }
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="dob">
                                <Form.Label>DOB</Form.Label>
                                <Form.Control type="text" name="dob" required
                                defaultValue={admin.dob}
                                placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name="email" required
                                defaultValue={admin.email}
                                placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" name="phone" required
                                defaultValue={admin.phone}
                                placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="aadhar">
                                <Form.Label>Aadhar</Form.Label>
                                <Form.Control type="text" name="aadhar" required
                                defaultValue={admin.aadhar}
                                placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group>
                            <p></p>
                            <Button variant="primary" type="submit">
                                Update
                            </Button>
                        </Form.Group>
                        </Form>
                        </div>
                    </div>    
                </section>
            </div>
        </div>    
    );
}

export default AdminUpdateDetails;