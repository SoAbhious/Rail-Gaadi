import footerCSS from './home.module.css'

function Footer() {
    return (
        <footer className={footerCSS.foot}>
            <div className="text-center">
                <span>
                    Copyright &copy; <script>document.write(new Date().getFullYear())</script> Rail Gaadi
                </span>
            </div>
        </footer>
    );
}

export default Footer;