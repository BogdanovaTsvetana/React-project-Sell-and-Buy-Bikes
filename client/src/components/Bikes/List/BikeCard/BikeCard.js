import { Link } from 'react-router-dom';
import './BikeCard.css';

export default function Bike({
    bike,  
}){
    
    let seller = bike.owner;
    return (

        <div className="card">
            <div className="img-card">
                <img src={bike.image} alt="Item photo" />
            </div>
                <div className="info-box">
                <h3>{bike.year} {bike.title}</h3>
                <p>Category: {bike.category}</p>
                <p>Condition: {bike.condition}</p>
                <p>Frame Size: {bike.frameSize}</p>
                <p>Wheel Size: {bike.wheelSize}</p>
                <p>Material: {bike.material}</p>
                <p>Front Travel: {bike.frontTravel}</p>
                <p>Rear Travel: {bike.rearTravel}</p>
                <p>Location: {bike.location}</p>
                <p>Seller: {seller.username}</p>
                <p>Price: {bike.price}</p>

                <Link to={`/list/${bike._id}`} >[Read More]</Link>
                
            </div>
        </div>
    );
}
