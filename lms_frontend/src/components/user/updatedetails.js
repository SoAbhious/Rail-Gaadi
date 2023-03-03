import {Link} from 'react-router-dom'
import Sidebar from './sidebar';
import {updateUser} from "../../services/userService";
import {Form, Button, row, col} from 'react-bootstrap';
import {getUser} from "../../services/userService";
import {useEffect, useState} from 'react';
import axios from 'axios';


function UserUpdateDetails() {
    const userid = localStorage.getItem('userid')
    const [gender, setGender] = useState("")

    const handleChange = (event) => {
        setGender(event.target.value);
      };

    const [user, setUser] = useState([]);

    let flag = false;

    useEffect(() => {
        let mounted = true;
        if(user.length) {
            return;
        }
        axios.get(`http://127.0.0.1:8000/base/user/${userid}/`)
            .then(response => {
                if(mounted) {
                    setUser(response.data)
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
        return () => {
            mounted = false;
        }; 
    }, []);

    if(user.gender == 'Female') {
        flag = true;
    } 


    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(userid, e.target)
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
                    <div className='card mb-4' style={{boxShadow: 'rgba(0, 0, 0, 0.2) 0px 60px 40px -7px'}}>
                        <div className='card-header'>Update details</div>
                        <div className='card-body'>
                        <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" required 
                            defaultValue={user.username}
                            placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="firstname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="firstname" required
                            defaultValue={user.firstname}
                            placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="lastname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="lastName" required
                                defaultValue={user.lastname}
                                placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="gender">
                                <Form.Label>Gender </Form.Label>
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
                                defaultValue={user.dob}
                                placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name="email" required
                                defaultValue={user.email}
                                placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" name="phone" required
                                defaultValue={user.phone}
                                placeholder="" />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="aadhar">
                                <Form.Label>Aadhar</Form.Label>
                                <Form.Control type="text" name="aadhar" required
                                defaultValue={user.aadhar}
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

export default UserUpdateDetails;