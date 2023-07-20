import './Footer.css';

export default function Footer(){
    
    return (
        <footer className="footer">
            <div className="footer-nav">
                <article className="footer__col">
                    <h3 className="footer__col__title">INFORMATION</h3>
                    <ul className="footer__col__list">
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </article>

                <article className="footer__col">
                    <h3 className="footer__col__title">CONTACT</h3>
                    <ul className="footer__col__list">
                        <li><a href="#">02 999 999 999</a></li>
                        <li><a href="#">info@bsbikes.com</a></li>
                        <li><a href="#">Sofia, Bulgaria</a></li>
                    </ul>
                </article>


                <article className="footer__col">
                    <h3 className="footer__col__title">FOLLOW US</h3>
                    <ul className="footer__col__list social-media">
                        <li><i className="fa-brands fa-facebook"></i></li>
                        <li><i className="fa-brands fa-twitter"></i></li>
                    </ul>
                </article>
            </div>
        </footer>    
    );
}


