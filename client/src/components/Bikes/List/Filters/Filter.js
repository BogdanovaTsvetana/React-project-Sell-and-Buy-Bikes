import { useState } from 'react';
import './Filters.css';

const Filter = ({onFilteredBikes, resultsFound}) => {
    
    let [category, updateCategory] = useState('');
    let [condition, updateCondition] = useState('');
  
    function searchHandler(){ 
        onFilteredBikes({category, condition});
    }
    
    function clearFilterHandler(){
        updateCategory('');
        updateCondition('');
    }

    return(
        <div className='filters'>
            <div>
                <label htmlFor="category">Category:</label>
                <select  
                    name="category" 
                    value={category}
                    onChange={e => updateCategory(e.target.value)} >       
                        <option value="">All</option>    
                        <option value="Mountain Bikes">Mountain Bikes</option>
                        <option value="Road Bikes">Road Bikes</option>
                        <option value="Gravel Bikes">Gravel Bikes</option>
                        <option value="Vintage Bikes">Vintage Bikes</option>
                        <option value="Kids Bikes">Kids Bikes</option>
                    </select>
            </div>
                
            <div>
                <label htmlFor="condition">Condition:</label>
                <select  
                    name="condition" 
                    value={condition}
                    onChange={e => updateCondition(e.target.value)} >    
                        <option value="">All</option>
                        <option value="New">New</option>
                        <option value="Used like new">Used like new</option>
                        <option value="Used good">Used good</option>
                        <option value="Poor">Poor</option>
                    </select>
            </div>

            <button onClick={clearFilterHandler} className="button search">Clear filter</button>
            <button onClick={searchHandler} className="button search">Search</button>
            <p className="results-found">{resultsFound} bikes found </p>
        </div>
    )
}

export default Filter;