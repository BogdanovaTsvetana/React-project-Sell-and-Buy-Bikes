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
        
        <section>
          
           <h2>{bike.year} {bike.title}</h2>
           <div className="details-img">
                <img src={bike.image} alt="Bike photo" />
                <div className="details-buttons">
                    { isUser && ( isOwner 
                    ? 
                    <>
                    <Link to={`/list/edit/${bike._id}`} > [ Edit ] </Link>
                    <Link to="" onClick={onDeleteClick}> [ Delete ] </Link>
                    </>
                    :
                    <>
                    <Link to={`/conversations/${user.username}/send-message/${bike.owner?.username}/${bike.title}`} >[ Send message ]</Link>
                   
                    </>
                    )}
                    { !isUser
                    ?
                    <Link to="/register" >[ Register to send message ]</Link>   
                    :
                    <></>
                    }
                </div>
           </div>
          
           <div className="details">
           <p>Price in lv.: <span>{bike.price}</span></p>
            <p>Category: <span>{bike.category}</span></p>
            <p>Condition: {bike.condition}</p>
            <p>Frame Size: {bike.frameSize}</p>
            <p>Wheel Size: {bike.wheelSize}</p>
            <p>Material: {bike.material}</p>
            <p>Front Travel: {bike.frontTravel}</p>
            <p>Rear Travel: {bike.rearTravel}</p>
            <p>Location: {bike.location}</p>
            <p>Post Date: {postDate}</p>         
            <p>Description: {bike.description}</p>
            <p>Seller: {bike.owner?.username}</p>
            </div>
        </section>
    )
}

export default BikeDetails

// className="bike-page"
// <Link to="" >Delete</Link>
// <Link to="" >Sold</Link>
//<Link to={`/conversations/{username}/send-message/{bike.owner.username}/{bike.title}`} >[ Send message ]</Link>
