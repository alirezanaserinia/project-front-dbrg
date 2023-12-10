import axios from 'axios'
const SERVER_URL = "http://localhost:8080/api";
let token = JSON.parse(localStorage.getItem('accessToken'));
axios.defaults.headers.common['Authorization'] = token;

export const login = (username,password) => {
    const url = `${SERVER_URL}/login?username=${username}&password=${password}`;
    console.log(url);
    return axios.post(url);
}

export const register = (username, password) => {
    const url = `${SERVER_URL}/register?username=${username}&password=${password}`;
    let body = {
        username : username,
        password : password,
    }
    console.log(body);
    return axios.post(url,body);
}
    
// export const getCurrentUser = () => {
//     const url = SERVER_URL + "/user";
//     console.log(url);
//     console.log(`Authorize: ${token}`)
//     return axios.get(url);
// }