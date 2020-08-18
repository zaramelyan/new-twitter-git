const API_URL = '/api/session';

export async function createSession({ handle, password }) {
	return await fetch(`${API_URL}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            handle,
            password
        })
	})
        .then((res) => res.json())
}

export async function checkSession() {
    const res = await fetch(`${API_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('twitter_clone_token')
        }
        
    });
    console.log(res)
    return res.status === 200;
}

