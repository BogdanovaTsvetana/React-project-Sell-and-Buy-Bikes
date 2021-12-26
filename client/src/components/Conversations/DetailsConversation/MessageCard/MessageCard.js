//import { Link } from 'react-router-dom';
//import './MessageCard.css';

export default function MessageCard({
    message,  
}){
    //console.log(message.author)
    
    return (
        <div className="">

            
            <span>{message.author} says:    </span>
            <span>{message.message}</span>
            <br/>
                
        </div>

    );
}

