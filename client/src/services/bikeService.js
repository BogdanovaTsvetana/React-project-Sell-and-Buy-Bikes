
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
        console.log('>> bikeService err')
        throw new Error(message.message);
    }
    
    let data = await response.json();
    return data;       
}

export async function getAll() {
    let response = await fetch(baseUrl)

    if (!response.ok) {
        let message = await response.json();
        console.log('>> bikeService err')
        throw new Error(message.message);
    }
    
    let data = await response.json();
    return data;       
}

export async function getOneById(id) {
    let response = await fetch(`${baseUrl}/${id}`)

    if (!response.ok) {
        let message = await response.json();
        console.log('>> bikeService err')
        throw new Error(message.message);
    }
    
    let data = await response.json();
    return data;       
}
