import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const ProtectedUser = (props) => {
    const { Component } = props;
    const loginStatus = localStorage.getItem('userLoginStatus')
    const navigate = useNavigate();

    useEffect(() => {
        if (!loginStatus) {
            Swal.fire({
                title: 'User not logged in!!',
                text: "Please login to access this page.",
                icon: 'error',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK'
            }).then((result) => {
                navigate('/user-login');
            })
        }
    }, [])

    return (
        <div>
            {loginStatus == 'true' &&
                <Component />
            }
        </div>
    )
}

export default ProtectedUser;