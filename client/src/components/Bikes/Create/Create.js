import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext.js';
import { NotificationContext, types } from '../../../context/NotificationContext.js';
import * as bikeService from '../../../services/bikeService.js';
import BikeForm from '../BikeForm/BikeForm.js';

const bikeModel = {
    title: '', 
    year: '', 
    price: '',  
    category: '',  
    condition: '', 
    frameSize: '', 
    wheelSize: '', 
    material: '', 
    frontTravel: '', 
    rearTravel: '', 
    location: '', 
    description: '', 
    image: '',    
}

export default function Create(){
    const navigate = useNavigate();
    let { user } = useContext(AuthContext);
    const { addNotification } = useContext(NotificationContext); 

    const createBike = (bike) => {
        bike.postDate = new Date();
    
        bikeService.create(bike, user.accessToken)
            .then(result => {
                console.log(result)
                addNotification('You\'ve created your ad!', types.success);
                navigate(`/list/${result._id}`);
            })
            .catch(err => {
                console.log(err.message);
                addNotification(err.message, types.error);
            })
    }
   
    return(
        <BikeForm bike={bikeModel} createBike={createBike}></BikeForm>
    );
}
