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
        console.log(username, password)

        authService.login(username, password)
            .then(result => {
                login(result);
                navigate('/');
            })
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
