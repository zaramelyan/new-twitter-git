const API_URL = '/api';

export function createSession({ handle, password }) {
    return fetch(`${API_URL}/session`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ handle, password })
    })
    .then((res) => res.json())
}

export async function checkSession() {
    const res = await fetch(`${API_URL}/session`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('twitter_clone_token')
        }
    });
    return res.status === 200;
}

