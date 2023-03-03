import aboutCSS from './home.module.css'

function About() {
    return (
    <div className={aboutCSS.about}>
        <div className={aboutCSS.aboutxt} style={{boxShadow: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px'}}>
            <h1>About us</h1>
            <p>This is a simple railway management system which provides basic functionalities of ticket booking, 
                adding passengers, cheking train availability etc.
            </p>
        </div>
    </div>    
    );
}

export default About;