import { useEffect, useState } from 'react';

import * as bikeService from '../../../services/bikeService.js';
import BikeCard from './BikeCard/BikeCard.js';

import './List.css';

export default function List() {
    const [bikes, setBikes] = useState([]);
   
    useEffect(() => {
            bikeService.getAll()
                .then(result => {
                    setBikes(result)
                    console.log(bikes)
                }).catch(err => {
                    console.log('>> err in list', err.message)
                })
    }, []);
   
   return (
        <section class="common__section">
            <h2 class="common__title">BIKES LIST</h2>
            { 
                bikes.length > 0

                ? (
                    <ul className="bikes" >
                        {bikes.map(b => <BikeCard key={b._id} bike={b} />)}
                    </ul>
                )
                : <h2 className="no-bikes">No bikes found</h2>
            }
        </section>
    );
}