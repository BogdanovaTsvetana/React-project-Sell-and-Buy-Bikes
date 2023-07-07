import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as bikeService from '../../../services/bikeService.js';
import BikeCard from '../List/BikeCard/BikeCard.js';
import { useAuthContext } from '../../../context/AuthContext.js';

const MyAds = () => {
    const { user } = useAuthContext();
    const [bikes, setBikes] = useState([]);
    const navigate = useNavigate();
   
    useEffect(() => {
        bikeService.getMyAds(user._id, user.accessToken)
            .then(result => {
                setBikes(result);
            }).catch(err => {
                console.log(err.message);
                navigate('/*');
            })
    }, []);
 
   return (
        <section className="common__section">
            <div>
                <div>
                { 
                bikes.length > 0

                ? (
                    <ul className="bikes" >
                        {bikes.map(b => <BikeCard key={b._id} bike={b} />)}
                    </ul>
                )
                : 
                <h2 className="no-bikes">You have no bikes to sell</h2>
            }
                </div>
            </div>
           
        </section>
    );
}

export default MyAds;