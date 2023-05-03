import './Home.css';

export default function Home(){

    return(
        <section className="home">
            <article className="img-wrap">
                {/* <img src="./" alt="img"/> */}
            </article >
            <article className="description">
                <p>Buy or sell you bike here. Choose from the list. Buy or sell you bike here. Choose from the list. Buy or sell you bike here. Choose from the list. Buy or sell you bike here. Choose from the list.
                </p>
            </article>
            <article className="how">
                <div className="how__box buy">
                    <h3 class="how__box__title">FIND BIKE</h3>
                    <div class = "line"></div>
                    <ul>
                        <li>Register online. It’s free. Simply enter your name, email and password.</li>
                        <li>Brouse from the bike list. You can use the filter.</li>
                        <li>You can send a message to any bike seller you have selected.</li>
                    </ul>
                </div>

                <div className="how__box sell">
                    <h3 class="how__box__title">SELL BIKE</h3>
                    <div class = "line"></div>
                    <ul>
                        <li>Register online. It’s free. Simply enter your name, email and password.</li>
                        <li>Fill in your bike's details as ...</li>
                        <li>Buyer who have chosen you will send you a message. In the menu Inbox, you can read your messages.</li>
                    </ul>
                </div>  
            </article>
        </section>
       
    );
}