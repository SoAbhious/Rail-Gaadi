import headerCSS from './header.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserLogin from './user/login';


function Header() {
    const loginStatus = localStorage.getItem('loginStatus')
    const userLoginStatus = localStorage.getItem('userLoginStatus')
    const adminLoginStatus = localStorage.getItem('adminLoginStatus')

    const [isLoggedIn, setIsLoggedIn] = useState('');

    useEffect(() => {
        setIsLoggedIn(userLoginStatus)
    }, [userLoginStatus])
    
    return (
        <div className={headerCSS.rody}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
                <div className="container-fluid me-1">
                    <Link className="navbar-brand" to="/"><i class="fa-solid fa-xl fa-train"></i> Rail Gaadi | Gaadi bula rahi hai</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            {loginStatus != 'true' &&
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Login
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">

                                        <>
                                            <li><Link className="dropdown-item" to="/user-login">User</Link></li>
                                            <li><Link className="dropdown-item" to="/admin-login">Admin</Link></li></>

                                    </ul>
                                </li>
                            }
                            {loginStatus != 'true' &&
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Register
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">

                                        <>
                                            <li><Link className="dropdown-item" to="/user-register">User</Link></li>
                                        </>

                                    </ul>
                                </li>
                            }
                            {loginStatus == 'true' &&
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown">
                                        <i class="fa-solid fa-user fa-lg"></i>
                                    </a>
                                    {userLoginStatus == 'true' &&
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">

                                            <>
                                                <li><Link className="dropdown-item" to="/user-dashboard">Dashboard</Link></li>
                                                <li><Link className="dropdown-item" to="/user-logout">Logout</Link></li>
                                            </>

                                        </ul>
                                    }
                                    {adminLoginStatus == 'true' &&
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">

                                            <>
                                                <li><Link className="dropdown-item" to="/admin-dashboard">Dashboard</Link></li>
                                                <li><Link className="dropdown-item" to="/admin-logout">Logout</Link></li>
                                            </>

                                        </ul>
                                    }
                                </li>
                            }
                            <Link className='nav-link' to='/about'>About us</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
