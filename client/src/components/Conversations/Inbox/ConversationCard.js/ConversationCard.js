import { Link } from 'react-router-dom';
import './ConversationCard.css';

export default function Bike({
    conversation,  
}){
    
    return (

        <div className="conversation">
           
            <span className="conversation__content">{conversation.withh}  </span>
            <span className="conversation__content">{conversation.subject}  </span>
            <span className="conversation__content">New messages: {conversation.newMessages}  </span>
            
            <Link to={`/conversations/${conversation.username}/${conversation.conversationId}`} className="button"> All messages</Link>
            
        </div>
    );
}
