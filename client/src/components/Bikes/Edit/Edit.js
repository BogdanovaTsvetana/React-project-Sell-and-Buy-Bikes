import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../../context/AuthContext.js";
import * as bikeService from "../../../services/bikeService.js"

import './Edit.css';

const Edit = () => {
    const [bike, setBike] = useState({});
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { bikeId } = useParams();
  
    useEffect(() => {
        bikeService.getOneById(bikeId)
            .then(result => {
                setBike(result);
            });   
    }, [bikeId]);

    function editHandler(e){
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
        let description = formData.get('description');
        let image = formData.get('image');

        let errors = [];

        if ( title == '') {
            errors.push('Title is required!');
        } 

        if ( condition == '') {
            errors.push('Condition is required!');
        }

        if ( price == '') {
            errors.push('Price is required!');
        }

        if ( !(price > 0) ) {
            errors.push('Price should be a positive number!');
        }

        if ( errors.length > 0) {
            let message = errors.join(' ');
            //console.log(message)
        } else {
            const updatedBikeData = {
                title, year, price, category, condition, frameSize, wheelSize, material, frontTravel, rearTravel, location, description, image
            }
    
            bikeService.edit(bikeId, updatedBikeData, user.accessToken)
                .then(result => {
                    navigate(`/list/${result._id}`)
                })
                .catch(err => {
                    console.log('>> notif>>', err.message) 
                })  
        }
    }

    return (   
        <section> 
          <h2>Edit Your Ad</h2>
            <form onSubmit={editHandler} method='POST' >

                <label htmlFor="title">Title:</label>
                <input type="text" name="title" defaultValue={bike.title} />

                <label htmlFor="year">Year:</label>
                <input type="text" name="year" defaultValue={bike.year} />

                <label htmlFor="price">Price in lv.:</label>
                <input type="text" name="price" defaultValue={bike.price} />

                <label htmlFor="category">Category:</label>
                <select  name="category" value={bike.category} onChange={(e) => setBike(s => ({...s, category: e.target.value}))}>
                    <option value="DH Bikes">DH Bikes</option>
                    <option value="XC Bikes">XC Bikes</option>
                    <option value="Dirt Jump Bikes">Dirt Jumb Bikes</option>
                    <option value="Kids Bikes">Kids Bikes</option>
                    <option value="Vintage Bikes">Vintage Bikes</option>
                    <option value="Other">Other Bikes</option>
                </select>
               
                <label htmlFor="condition">Condition:</label>
                <input type="text" name="condition" defaultValue={bike.condition} />

                <label htmlFor="frame-size">Frame Size:</label>
                <input type="text" name="frame-size" defaultValue={bike.frameSize} />

                <label htmlFor="wheel-size">Wheel Size:</label>
                <input type="text" name="wheel-size" defaultValue={bike.wheelSize} />

                <label htmlFor="material">Material:</label>
                <input type="text" name="material" defaultValue={bike.material} />

                <label htmlFor="front-travel">Front Travel:</label>
                <input type="text" name="front-travel" defaultValue={bike.frontTravel} />

                <label htmlFor="rear-travel">Rear Travel:</label>
                <input type="text" name="rear-travel" defaultValue={bike.rearTravel}/>

                <label htmlFor="location">Location:</label>
                <input type="text" name="location" defaultValue={bike.location} />

                <label htmlFor="description">Description:</label>
                <textarea name="description" rows="10" cols="50" defaultValue={bike.description}></textarea>

                <label htmlFor="image">Image:</label>
                <input type="text" name="image" placeholder="https://" defaultValue={bike.image}/>

                <input type="submit"  value="Save" />

            </form>   
        </section>
    )
}

export default Edit;
