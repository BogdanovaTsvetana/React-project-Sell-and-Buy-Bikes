const baseUrl = 'http://localhost:5000/user';;  

export function login(username, password) {
    return fetch(baseUrl + '/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    })
        .then(res => {
            console.log('>>> in auth login, res.ok', res.ok)
            return res.json()
        })
}

export function register(userData){

    return fetch(baseUrl + '/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(res => {
            console.log('>> res.ok ', res.ok)
                return res.json();
        })       
}

export function logout(token){
    return fetch(baseUrl + '/logout', {
        method: 'GET',
        headers: {
            'X-Authorization': token,
        }
    })
}