import aboutCSS from './home.module.css'

function About() {
    return (
    <div className={aboutCSS.about}>
        <div className={aboutCSS.aboutxt}>
            <h1>About us</h1>
            <p>This is a simple railway management system which provides basic functionalities of ticket booking, 
                adding passengers, cheking train availability etc.
            </p>
        </div>
    </div>    
    );
}

export default About;