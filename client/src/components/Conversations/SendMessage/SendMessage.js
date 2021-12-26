import { useContext } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";

import { AuthContext } from '../../../context/AuthContext.js';
import { NotificationContext, types } from '../../../context/NotificationContext.js';
import * as messageService from '../../../services/messagesService.js';

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
        <section>
            <h2>Send Message</h2>
            <p>To: {receiverUsername}</p>
            <p>Subject: {itemTitle}</p>        

            <form  onSubmit={sendMessage} method='POST' >
                <textarea name="message" placeholder="Your message here..." rows="5" cols="100"></textarea>           
                <input type="submit" value="Send" />
            </form>            
                                
        </section> 
    )
}