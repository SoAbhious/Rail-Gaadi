import headerCSS from './header.module.css'
import {Link} from 'react-router-dom'

function Header() {
    const adminLoginStatus = localStorage.getItem('adminLoginStatus')
    const userLoginStatus =  localStorage.getItem('userLoginStatus')

    return (
    <div className={headerCSS.rody}>    
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
        <div className="container-fluid me-1">
        <Link className="navbar-brand" to="/">Rail Gaadi | Gaadi bula rahi hai</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                User
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    {userLoginStatus !='true' &&
                        <>
                        <li><Link className="dropdown-item" to="/user-login">Login</Link></li>
                        <li><Link className="dropdown-item" to="/user-register">Register</Link></li></>
                    }
                    {userLoginStatus =='true' &&
                        <>
                        <li><Link className="dropdown-item" to={`/user-dashboard`}>Dashboard</Link></li>
                        <li><Link className="dropdown-item" to="/user-logout">Logout</Link></li></>
                    }
                </ul>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Admin
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    {adminLoginStatus!='true' &&
                        <> 
                        <li><Link className="dropdown-item" to="/admin-login">Login</Link></li>
                        </>
                    }
                    {adminLoginStatus=='true' &&
                        <> 
                        <li><Link className="dropdown-item" to='/admin-dashboard'>Dashboard</Link></li>
                        <li><Link className="dropdown-item" to="/admin-logout">Logout</Link></li>
                        </>
                    }
                </ul>
            </li>
            <Link className='nav-link' to='/about'>About us</Link>
            </div>
        </div>
        </div>
        </nav>
    </div>
    );
}

export default Header;
