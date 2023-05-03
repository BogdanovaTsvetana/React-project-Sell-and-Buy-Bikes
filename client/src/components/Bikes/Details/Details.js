import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../../context/AuthContext.js";
import * as bikeService from "../../../services/bikeService.js"

import './Details.css';

const BikeDetails = () => {
    const [bike, setBike] = useState({});
    const { bikeId } = useParams();
    const { user } = useAuthContext();
    const navigate = useNavigate(); 
  
    useEffect(() => {
        bikeService.getOneById(bikeId)
            .then(result => {
                console.log(result)  
                setBike(result);
            })
            .catch(err => {
                console.log('>> 55', err.message)
                navigate('*')
             });
    }, [bikeId]);

    let isUser = Boolean(user._id)
    let isOwner = Boolean( bike.owner && (user._id == bike.owner._id));
   
    let postDate = bike.postDate ? bike.postDate.slice(0, 10) : '';

    function onDeleteClick(e){
        e.preventDefault();
        
        bikeService.deleteBike(bikeId, user.accessToken)
            .then(() => {
                console.log('>> deleted')
                navigate('/list')
            })
            .catch(err => {
                console.log('>> 55', err.message)
                navigate('*')
             });
    }

    return (
        
        <section class="common__section">
        <h2 class="common__title">BIKE DETAILS</h2>
            <div class="common__box bike__box">
          
           <h3 class="bike__title">{bike.year} {bike.title}</h3>

           <article class="main-info">
           <div class="bike__img-wrapper">
                    <img src={bike.image} alt="Bike photo" />
                </div>

           <div className="content">
           <p className="common__box__item">Price in lv.: <span>{bike.price}</span></p>
            <p className="common__box__item">Category: <span>{bike.category}</span></p>
            <p className="common__box__item">Condition: {bike.condition}</p>
            <p className="common__box__item">Frame Size: {bike.frameSize}</p>
            <p className="common__box__item">Wheel Size: {bike.wheelSize}</p>
            <p className="common__box__item">Material: {bike.material}</p>
            <p className="common__box__item">Front Travel: {bike.frontTravel}</p>
            <p className="common__box__item">Rear Travel: {bike.rearTravel}</p>
            <p className="common__box__item">Location: {bike.location}</p>
            <p className="common__box__item">Post Date: {postDate}</p>         
            <p className="common__box__item">Description: {bike.description}</p>
            <p className="common__box__item">Seller: {bike.owner?.username}</p>


            {/* <div class="buttons-list">
                        <button (click)="enterEditMode()" class="button">Edit</button>
                        <button (click)="deleteNanny()" class="button delete-button">Delete my nanny profile</button>
                    </div> */}

            <div className="buttons-list">
                    { isUser && ( isOwner 
                    ? 
                    <>
                    <Link to={`/list/edit/${bike._id}`} className="button">EDIT</Link>
                    <Link to="" onClick={onDeleteClick} className="button delete-button">DELETE</Link>
                    </>
                    :
                    <>
                    <Link to={`/conversations/${user.username}/send-message/${bike.owner?.username}/${bike.title}`} className="button">SEND MESSAGE</Link>
                   
                    </>
                    )}
                    { !isUser
                    ?
                    <Link to="/register" className="button">REGISTER TO SEND MESSAGE</Link>   
                    :
                    <></>
                    }
                </div>    

            </div>

            
            </article>

           {/* <div className="details-img">
                <img src={bike.image} alt="Bike photo" />
                
           </div> */}
          
           </div>
        </section>



    );
}

export default BikeDetails

// className="bike-page"
// <Link to="" >Delete</Link>
// <Link to="" >Sold</Link>
//<Link to={`/conversations/{username}/send-message/{bike.owner.username}/{bike.title}`} >[ Send message ]</Link>
