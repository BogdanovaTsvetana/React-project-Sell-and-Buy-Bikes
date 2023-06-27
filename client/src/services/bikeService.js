import { useSearchParams } from "react-router-dom";
const baseUrl = 'http://localhost:5000/list';


export async function create(bikeData, token) {
    let response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': token,
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
    console.log(filters)

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

export async function deleteBike(id, token) {
    let response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token,
        },
    })

    if (!response.ok) {
        let message = await response.json();
        throw new Error(message);
    }     
}

export async function edit(bikeId, bikeData, token){
    let response = await fetch(`${baseUrl}/${bikeId}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': token,
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


