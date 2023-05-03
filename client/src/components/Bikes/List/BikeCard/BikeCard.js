import { Link } from 'react-router-dom';
import './BikeCard.css';

export default function Bike({
    bike,  
}){
    
    let seller = bike.owner;
    return (

        <div className="card">
            <div className="card__img-wrapper">
                <img src={bike.image} alt="Item photo" />
            </div>
                <div className="content">
                    <h3 className="card__title">{bike.year} {bike.title}</h3>
                    <p className="card-info">Category: {bike.category}</p>
                    <p className="card-info">Condition: {bike.condition}</p>
                    <p className="card-info">Frame Size: {bike.frameSize}</p>
                    <p className="card-info">Wheel Size: {bike.wheelSize}</p>
                    <p className="card-info">Material: {bike.material}</p>
                    <p className="card-info">Location: {bike.location}</p>
                    <p className="card-info">Seller: {seller.username}</p>
                    <p className="card-info">Price: {bike.price}</p>

                    <Link to={`/list/${bike._id}`} className="button">Read More</Link>    
                  
            </div>
        </div>
    );
}
