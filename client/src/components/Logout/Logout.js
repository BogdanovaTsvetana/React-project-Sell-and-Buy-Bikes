import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { AuthContext} from '../../context/AuthContext.js';
import * as authService from '../../services/authService.js';

export default function Logout(){
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        authService.logout(user.accessToken)
            .then(() => {
                logout();
                navigate('/list')
            })
            .catch(err => {
                console.log('>> 55', err.message)
             })
    }, []);

    return null;   
}