import getToken from '../services/authService.js';

export async function request(url, method, body, isAuthorized, skipResult) {
    
    if (method === undefined || method.toLowerCase() === 'get') {
        method = 'GET';
    }

    let headers = {};
    if (['post', 'put', 'patch'].includes(method.toLowerCase())) {
        headers['Content-Type'] = 'application/json';
    }

    if (isAuthorized) {
        headers['X-Authorization'] = getToken();
    }

    let options = {
        headers,
        method
    };

    if (body !== undefined) {
        options.body = JSON.stringify(body);
    }


    let response = await fetch(url, options);

    if (!response.ok) {   
        const error = await response.json();
        throw new Error(error.message);
    }

    let data = undefined;
    if (!skipResult) {
        data = await response.json();
    }

    return data;
}