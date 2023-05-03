import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext.js';
import './Header.css';

export default function Header(){
    const { user } = useAuthContext();

    return (
        <header className="header">
            <div className="header__logo">
                BIKES
            </div>

            <nav className="header__nav">
                <ul className="header__nav__items">
                    <li className="header__nav__item">
                        <NavLink to="/"  >Home</NavLink>
                    </li>
                    <li className="header__nav__item">
                        <NavLink to="/list"  >List</NavLink>
                    </li>

                    { user.email 
                ? 
                <>
               
                    <li className="header__nav__item">
                    <NavLink to="" >Wellcome, {user.username}</NavLink>
                    </li>
                    <li className="header__nav__item">
                        <NavLink to="/list/create"  >New Ad</NavLink>
                    </li>
                    <li className="header__nav__item">
                        <NavLink to={`/conversations/${user.username}`} >Inbox</NavLink>
                    </li>
                    <li className="header__nav__item">
                        <NavLink to="/logout"  >Logout</NavLink>
                    </li>
                </>
                :
                <>
                    <li className="header__nav__item">
                        <NavLink to="/login"  >Login</NavLink>
                    </li>
                    <li className="header__nav__item">
                        <NavLink to="/register"  >Register</NavLink>
                    </li>
                </>
            }
                </ul>
            </nav>


            {/* { user.email 
                ? 
                <>
                <NavLink to="/list/create"  >New Ad</NavLink>
                <NavLink to="/logout"  >Logout</NavLink>
                <NavLink to="" >Wellcome, {user.username}</NavLink>
                <NavLink to={`/conversations/${user.username}`} >Inbox</NavLink>
                </>
                :
                <>
                <NavLink to="/login"  >Login</NavLink>
                <NavLink to="/register"  >Register</NavLink>
                </>
            } */}
        </header>
    );
}


