import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as bikeService from '../../../services/bikeService.js';
import BikeCard from './BikeCard/BikeCard.js';
import Filter from './Filters/Filter.js';
import './List.css';

export default function List() {
    const [bikes, setBikes] = useState([]);
    const[filters, setFilters] = useState({category:'', condition:''});
    const [resultsFound, setResultsFound] = useState(0);
    const navigate = useNavigate();
   
    useEffect(() => {
        bikeService.getAll(filters)
            .then(result => {
                setBikes(result);
                setResultsFound(result.length);
            }).catch(err => {
                console.log('>> err in list', err.message);
                navigate('/*');
            })
    }, [filters]);


    function onFilteredBikes(filteredOptions){
        setFilters(filteredOptions)
    }
   
   return (
        <section className="common__section">
            <div>
                <Filter onFilteredBikes={onFilteredBikes} resultsFound={resultsFound}></Filter>
                <div>
                { 
                bikes.length > 0

                ? (
                    <ul className="bikes" >
                        {bikes.map(b => <BikeCard key={b._id} bike={b} />)}
                    </ul>
                )
                : 
                <h2 className="no-bikes">No bikes found</h2>
            }
                </div>
            </div>
           
        </section>
    );
}

