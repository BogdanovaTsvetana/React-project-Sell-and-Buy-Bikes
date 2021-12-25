import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext.js';
import './Header.css';

export default function Header(){
    const { user } = useAuthContext();

    return (
        <header >
            
            <NavLink to="/"  >Home</NavLink>
            <NavLink to="/list" >List</NavLink>
          
            { user.email 
                ? 
                <>
                <NavLink to="/list/create"  >Sell</NavLink>
                <NavLink to="/logout"  >Logout</NavLink>
                <NavLink to="" >Wellcome, {user.username}</NavLink>
              
                </>
                :
                <>
                <NavLink to="/login"  >Login</NavLink>
                <NavLink to="/register"  >Register</NavLink>
                </>
            }
        </header>
    );
}