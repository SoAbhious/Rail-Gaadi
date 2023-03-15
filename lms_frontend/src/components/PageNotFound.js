import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const PageNotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        Swal.fire({
            title: 'Error 404!!',
            text: "Page not found.",
            icon: 'error',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        }).then((result) => {
            navigate('/');
        })
    }, [])

    return (
        <div>
        </div>
    )
}

export default PageNotFound;