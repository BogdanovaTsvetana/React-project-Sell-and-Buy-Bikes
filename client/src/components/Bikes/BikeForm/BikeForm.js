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
            err.location = 'Required';
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
            <form className="form edit" onSubmit={handleSubmit} method='POST' >

                <div>
                    <label htmlFor="title">
                        Title {errors.title && <span className="error-message">{errors.title}</span>}
                    </label>
                    <input 
                        type="text" 
                        name="title"
                        placeholder="Title is required"
                        defaultValue={bike.title}
                        onBlur={handleInputChange}
                        className={errors.title ? 'input-error' : ''}
                    />
                </div>
                
                <div>
                    <label htmlFor="year">Year</label>
                    <input 
                        type="text" 
                        name="year" 
                        defaultValue={bike.year}
                        onBlur={handleInputChange}
                    />
                </div>
                
                <div>
                    <label htmlFor="price">
                        Price {errors.price && <span className="error-message">{errors.price}</span>}
                    </label>
                    <input 
                        type="text" 
                        name="price"
                        placeholder="Price should be e positive number"
                        defaultValue={bike.price}
                        onBlur={handleInputChange}
                        className={errors.price ? 'input-error' : ''} 
                    />
                </div>
                
                <div>
                    <label htmlFor="category">
                        Category {errors.category && <span className="error-message">{errors.category}</span>}
                    </label>
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
                    <label htmlFor="condition">
                        Condition {errors.condition && <span className="error-message">{errors.condition}</span>}
                    </label>
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
                    <label htmlFor="frameSize">Frame Size</label>
                    <input 
                        type="text" 
                        name="frameSize" 
                        defaultValue={bike.frameSize}
                        onBlur={handleInputChange}
                    />
                </div>
               
                <div>
                    <label htmlFor="wheelSize">Wheel Size</label>
                    <input 
                        type="text" 
                        name="wheelSize" 
                        defaultValue={bike.wheelSize}
                        onBlur={handleInputChange} 
                    />
                </div>
                
                <div>
                    <label htmlFor="material">Material</label>
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
                    <label htmlFor="frontTravel">Front Travel</label>
                    <input 
                        type="text" 
                        name="frontTravel" 
                        defaultValue={bike.frontTravel} 
                        onBlur={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="rearTravel">Rear Travel</label>
                    <input 
                        type="text" 
                        name="rearTravel" 
                        defaultValue={bike.rearTravel}
                        onBlur={handleInputChange}
                    />
                </div>
                
                <div>
                    <label htmlFor="location">
                        Location {errors.location && <span className="error-message">{errors.location}</span>}
                    </label>
                    <input 
                        type="text" 
                        name="location" 
                        placeholder="Location is required"
                        defaultValue={bike.location} 
                        onBlur={handleInputChange}
                        className={errors.location ? 'input-error' : ''}
                    />
                </div>
               
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea 
                        name="description" 
                        rows="3" 
                        cols="50"
                        defaultValue={bike.description}
                        onBlur={handleInputChange}>
                    </textarea>
                </div>
                
                <div>
                    <label htmlFor="image">
                        Image {errors.image && <span className="error-message">{errors.image}</span>}
                    </label>
                    <input 
                        type="text" 
                        name="image" 
                        placeholder="Required https://" 
                        defaultValue={bike.image}
                        onBlur={handleInputChange}
                        className={errors.image ? 'input-error' : ''}
                    />
                </div>
                
                <div className="buttons-list">
                    <button 
                        type="submit" 
                        className="button">{props.editMode ? 'UPDATE' : 'CREATE'}
                    </button>
                    {props.editBike && <button 
                        type="button" 
                        className="button cancel-button"
                        onClick={() => props.handleCancel()}>CANCEL
                    </button>}
                </div>
                

            </form>   
        </section>
    );
}

export default BikeForm;
