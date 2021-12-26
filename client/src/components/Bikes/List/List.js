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
                }).catch(err => {
                    console.log('>> err in list', err.message)
                })
    }, []);
   
   return (
        <section>
            <h2>List All Bikes</h2>
            { 
                bikes.length > 0
                ? bikes.map(b => <BikeCard key={b._id} bike={b} />)
                : <h2>No bikes found</h2>
            }
        </section>
    );
}