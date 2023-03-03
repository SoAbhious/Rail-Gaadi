import { useEffect, useState } from 'react';
import loginCSS from '../home.module.css';
import axios from 'axios';
const baseurl='http://127.0.0.1:8000/base/';


function UserLogin() {

    const [errorMsg, setErrorMsg] = useState("");
    const [userLoginData, setuserLoginData] = useState({
        username : '',
        password : ''
    });

    const handleChange = (event) => {
        setuserLoginData({
            ...userLoginData, [event.target.name]: event.target.value
        });
    }

    const submitForm = () => {
        const userFormData = new FormData;
        userFormData.append('username', userLoginData.username)
        userFormData.append('password', userLoginData.password)

        try {
            axios.post(baseurl + 'user-login', userFormData) 
            .then((res)=>{
                if(res.data.bool == true) {
                    localStorage.setItem('userLoginStatus', true)
                    localStorage.setItem('userid', res.data.id)
                    window.location.href=`user-dashboard`;
                } else {
                    setErrorMsg(res.data.msg);
                }
            });
        } catch(error) {
            console.log(error);
        }
    }

    const userLoginStatus = localStorage.getItem('userLoginStatus')
    if(userLoginStatus == 'true') {
        window.location.href='user-dashboard';
    }

    useEffect(()=>{
        document.title = 'user login';
    });

    return (
        <div className={loginCSS.logtainer}>
            <section className={loginCSS.logdiv} style={{boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px'}}>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet"/>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
                <meta charset="UTF-8"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Document</title>
                <div className={loginCSS.logel}>
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="img-fluid" alt="img" />
                    </div>
                   
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                        <div>
                            <div className="form-outline mb-4">
                                <input name='username' type="text" id="username" className="form-control form-control-lg"
                                value={userLoginData.username} onChange={handleChange}
                                placeholder="Username" required/>
                            </div>

                            
                            <div className="form-outline mb-3">
                                <input name='password' type="password" id="password" className="form-control form-control-lg"
                                value={userLoginData.password} onChange={handleChange}
                                placeholder="Password" required/>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check mb-0">
                                <input className="form-check-input me-2" type="checkbox" 
                                id="form2Example3" />
                                <label className={loginCSS.checklabel} for="form2Example3">
                                    Remember me
                                </label>
                                </div>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" onClick={submitForm} className={loginCSS.logg}>LOGIN</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </div>    
    );
}

export default UserLogin;