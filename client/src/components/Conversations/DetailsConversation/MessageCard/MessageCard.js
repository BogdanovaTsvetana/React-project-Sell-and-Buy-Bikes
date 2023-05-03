//import { Link } from 'react-router-dom';
import './MessageCard.css';

export default function MessageCard({
    message,  
}){
    let postDate = message.postDate ? message.postDate.slice(0, 10) : '';
    
    return (
        <div className="details-conversation__item">
            <p>{message.author} | {postDate} </p>
            <p>{message.message}</p>
        </div>
    );
}

