import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext.js";
import * as bikeService from "../../../services/bikeService.js"
import './Details.css';
import BikeForm from "../BikeForm/BikeForm.js";
import { NotificationContext, types } from '../../../context/NotificationContext.js';

const BikeDetails = () => {
    const [bike, setBike] = useState({});
    const [editMode, setEditMode] = useState(false);
    const { addNotification } = useContext(NotificationContext); 
    const { bikeId } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate(); 
  
    useEffect(() => {
        bikeService.getOneById(bikeId)
            .then(result => { 
                setBike(result);
            })
            .catch(err => {
                console.log(err.message);
                navigate('*');
             });
    }, [bikeId]);
 
    let postDate = bike.postDate ? bike.postDate.slice(0, 10) : '';
    let memberSince = bike.owner?.memberSince ? bike.owner.memberSince.slice(0, 10) : '';

    const onEditClick = () => {
        setEditMode(true);
    }

    const editBike = (updatedBikeData) => {
        bikeService.edit(bikeId, updatedBikeData, user.accessToken)
        .then(result => {
            setBike(result);
            setEditMode(false);
            addNotification('You\'ve updated yor ad.', types.success);
        })
        .catch(err => {
            console.log(err.message);
            addNotification(err.message, types.error);
        }) 
    }


    function onDeleteClick(){
        let del = window.confirm(`Do you really want to delete ${bike.title}?`);

        if(del){
            bikeService.deleteBike(bikeId, user.accessToken)
            .then(() => {
                console.log('>> deleted');
                addNotification('You\'ve deleted you ad.', types.success);
                navigate('/list')
            })
            .catch(err => {
                console.log(err.message);
                addNotification(err.message, types.error);
             });
        }
    }

    return (
        <>
        {!editMode && <section className="common__section">
            <div className="common__box bike__box">
                <h3 className="bike__title">{bike.title}</h3>

                <article className="main-info">
                    <div className="bike__img-wrapper">
                        <img src={bike.image} alt="Bike photo" />
                    </div>

                    <div className="details_content">
                        <p className="common__box__item">Price in lv.: <span>{bike.price}</span></p>
                        <p className="common__box__item">Category: <span>{bike.category}</span></p>
                        <p className="common__box__item">Location: {bike.location}</p>
                        <p className="common__box__item">Year: <span>{bike.year}</span></p>
                        <p className="common__box__item">Condition: {bike.condition}</p>
                        <p className="common__box__item">Frame Size: {bike.frameSize}</p>
                        <p className="common__box__item">Wheel Size: {bike.wheelSize}</p>
                        <p className="common__box__item">Material: {bike.material}</p>
                        <p className="common__box__item">Front Travel: {bike.frontTravel}</p>
                        <p className="common__box__item">Rear Travel: {bike.rearTravel}</p>
                        <p className="common__box__item">Description: {bike.description}</p>
                        <p className="common__box__item">Post Date: {postDate}</p>
                        <p className="common__box__item">Seller: {bike.owner?.username}</p>
                        <p className="common__box__item">Member since: {memberSince}</p>  

                            <div className="buttons-list">
                            { user._id && bike.owner && (user._id == bike.owner._id) &&
                                <>
                                    <button onClick={onEditClick} className="button">EDIT</button>
                                    <button onClick={onDeleteClick} className="button delete-button">DELETE</button>
                                </>}

                            { user._id && bike.owner && (user._id !== bike.owner._id) &&
                                <>
                                    <Link to={`/conversations/${user.username}/send-message/${bike.owner?.username}/${bike.title}`} className="button">SEND MESSAGE</Link>
                                </>
                            }
                            { !user._id &&
                                <Link to="/register" className="button">REGISTER TO SEND MESSAGE</Link>   
                            }
                        </div>    
                    </div>
                </article>
           </div>
        </section>}
        {editMode && <BikeForm bike={bike} editBike={editBike} editMode={editMode}></BikeForm>}
        </>
    );
}

export default BikeDetails

