import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../../context/AuthContext.js";
import { NotificationContext, types } from '../../../context/NotificationContext.js';
import * as messagesService from "../../../services/messagesService.js"
import MessageCard from './MessageCard/MessageCard.js';

import './DetailsConversation.css';

const DetailsConversation = () => {
    const [conversation, setConversation] = useState({});
    const { conversationId } = useParams();
    const { user } = useAuthContext();
    const { addNotification } = useContext(NotificationContext); 
    const navigate = useNavigate();

    useEffect(() => {
        messagesService.getConversation(user.username, conversationId, user.accessToken)
            .then(result => {
                setConversation(result);
              
            })
            .catch(err => {
                console.log('>> notif>>', err.message) 
                navigate(`*`);
            })   
    }, []);

    function sendMessageHandler(e){
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let message = formData.get('message');

        let messageData = {
            author: user.username,
            message,
        }
        
        messagesService.sendMessage(messageData, user.username, conversationId, user.accessToken)
            .then(result => {
                console.log('result')
                console.log(result)
                setConversation(state => ({...state, messages: state.messages.concat(result)}));
                //setConversation(state => ({...state, messages: [...state.messages, result]}));
                addNotification('Message sent.', types.success);
                //navigate('/list')
            })
            .catch(err => {
                console.log('>> notif>>', err.message) 
                navigate(`*`);
            }) 
    }

    function onDeleteClick(e){
        e.preventDefault();
        
        messagesService.deleteConversation(conversation.username, conversation.conversationId, user.accessToken)
            .then(() => {
                console.log('>> deleted')
                navigate('/list')
            })
            .catch(err => {
                console.log('>> 55', err.message)
             });
    }

    return (
        <section id="sendmessage">
            <h3>Conversation "{conversation.subject}" with {conversation.withh}</h3>
 
            { 
                conversation.messages
                ?
                conversation.messages.map(m => <MessageCard key={m._id} message={m} />)
                :
                <></>
            }
       
            <br/>
            <form onSubmit={sendMessageHandler} method='POST' >
                <textarea name="message" placeholder="Your message here..." rows="5" cols="100"></textarea>
                <input type="submit" value="Send" />
            </form>

            <Link to="" onClick={onDeleteClick}> [ Delete Conversation ] </Link>
    
        </section>
    )
}

export default DetailsConversation;

