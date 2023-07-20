const baseUrl = 'http://localhost:5000/user';;  

export async function login(username, password){
    let response = await fetch(baseUrl + '/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({username, password})
        })

    if (!response.ok) {
        let message = await response.json();
        throw new Error(message.message);
    }
    
    let data = await response.json();
    return data;       
}

export async function register(userData){
   
    let response = await fetch(baseUrl + '/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userData)
        })

    if (!response.ok) {
        let message = await response.json();
        throw new Error(message.message);
    }
    
    let data = await response.json();
    return data;       
}

export async function logout(){
    let response = fetch(baseUrl + '/logout', {
        method: 'GET',
        headers: {
            'X-Authorization': getToken(),
        }
    })
}

export default function getToken() {
    let userFromLocalStorage = localStorage.getItem('user');

    if(!userFromLocalStorage){
        throw {message: 'You must be authenticated'}
    }

    let user = JSON.parse(userFromLocalStorage);
    return user.accessToken;
}