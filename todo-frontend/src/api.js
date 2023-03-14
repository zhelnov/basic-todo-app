const API_BASE_URL = 'http://localhost:3001/';

export async function signup(body) {
    return baseRequest('user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
}

export function login(body) {
    return baseRequest('user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
}

export function findOwnTodos(token) {
    return baseRequest('todo', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export function createTodoItem(token, text) {
    return baseRequest('todo', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    });
}

export function checkmarkTodoItem(token, todoId, complete) {
    const action = complete ? 'complete' : 'uncomplete';
    return baseRequest(`todo/${todoId}/${action}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export function deleteTodoItem(token, todoId) {
    return baseRequest(`todo/${todoId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

async function baseRequest(url, params) {
    try {
        const res = await fetch(`${API_BASE_URL}${url}`, params)
        return await res.json();
    } catch (err) {
        console.error(err)
        throw err;
    }
}