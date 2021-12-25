import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext.js';
import * as authService from '../../services/authService.js';
import './Register.css';

export default function Register(){
    const navigate = useNavigate();
    const { login } = useAuthContext();

    function onSubmit(e){
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let username = formData.get('username');
        let email = formData.get('email');
        let password = formData.get('password');
        let rePassword = formData.get('rePassword');
        let location = formData.get('location');

        let errors = [];

        if ( username == '') {
            errors.push('Username is required!');
        } 

        if ( email == '') {
            errors.push('Email is required!');
        }

        if ( password == '') {
            errors.push('Password is required!');
        }

        if ( password != rePassword) {
            errors.push('Passwords don\'t match!');
        }

        if ( errors.length > 0) {
            let message = errors.join(' ')
            console.log(message)
        } else {
            const userData = {
                username,
                email,
                password,
                location,
                memberSince: new Date(),
            }
    
            authService.register(userData)
                .then(result => {
                    login(result);
                    navigate('/list')
                })
                .catch(err => {
                   console.log('>> 55', err.message)
                })
        }
    }

    return(
        <section >
            <h2>Register</h2>
           
            <form className="form" onSubmit={onSubmit} method="POST" >
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" placeholder="Email" />
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" placeholder="Username" />
                <label htmlFor="password">Password:</label>
                <input type="password"  name="password" placeholder="Password" />
                <label htmlFor="rePassword">Repeat Password:</label>
                <input type="password"  name="rePassword" placeholder="Repeat Password" />
                <label htmlFor="location">Location:</label>
                <input type="text" name="location" placeholder="Location" />
                
                <input type="submit" class="register" value="Register" />  
            </form>
        </section>
    );
}