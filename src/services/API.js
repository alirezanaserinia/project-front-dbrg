import axios from 'axios'
const SERVER_URL = "http://localhost:8080/api";
// let token = JSON.parse(localStorage.getItem('accessToken'));
// axios.defaults.headers.common['Authorization'] = "Bearer " + String(token.token);

export const login = (username, password) => {
    const url = `${SERVER_URL}/login?username=${username}&password=${password}`;
    console.log(url);
    return axios.post(url);
}

export const register = (username, password) => {
    const url = `${SERVER_URL}/register?username=${username}&password=${password}`;
    let body = {
        username: username,
        password: password,
    }
    console.log(body);
    return axios.post(url, body);
}

export const uploadSingleFile = (formData) => {
    const url = `${SERVER_URL}/uploadfile`;
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `${String(token.type)} ${String(token.token)}`,
        },
    };
    return axios.post(url, formData, config);
}

export const uploadMultiFile = (formData) => {
    const url = `${SERVER_URL}/uploadfile/multi`;
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `${String(token.type)} ${String(token.token)}`,
        },
    };
    return axios.post(url, formData, config);
}
