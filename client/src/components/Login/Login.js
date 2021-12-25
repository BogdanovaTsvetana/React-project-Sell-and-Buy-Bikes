import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext.js';
import * as authService from '../../services/authService.js';

export default function Login(){
    const navigate = useNavigate();
    const { login } = useAuthContext();
    
    function onSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let username = formData.get('username');
        let password = formData.get('password');
       
        let errors = [];

        if ( username == '') {
            errors.push('Username is required!');
        } 

        if ( password == '') {
            errors.push('Password is required!');
        }

        if ( errors.length > 0) {
            let message = errors.join(' ')
            console.log(message);
        } else {

            authService.login(username, password)
                .then(result => {
                    login(result);
                    navigate('/list');
                })
                .catch(err => {
                    console.log('>> 55', err.message)
                })
        }
    }

    return(
        <section>
            <h2>Login</h2>
            <form className="form" onSubmit={onSubmit} method="POST">
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" placeholder="Username"  />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" placeholder="Password" />
                <input type="submit" value="Login" />
            </form>
        </section>
    );
}
