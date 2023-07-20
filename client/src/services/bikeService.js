import getToken from "./authService.js";

const baseUrl = 'http://localhost:5000/list';

export async function create(bikeData) {
    let response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': getToken(),
        },
        body: JSON.stringify(bikeData)
        })
   
    if (!response.ok) {
        let message = await response.json();
        throw new Error(message.message);
    }
    
    let data = await response.json();
    return data;       
}

export async function getAll(filters) {
    let response = await fetch(`${baseUrl}?category=${filters.category}&condition=${filters.condition}`)

    if (!response.ok) {
        let message = await response.json();
        throw new Error(message.message);
    }
    
    let data = await response.json();
    return data;       
}

export async function getOneById(id) {
    let response = await fetch(`${baseUrl}/${id}`)

    if (!response.ok) {
        let message = await response.json();
        throw new Error(message.message);
    }
    
    let data = await response.json();
    return data;       
}

export async function getMyAds(userId) {
    // let response = await fetch(`${baseUrl}/myads/?myAds=${userId}`,{
    let response = await fetch(`${baseUrl}/myads/${userId}`,{
    headers: {
        'X-Authorization': getToken(),
    }});

    if (!response.ok) {
        let message = await response.json();
        throw new Error(message.message);
    }
    
    let data = await response.json();
    return data;       
}

export async function edit(bikeId, bikeData){
    let response = await fetch(`${baseUrl}/${bikeId}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': getToken(),
        },
        body: JSON.stringify(bikeData)
        })

    if (!response.ok) {
        let message = await response.json();
        throw new Error(message);
    }
    
    let data = await response.json();
    return data;       
}

export async function deleteBike(id) {
    let response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': getToken(),
        },
    })

    if (!response.ok) {
        let message = await response.json();
        throw new Error(message);
    }     
}




