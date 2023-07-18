import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useReducer, useState } from 'react';
import { AuthContext } from '../../context/AuthContext.js';
import { NotificationContext, types } from '../../context/NotificationContext.js';

import * as authService from '../../services/authService.js';
import './Register.css';

const initialInputState = {
    usernameValue: '',
    usernameIsValid: undefined,
    emailValue: '',
    emailIsValid: undefined,
    passwordValue: '',
    passwordIsValid: undefined,
    rePasswordValue: '',
    rePasswordIsValid: undefined,
    locationValue: '',
    locationIsValid: undefined
}

function reducer(inputState, action){
    switch(action.type){
        case 'email_input':
            return {...inputState, emailValue: action.val, emailIsValid: undefined};
        case 'email_valid':
            return {...inputState, emailIsValid: inputState.emailValue.includes('@')};
        case 'username_input':
            return {...inputState, usernameValue: action.val, usernameIsValid: undefined} 
        case 'username_valid':
            return {...inputState, usernameIsValid: inputState.usernameValue.length > 3};
        case 'password_input':
            return {...inputState, passwordValue: action.val, passwordIsValid: undefined};
        case 'password_valid':
            return {...inputState, passwordIsValid: inputState.passwordValue.length > 4};
        case 'rePassword_input':
            return {...inputState, rePasswordValue: action.val, rePasswordIsValid: undefined};
        case 'rePassword_valid':
            return {...inputState, rePasswordIsValid: inputState.rePasswordValue === inputState.passwordValue}; 
        case 'location_input':
            return {...inputState, locationValue: action.val, locationIsValid: undefined};
        case 'location_valid':
            return {...inputState, locationIsValid: inputState.locationValue.length > 0};                 
    }
}

export default function Register(){
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const { addNotification } = useContext(NotificationContext); 

    let[inputState, inputDispatcher] = useReducer(reducer, initialInputState)
    let[isFormValid, updateFormValidation] = useState(false);

    useEffect(() => {
        updateFormValidation(
            inputState.emailIsValid && 
            inputState.usernameIsValid && 
            inputState.passwordIsValid && 
            inputState.rePasswordIsValid && 
            inputState.locationIsValid
        )
    }, [inputState.emailIsValid, inputState.usernameIsValid, inputState.passwordIsValid, inputState.rePasswordIsValid, inputState.locationIsValid])

    const onChangeHandler = (e) => {
        let type = `${e.target.name}_input`;
        inputDispatcher({val: e.target.value.trim(), type: type});
    }

    const ValidationHandler = (e) => {
        let type = `${e.target.name}_valid`;
        switch(e.target.name){
            case 'email':
                inputDispatcher({val: inputState.emailValue, type})
                break;
            case 'username':
                inputDispatcher({val: inputState.usernameValue, type})
                break;
            case 'password':
                inputDispatcher({val: inputState.passwordValue, type})
                break;  
            case 'rePassword':
                inputDispatcher({val: inputState.rePasswordValue, type})
                break;
            case 'location':
                inputDispatcher({val: inputState.locationValue, type})
                break;   
            }
    }

    function onSubmit(e){
        e.preventDefault();
        if(isFormValid){
            const userData = {
                username: inputState.usernameValue,
                email: inputState.emailValue,
                password: inputState.passwordValue,
                location: inputState.locationValue,
                memberSince: new Date(),
            }
                    
            authService.register(userData)
                .then(result => {
                    login(result);
                    console.log(result)
                    addNotification('You\'ve been registered!', types.success);
                    navigate('/list');
                })
                .catch(err => {
                    console.log(err.message)
                    addNotification(err.message, types.error);
                })
        }else{
            console.log('invalid form')
        }
    }

    
    return(
        <section className="common__section">
            <h2 className="common__title">Register</h2>
           
            <form className="form" onSubmit={onSubmit} method="POST" onChange={onChangeHandler} >

                <div>
                    <label htmlFor="email">
                        Email {inputState.emailIsValid === false && <span className="error-message">not valid</span>}
                    </label>
                    <input 
                        type="text" 
                        name="email" 
                        placeholder="Email" 
                        defaultValue={inputState.emailValue}
                        onBlur={ValidationHandler}
                        className={inputState.emailIsValid === false ? 'input-error' : ''}
                    />
                </div>
                
                <div>
                    <label htmlFor="username">
                        Username {inputState.usernameIsValid === false && <span className="error-message">should be more than 3 characters long.</span>}
                    </label>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Username should be more than 3 characters long" 
                        defaultValue={inputState.usernameValue}
                        onBlur={ValidationHandler}
                        className={inputState.usernameIsValid === false ? 'input-error' : ''}
                    />
                </div>
                
                <div>
                    <label htmlFor="password">
                        Password {inputState.passwordIsValid === false && <span className="error-message">should be more than 4 characters long</span>}
                    </label>
                    <input 
                        type="password"  
                        name="password" 
                        placeholder="Password should be more than 4 characters long"
                        defaultValue={inputState.passwordValue}
                        onBlur={ValidationHandler}
                        className={inputState.passwordIsValid === false ? 'input-error' : ''} 
                    />
                </div>
                
                <div>
                    <label htmlFor="rePassword">
                        Repeat Password {inputState.rePasswordIsValid === false && <span className="error-message">Passwords don't match</span>}
                    </label>
                    <input 
                        type="password"  
                        name="rePassword" 
                        placeholder="Repeat Password"
                        defaultValue={inputState.rePasswordValue} 
                        onBlur={ValidationHandler}
                        className={inputState.rePasswordIsValid === false ? 'input-error' : ''} 
                    />
                </div>
                
                <div>
                    <label htmlFor="location">
                        Location {inputState.locationIsValid === false && <span className="error-message">required</span>}
                    </label>
                    <input 
                        type="text" 
                        name="location"
                        placeholder="Location" 
                        defaultValue={inputState.locationValue} 
                        onBlur={ValidationHandler}
                        className={inputState.rePasswordIsValid === false ? 'input-error' : ''} 
                    /> 
                </div>
                
                <button type="submit" className="button" disabled={!isFormValid} >REGISTER</button>
    
            </form>
        </section>
    );
}

