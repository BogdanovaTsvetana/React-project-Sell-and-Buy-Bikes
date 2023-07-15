import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.js';
import './Header.css';

export default function Header(){
    const { user } = useContext(AuthContext);
   
    return (
        <header className="header">
            <div className="header__logo">
                BS BIKES
            </div>

            <nav className="header__nav">
                <ul className="header__nav__items">
                    <li className="header__nav__item">
                        <NavLink  to="/" >Home</NavLink>
                    </li>
                    <li className="header__nav__item">
                        <NavLink  to="/list" end >List</NavLink>
                    </li>

                    { user.username 
                ? 
                <>
               
                    <li className="header__nav__item">
                    <Link to="#" >Wellcome {user.username}</Link>
                    </li>
                    <li className="header__nav__item">
                        <NavLink  to="/list/create"  >New Ad</NavLink>
                    </li>
                    <li className="header__nav__item">
                        <NavLink to="/list/myAds">My Ads</NavLink>
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
        </header>
    );
}


