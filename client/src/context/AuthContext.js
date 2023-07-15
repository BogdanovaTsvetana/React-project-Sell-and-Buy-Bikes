import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const initialAuthState = {
    _id: '',
    username: '',
    email: '',
    accessToken: '',
};

export const AuthProvider = ({ children }) => {  
    const [user, setUser] = useState(initialAuthState);

    useEffect(() => {
        let userValue = localStorage.getItem('user');

        if(userValue){
          setUser(JSON.parse(userValue));
        }
    },[])

    const login = (authData) => {
        setUser(authData);
        localStorage.setItem('user', JSON.stringify(authData));
    }

    const logout = () => {
        setUser(initialAuthState);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

