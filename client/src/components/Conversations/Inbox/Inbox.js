import { useEffect, useState, useContext } from 'react'

import * as messagesService from '../../../services/messagesService.js';
import { AuthContext } from '../../../context/AuthContext.js';
import ConversationCard from './ConversationCard.js/ConversationCard.js';

export default function Inbox() {
    const [conversations, setConversations] = useState([]);
    const { user } = useContext(AuthContext);
   
    useEffect(() => {
        messagesService.getAllConversations(user.username)
            .then(result => {
                setConversations(result)
            })
            .catch(err => {
                console.log('>> notif>>', err.message) 
            })  
    }, []);
     
   return (
   
        <section className="common__section">
            <h2 className="common__title">YOUR CONVERSATIONS</h2>
            { 
            conversations.length > 0
            ? (
            <ul className="conversations" >
            {conversations.map(c => <ConversationCard key={c.conversationId} conversation={c} />)}
             </ul>
            )

            : <p className="no-messages">No messages</p>
            }

</section>
    );
}