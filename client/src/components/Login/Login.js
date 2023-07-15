import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';
import { NotificationContext, types } from '../../context/NotificationContext.js';
import * as authService from '../../services/authService.js';

export default function Login(){
    const { login } = useContext(AuthContext);
    const { addNotification } = useContext(NotificationContext); 
    const navigate = useNavigate();

    let usernameRef = useRef();
    let passwordRef = useRef();

    function onSubmit(e){
        e.preventDefault();

        let errors = [];

        if ( usernameRef.current.value.trim() === '') {
            errors.push('Username is required!');
        } 

        if ( passwordRef.current.value.trim() === '') {
            errors.push('Password is required!');
        }

        if ( errors.length > 0) {
            let message = errors.join(' ')
            addNotification(message, types.error);
        } else {
            authService.login(usernameRef.current.value, passwordRef.current.value)
                .then(result => {
                    login(result);
                    addNotification('You\'ve been logged in!', types.success);
                    navigate('/list');
                })
                .catch(err => {
                    console.log(err.message)
                    addNotification(err.message, types.error);
                })
        }
    }

    return(
        <section className="common__section">
            <h2 className="common__title">Login</h2>
       
            <form className="form" onSubmit={onSubmit} method="POST" >

                <label htmlFor="username">Username:</label>
                <input type="text" name="username" placeholder="Username" ref={usernameRef}/>

                <label htmlFor="password">Password:</label>
                <input type="password"  name="password" placeholder="Password" ref={passwordRef}/>
            
                <button type="submit" className="button" >Login</button>
            </form>
        </section>

    );
}
