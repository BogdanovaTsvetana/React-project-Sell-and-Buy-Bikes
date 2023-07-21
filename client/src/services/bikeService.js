import { request } from '../utils/requester.js';

const baseUrl = 'http://localhost:5000/list';

export async function createBike(bikeData) {
    let result = await request(`${baseUrl}`, 'POST', bikeData, true);
    return result;      
}

export async function getAll(filters) {
    let result = await request(`${baseUrl}?category=${filters.category}&condition=${filters.condition}`);
    return result;     
}

export async function getOneById(id) {
    let result = await request(`${baseUrl}/${id}`);
    return result;    
}

export async function getMyAds(userId) {
    let result = await request(`${baseUrl}/myads/${userId}`, 'GET', undefined, true);
    return result;
}

export async function editBike(bikeId, bikeData){
    let result = await request(`${baseUrl}/${bikeId}`, 'PUT', bikeData, true);
    return result;     
}

export async function deleteBike(id) {
    let result = await request(`${baseUrl}/${id}`, 'DELETE', undefined, true, true);
    return result;
}
