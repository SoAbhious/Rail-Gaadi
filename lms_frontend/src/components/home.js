import homeCSS from './home.module.css'
import {useEffect} from 'react';
import {Link} from 'react-router-dom'


function Home() {
    const userLoginStatus =  localStorage.getItem('userLoginStatus')
    useEffect(()=>{
        document.title='Rail Gaadi | Homepage';
    });
    return (
    <div className="container mt-4" >
    <html className={homeCSS.html}> 
        <head>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet"/>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
            <meta charset="UTF-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Document</title>
        </head>
        <body className={homeCSS.hbody}>
            <div className={homeCSS.content}>
                <div className={homeCSS.ctext}>Search Train</div>
                <form action="">
                    <div className={homeCSS.cfield}>  
                        <input className={homeCSS.finput} type ={homeCSS.ctext} placeholder="From" required/>
                    </div>

                    <div className={homeCSS.cfield}>
                        <input className={homeCSS.finput} type ={homeCSS.ctext} placeholder="To" required/>
                    </div>
                    <br/>
                    <div className={homeCSS.cfield}>
                        <input className={homeCSS.finput} type ='Date' placeholder="Date (DD/MM/YYYY)" required/>
                    </div>
                    <button className={homeCSS.buttn}>Search</button>
                    
                    {userLoginStatus !='true' && 
                    <>
                    <div className={homeCSS.cor}>or</div>
                    <div>
                    <Link to='/user-login' style={{ textDecoration: 'none' }} type='button' className={homeCSS.login}>Login</Link> 
                    <Link to='/user-register' style={{ textDecoration: 'none' }} type='button' className={homeCSS.register}>Register</Link>
                    </div>
                    </>
                    }   
                </form>
            </div>
        </body>
    </html> 
    </div>
    );
}

export default Home;
