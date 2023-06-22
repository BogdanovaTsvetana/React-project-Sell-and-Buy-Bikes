import './Home.css';

export default function Home(){

    return(
        <section className="home">
            <article className="img-wrap">
            </article >
            <article className="description">
                <p>You can sell your unwanted bike here for free. You can buy a bike depending on your preferences.
                </p>
            </article>
            <article className="how">
                <div className="how__box buy">
                    <h3 className="how__box__title">FIND BIKE</h3>
                    <div className="line"></div>
                    <ul>
                        <li>Register online. It’s free. Simply enter your details.</li>
                        <li>Brouse from the bike list.</li>
                        <li>You can send a message to any bike seller you have selected.</li>
                    </ul>
                </div>

                <div className="how__box sell">
                    <h3 className="how__box__title">SELL BIKE</h3>
                    <div className="line"></div>
                    <ul>
                        <li>Register online. It’s free. Simply enter your details.</li>
                        <li>Fill in your bike's details.</li>
                        <li>Buyer who have chosen you will send you a message. In the Inbox menu, you can read your messages.</li>
                    </ul>
                </div>  
            </article>
        </section>
       
    );
}