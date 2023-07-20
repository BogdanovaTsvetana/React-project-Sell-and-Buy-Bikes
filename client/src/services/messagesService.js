import getToken from "./authService.js";

const baseUrl = 'http://localhost:5000/conversations';

export async function createConversation(messageData, username, receiverUsername, itemTitle) {
    let response = await fetch(`${baseUrl}/${username}/send-message/${receiverUsername}/${itemTitle}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
            'X-Authorization': getToken(),
        },
        body: JSON.stringify(messageData)
    })

    if (!response.ok) {
        let message = await response.json();
        console.log('>> messageService err')
        throw new Error(message);
    }
    
    let data = await response.json();
    return data; 
}

export async function getAllConversations(username) {
    let response = await fetch(`${baseUrl}/${username}`, {
        method: 'GET',
        headers: {
            'X-Authorization': getToken(),
        }
    })

    if (!response.ok) {
        let message = await response.json();
        console.log('>> messageService err')
        throw new Error(message);
    }
    
    let data = await response.json();
    return data; 
}

export async function  getConversation(username, conversationId) {
    let response = await fetch(`${baseUrl}/${username}/${conversationId}`, {
        method: 'GET',
        headers: {
            'X-Authorization': getToken(),
        }
    })

    if (!response.ok) {
        let message = await response.json();
        console.log('>> messageService err')
        throw new Error(message);
    }
    
    let data = await response.json();
    return data; 
}


export async function sendMessage(messageData, username, conversationId) {
    let response = await fetch(`${baseUrl}/${username}/${conversationId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
            'X-Authorization': getToken(),
        },
        body: JSON.stringify(messageData)
    })

    if (!response.ok) {
        let message = await response.json();
        console.log('>> messageService err')
        throw new Error(message);
    }
    
    let data = await response.json();
    return data; 
}

export async function deleteConversation(username, conversationId) {
    let response = await fetch(`${baseUrl}/${username}/${conversationId}`, {
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
