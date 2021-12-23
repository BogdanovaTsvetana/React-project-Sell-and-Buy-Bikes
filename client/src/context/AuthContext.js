import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

const initialAuthState = {
    _id: '',
    username: '',
    email: '',
    accessToken: '',
};

export const AuthProvider = ({ children }) => {  
    const [user, setUser] = useState(initialAuthState);

    const login = (authData) => {
        setUser(authData);
    }

    const logout = () => {
        setUser(initialAuthState);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const authState = useContext(AuthContext);

    return authState;
} 