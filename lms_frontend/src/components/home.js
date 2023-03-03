import homeCSS from './home.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';


function Home() {

    const [station1, setStation1] = useState([]);
    const [station2, setStation2] = useState([]);
    const [formErrors, setFormErrors] = useState({})
    const userLoginStatus = localStorage.getItem('userLoginStatus');
    const [formData, setFormData] = useState({
        source: "",
        destination: "",
        date: "",
        sourceName: "",
        destName: ""
    });

    useEffect(() => {
        
        document.title = 'Rail Gaadi | Homepage';
        fetch('http://127.0.0.1:8000/base/station/')
            .then(response => response.json())
            .then(data => {
                setStation1(data);
                setStation2(data);
            })   
    }, []);

    const handleChange = (e) => {

        if (e.target.name != 'date') {
            let obj = station1.find(object => object.name == e.target.value)
            let text = obj["id"].toString()
            if (e.target.name == 'source') {
                setFormData({ ...formData, [e.target.name]: text, sourceName: e.target.value });
            } else {
                setFormData({ ...formData, [e.target.name]: text, destName: e.target.value });
                station2.splice(obj["id"] - 1, 1);
            }
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = () => {

    }
    return (
        <div className="container mt-4">
            <html className={homeCSS.html}>
                <head>
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet" />
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Document</title>
                </head>
                <body className={homeCSS.hbody}>
                    <div className={homeCSS.content}>
                        <div className={homeCSS.ctext}>Search Train</div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className={homeCSS.cfield} controlId='source'>
                                <div className={homeCSS.iconDiv}>
                                    <span className={homeCSS.searchIcon}>
                                        <i className="fa-solid fa-lg fa-paper-plane pt-0" style={{ float: 'left', color: 'dodgerblue' }}>
                                        </i></span>
                                    <input list='station1'
                                        onChange={handleChange}
                                        name='source'
                                        className={homeCSS.finput}
                                        placeholder="From" required />
                                </div>
                                <datalist id='station1'>
                                    {station1.map((st) =>
                                        <option key={st.id} value={st.name}>{st.name}</option>)}
                                </datalist>

                            </Form.Group>

                            <Form.Group className={homeCSS.cfield} controlId='destination'>
                                <div className={homeCSS.iconDiv}>
                                    <span className={homeCSS.searchIcon}>
                                        <i class="fa-solid fa-lg fa-location-dot" style={{ float: 'left', color: 'dodgerblue' }}>
                                        </i></span>
                                    <input list='station2'
                                        name='destination'
                                        onChange={handleChange}
                                        className={homeCSS.finput}
                                        placeholder="To" required />
                                </div>
                                <datalist id='station2'>
                                    {station2.map((st) =>
                                        <option key={st.id} value={st.name}>{st.name}</option>)}
                                </datalist>
                            </Form.Group>
                            <br />
                            <Form.Group className={homeCSS.cfield} controlId='date'>
                                <input className={homeCSS.finput}
                                    placeholder="Date (DD/MM/YYYY)"
                                    type='date'
                                    name='date'
                                    onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group>
                                {(!formData.source || !formData.destination || !formData.date) &&
                                    <Button onSubmit={handleSubmit} type='submit' className={homeCSS.buttn}>
                                        Search
                                    </Button>
                                }
                                {(formData.source && formData.destination && formData.date) &&
                                    <Link to='/bookTrain' state={{ data: formData }}>
                                        <Button type='submit' className={homeCSS.buttn}>
                                            Search
                                        </Button>
                                    </Link>
                                }

                            </Form.Group>

                            {userLoginStatus != 'true' &&
                                <>
                                    <div className={homeCSS.cor}>or</div>
                                    <div>
                                        <Link to='/user-login' style={{ textDecoration: 'none' }} type='button' className={homeCSS.login}>Login</Link>
                                        <Link to='/user-register' style={{ textDecoration: 'none' }} type='button' className={homeCSS.register}>Register</Link>
                                    </div>
                                </>
                            }
                        </Form>
                    </div>
                </body>
            </html>
        </div>
    );

}

export default Home;


