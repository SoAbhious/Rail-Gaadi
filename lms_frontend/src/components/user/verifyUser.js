import { useEffect, useState } from 'react';
import loginCSS from '../home.module.css';
import axios from 'axios';
import {useParams} from 'react-router-dom';
const baseurl='http://127.0.0.1:8000/base/';

function VerifyUser() {

    const {id} = useParams();
    const [errorMsg, setErrorMsg] = useState("");
    const [userData, setuserData] = useState({
        otp_digit : ''
    });

    const handleChange = (event) => {
        setuserData({
            ...userData, [event.target.name]: event.target.value
        });
    }

    const submitForm = () => {
        const userFormData = new FormData();
        userFormData.append('otp_digit', userData.otp_digit)

        try {
            axios.post(baseurl + 'verify-user/' + id, userFormData) 
            .then((res)=>{
                if(res.data.bool == true) {
                    localStorage.setItem('userLoginStatus', true)
                    localStorage.setItem('userid', res.data.id)
                    window.location.assign("http://localhost:3000/user-dashboard")
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
        document.title = 'verify user';
    });

    return (
        <div className={loginCSS.logtainer}>
            <section className={loginCSS.logdiv}>
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
                        <header>Enter 6 digit OTP</header>
                        <div>
                            <div className="form-outline mb-4">
                                <input name='otp_digit' type="text" id="otp_digit" className="form-control form-control-lg"
                                value={userData.otp_digit} onChange={handleChange}
                                placeholder="OTP" required/>
                            </div>


                            <div className="text-center d-flex justify-content-center text-lg-start mt-4 pt-2">
                                <button type="submit" onClick={submitForm} className={loginCSS.logg}>VERIFY</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </div>    
    );
}

export default VerifyUser;