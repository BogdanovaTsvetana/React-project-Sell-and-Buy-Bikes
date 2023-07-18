import { useState } from "react";

const BikeForm = (props) => {
    const [bike, setBike] = useState(props.bike);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setBike({ ...bike, [e.target.name]: e.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validateForm();

        if(Object.keys(validationErrors).length === 0){ 
            if(props.editMode){
                props.editBike(bike); 
            }else{
                props.createBike(bike);
            }
            
        } else{
            console.log(validationErrors)
            setErrors(validationErrors);
        }
    };

    const validateForm = () => {
        const err = {};

        if(!bike.title){
            err.title = 'Required';
        }
        if(!isPositiveNumber(bike.price)){
            err.price = 'Should be e positive number.';
        }
        if(bike.condition == ''){
            err.condition = 'Required';
        }
        if(bike.category == ''){
            err.category = 'Required';
        }
        if(bike.location == ''){
            errors.location = 'Required';
        }
        if(/^https?:\/\//.test(bike.image) == false){
            err.image = 'Should be a valid URL';
        }
        return err;
    };

    function isPositiveNumber(value) {
        value = Number(value);
        if (typeof value !== 'number' || isNaN(value)) {
          return false;
        }
        
        if (value > 0) {
          return true;
        } else {
          return false;
        }
    }
      
    return (   
        <section className="common__section">
            <h2 className="common__title">{props.editMode ? 'EDIT YOR AD' : 'SELL BIKE'}</h2>
            <form className="form edit" onSubmit={handleSubmit} method='POST' >

                <div>
                    <label htmlFor="title">Title: </label>
                    {errors.title && <div className="error-message">{errors.title}</div>}
                    <input 
                        type="text" 
                        name="title"
                        placeholder="Title is required"
                        defaultValue={bike.title}
                        onChange={handleInputChange}
                        className={errors.title ? 'input-error' : ''}
                    />
                </div>
                
                <div>
                    <label htmlFor="year">Year:</label>
                    <input 
                        type="text" 
                        name="year" 
                        defaultValue={bike.year}
                        onChange={handleInputChange}
                    />
                </div>
                
                <div>
                    <label htmlFor="price">Price:</label>
                    {errors.price && <div className="error-message">{errors.price}</div>}
                    <input 
                        type="text" 
                        name="price"
                        placeholder="Price should be e positive number"
                        defaultValue={bike.price}
                        onChange={handleInputChange}
                        className={errors.price ? 'input-error' : ''} 
                    />
                </div>
                
                <div>
                    <label htmlFor="category">Category:</label>
                    {errors.category && <div className="error-message">{errors.category}</div>}
                    <select  
                        name="category" 
                        value={bike.category} 
                        onChange={handleInputChange}
                        className={errors.category ? 'input-error' : ''}>    
                        <option value="">Set category</option>    
                        <option value="Mountain Bikes">Mountain Bikes</option>
                        <option value="Road Bikes">Road Bikes</option>
                        <option value="Gravel Bikes">Gravel Bikes</option>
                        <option value="Vintage Bikes">Vintage Bikes</option>
                        <option value="Kids Bikes">Kids Bikes</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="condition">Condition:</label>
                    {errors.condition && <div className="error-message">{errors.condition}</div>}
                    <select  
                        name="condition" 
                        value={bike.condition} 
                        onChange={handleInputChange}
                        className={errors.condition ? 'input-error' : ''}>
                        <option value="">Set condition</option>
                        <option value="New">New</option>
                        <option value="Used like new">Used like new</option>
                        <option value="Used good">Used good</option>
                        <option value="Poor">Poor</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="frameSize">Frame Size:</label>
                    <input 
                        type="text" 
                        name="frameSize" 
                        defaultValue={bike.frameSize}
                        onChange={handleInputChange}
                    />
                </div>
               
                <div>
                    <label htmlFor="wheelSize">Wheel Size:</label>
                    <input 
                        type="text" 
                        name="wheelSize" 
                        defaultValue={bike.wheelSize}
                        onChange={handleInputChange} 
                    />
                </div>
                
                <div>
                    <label htmlFor="material">Material:</label>
                    <select  
                        name="material" 
                        value={bike.material} 
                        onChange={handleInputChange}>
                        <option value="Any">Any</option>
                        <option value="Aluminium">Aluminium</option>
                        <option value="Carbon fibre">Carbon Fibre</option>
                        <option value="Chromoly">Chromoly</option>
                        <option value="Steel">Steel</option>
                        <option value="Tytanium">Tytanium</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="frontTravel">Front Travel:</label>
                    <input 
                        type="text" 
                        name="frontTravel" 
                        defaultValue={bike.frontTravel} 
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="rearTravel">Rear Travel:</label>
                    <input 
                        type="text" 
                        name="rearTravel" 
                        defaultValue={bike.rearTravel}
                        onChange={handleInputChange}
                    />
                </div>
                
                <div>
                    <label htmlFor="location">Location: </label>
                    {errors.location && <div className="error-message">{errors.location}</div>}
                    <input 
                        type="text" 
                        name="location" 
                        placeholder="Location is required"
                        defaultValue={bike.location} 
                        onChange={handleInputChange}
                        className={errors.location ? 'input-error' : ''}
                    />
                </div>
               
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea 
                        name="description" 
                        rows="3" 
                        cols="50"
                        defaultValue={bike.description}
                        onChange={handleInputChange}>
                    </textarea>
                </div>
                
                <div>
                    <label htmlFor="image">Image:</label>
                    {errors.image && <div className="error-message">{errors.image}</div>}
                    <input 
                        type="text" 
                        name="image" 
                        placeholder="Required https://" 
                        defaultValue={bike.image}
                        onChange={handleInputChange}
                        className={errors.image ? 'input-error' : ''}
                    />
                </div>
                
                <button 
                    type="submit" 
                    className="button">{props.editMode ? 'UPDATE' : 'CREATE'}
                </button>

            </form>   
        </section>
    );
}

export default BikeForm;
