import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext.js';
import { NotificationContext, types } from '../../../context/NotificationContext.js';
import * as bikeService from '../../../services/bikeService.js';

export default function Create(){
    const navigate = useNavigate();
    let { user } = useContext(AuthContext);
    const { addNotification } = useContext(NotificationContext); 
       
    const createBike = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let title = formData.get('title');
        let year = formData.get('year');
        let price = formData.get('price');  // number
        price = Number(price);
        let category = formData.get('category');
        let condition = formData.get('condition');
        let frameSize = formData.get('frame-size');
        let wheelSize = formData.get('wheel-size');
        let material = formData.get('material');
        let frontTravel = formData.get('front-travel');
        let rearTravel = formData.get('rear-travel');
        let location = formData.get('location');
        let postDate = new Date();
        let description = formData.get('description');
        let image = formData.get('image');

        let errors = [];

        if ( title === '') {
            errors.push('Title is required!');
        } 

        if ( condition === '') {
            errors.push('Condition is required!');
        }

        if ( price === '') {
            errors.push('Price is required!');
        }

        if ( !(price > 0) ) {
            errors.push('Price should be a positive number!');
        }

        if ( /^https?:\/\//.test(image) == false ) {
            errors.push('Image must be a valid URL');
        }

        if ( errors.length > 0) {
            let message = errors.join(' ');
            addNotification(message, types.error);
        } else {
            const bikeData = {
                title, year, price, category, condition, frameSize, wheelSize, material, frontTravel, rearTravel, location, postDate, description, image
            }
    
            bikeService.create(bikeData, user.accessToken)
                .then(result => {
                    console.log(result)
                    navigate(`/list/${result._id}`);
                })
                .catch(err => {
                    console.log(err);
                    navigate(`*`);
                })  
        }
    }

    return(
        <section>
            <h2>Sell Your Bike</h2>
            <form onSubmit={createBike} method='POST' >

                <label htmlFor="title">Title required:</label>
                <input type="text" name="title" />

                <label htmlFor="year">Year:</label>
                <input type="text" name="year" />

                <label htmlFor="price">Price in lv. required:</label>
                <input type="text" name="price" />

                <label htmlFor="category">Category:</label>
                <select  name="category">
                    <option value="dh">DH Bikes</option>
                    <option value="xc">XC Bikes</option>
                    <option value="dirt-jump">Dirt Jumb Bikes</option>
                    <option value="kids">Kids Bikes</option>
                    <option value="vintage">Vintage Bikes</option>
                    <option value="other">Other</option>
                </select>
                       
                <label htmlFor="condition">Condition required:</label>
                <input type="text" name="condition" />

                <label htmlFor="frame-size">Frame Size:</label>
                <input type="text" name="frame-size" />

                <label htmlFor="wheel-size">Wheel Size:</label>
                <input type="text" name="wheel-size" />

                <label htmlFor="material">Material:</label>
                <input type="text" name="material" />

                <label htmlFor="front-travel">Front Travel:</label>
                <input type="text" name="front-travel"/>

                <label htmlFor="rear-travel">Rear Travel:</label>
                <input type="text" name="rear-travel" />

                <label htmlFor="location">Location:</label>
                <input type="text" name="location"  />

                <label htmlFor="description">Description:</label>
                <textarea name="description" rows="5" cols="50"></textarea>

                <label htmlFor="image">Image:</label>
                <input type="text" name="image" placeholder="https://" />

                <input type="submit"  value="Save" />

            </form>   
        </section>
    );
}