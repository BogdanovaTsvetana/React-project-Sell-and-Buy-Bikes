import { useEffect, useState } from 'react'

import * as messagesService from '../../../services/messagesService.js';
import { useAuthContext } from '../../../context/AuthContext.js';
import ConversationCard from './ConversationCard.js/ConversationCard.js';

export default function Inbox() {
    const [conversations, setConversations] = useState([]);
    const { user } = useAuthContext();
   
    useEffect(() => {
        messagesService.getAllConversations(user.username, user.accessToken)
            .then(result => {
                setConversations(result)
            })
            .catch(err => {
                console.log('>> notif>>', err.message) 
            })  
    }, []);
     
   return (
        <section>
            <h2>Your Conversations</h2>
            { 
                conversations.length > 0
                ? conversations.map(c => <ConversationCard key={c.conversationId} conversation={c} />)
                : <h2>No messages</h2>
            }
        </section>
    );
}