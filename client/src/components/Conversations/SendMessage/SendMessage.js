import { useContext } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";

import { AuthContext } from '../../../context/AuthContext.js';
import { NotificationContext, types } from '../../../context/NotificationContext.js';
import * as messageService from '../../../services/messagesService.js';
import './SendMessage';

export default function SendMessage(){
    const navigate = useNavigate();
    let { user } = useContext(AuthContext);
    const { addNotification } = useContext(NotificationContext); 
    const { username, receiverUsername, itemTitle } = useParams();

    const sendMessage = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let message = formData.get('message');

        let messageData = {
            author: username,
            message,
        }
               
        messageService.createConversation( messageData, user.accessToken, username, receiverUsername, itemTitle)
            .then(result => {
                console.log('>> created')
                console.log(result)
                addNotification('Message sent.', types.success);
                navigate('/list');
            })
            .catch(err => {
                console.log('>> notif>>', err.message) 
                navigate(`*`);
            })  
    }

    return(

        <section className="common__section">
            <h2 className="common__title">SEND MESSAGE</h2>           

            <form  onSubmit={sendMessage} method='POST' className="form">
                <h3 className="message-title">To  {receiverUsername} | {itemTitle} </h3>
                <textarea name="message" rows="10" cols="100" placeholder="Your message here..." ></textarea>           
                <button type="submit" className="button">SEND</button>
            </form>                                   
        </section> 
    )
}