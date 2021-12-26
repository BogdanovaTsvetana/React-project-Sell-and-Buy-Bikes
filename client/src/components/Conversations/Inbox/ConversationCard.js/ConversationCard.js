import { Link } from 'react-router-dom';

export default function Bike({
    conversation,  
}){
    
    return (

        <div className="conversation">
           
            <span>Conversation with: {conversation.withh} </span>
            <span>Subject: "{conversation.subject}""  </span>
            <span>New messages: {conversation.newMessages}  </span>
            
            <Link to={`/conversations/${conversation.username}/${conversation.conversationId}`} >[ All messages ]</Link>
            
        </div>

    );
}
