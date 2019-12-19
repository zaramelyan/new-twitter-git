const API_URL = '/api';

export function getTweets() {
    return fetch(`${API_URL}/tweets`)
    .then((res) => res.json());
}

export function postTweet(message) {
    return fetch(`${API_URL}/tweets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('twitter_clone_token')
    },
        body: JSON.stringify({ message })
}).then((res) => res.json());
}

export async function deleteTweet(messageId) {
    return await fetch(`${API_URL}/tweets/${messageId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('twitter_clone_token')
        }
    });
}

export async function createUser(name, handle, password) {
    return await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, handle, password })
    })
    .then((res) => res.json())
}