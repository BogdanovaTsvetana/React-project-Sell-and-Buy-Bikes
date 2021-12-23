

const baseUrl = 'http://localhost:5000/list';


export function create(bikeData, token) {
    console.log(bikeData)
    console.log(JSON.stringify(bikeData))
    return fetch(`${baseUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify(bikeData)
    })
        .then(res => res.json())
}
