import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useAuthContext } from '../../context/AuthContext.js';
import { NotificationContext, types } from '../../context/NotificationContext.js';
import * as authService from '../../services/authService.js';

export default function Login(){
    const navigate = useNavigate();
    const { login } = useAuthContext();
    const { addNotification } = useContext(NotificationContext); 
    
    function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let username = formData.get('username');
        let password = formData.get('password');
       
        let errors = [];

        if ( username === '') {
            errors.push('Username is required!');
        } 

        if ( password === '') {
            errors.push('Password is required!');
        }

        if ( errors.length > 0) {
            let message = errors.join(' ')
            addNotification(message, types.error);
        } else {

            authService.login(username, password)
                .then(result => {
                    login(result);
                    addNotification('You\'ve been logged in!', types.success);
                    navigate('/list');
                })
                .catch(err => {
                    addNotification(err.message, types.error);
                })
        }
    }

    return(
        <section className="common__section">
            <h2 className="common__title">Login</h2>
       
            <form className="form" onSubmit={onSubmit} method="POST" >
                {/* <label htmlFor="email">Email:</label>
                <input type="text" name="email" placeholder="Email" /> */}

                <label htmlFor="username">Username:</label>
                <input type="text" name="username" placeholder="Username" />

                <label htmlFor="password">Password:</label>
                <input type="password"  name="password" placeholder="Password" />
            
                {/* <input type="submit" class="register" value="Register" />   */}
                <button type="submit" className="button" >Login</button>
            </form>
        </section>

        // <section>
        //     <h2>Login</h2>
        //     <form className="form" onSubmit={onSubmit} method="POST">
        //         <label htmlFor="username">Username:</label>
        //         <input type="text" name="username" placeholder="Username"  />
        //         <label htmlFor="password">Password:</label>
        //         <input type="password" name="password" placeholder="Password" />
        //         <input type="submit" value="Login" />
        //     </form>
        // </section>

    );
}
