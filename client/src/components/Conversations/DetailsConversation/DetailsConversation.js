import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext.js";
import { NotificationContext, types } from '../../../context/NotificationContext.js';
import * as messagesService from "../../../services/messagesService.js"
import MessageCard from './MessageCard/MessageCard.js';
import './DetailsConversation.css';

const DetailsConversation = () => {
    const [conversation, setConversation] = useState({});
    const { conversationId } = useParams();
    const { user } = useContext(AuthContext);
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
                // setConversation(state => ({...state, messages: [...state.messages, result]}));
                addNotification('Message sent.', types.success);
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
        <section className="common__section">
            <h2 className="common__title">Conversation with {conversation.withh} about "{conversation.subject}"</h2>
    
            { 
                conversation.messages
                ? (
                <ul className="details-conversation__items">
                    {conversation.messages.map(m => <MessageCard key={m._id} message={m} />)}

                    <li className="details-conversation__item">
                        <form onSubmit={sendMessageHandler} method='POST' >
                            <textarea name="message" rows="3" cols="60" placeholder="Your message here..." ></textarea>
                            <div className="buttons-list">
                                <button type="submit" class="button">SEND</button>
                                <Link to="" onClick={onDeleteClick} class="button delete-button">DELETE ALL MESSAGES</Link>
                            </div>
                            
                        </form>
                    </li>
                </ul>
                )
                
                :
                <></>
            }

        </section>
    )
}

export default DetailsConversation;

