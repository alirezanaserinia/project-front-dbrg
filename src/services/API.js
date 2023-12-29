import axios from 'axios'
const SERVER_URL = "http://localhost:8080/api";
let token = JSON.parse(localStorage.getItem('accessToken'));
axios.defaults.headers.common['Authorization'] = "Bearer "+String(token.token);

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

export const uploadSingleFile = (file) => {
    const url = `${SERVER_URL}/uploadfile`;

    console.log("token::::")
    console.log("Bearer "+String(token.token))

    console.log("in API")
    console.log(file)

    const formData = new FormData();
    formData.append("file", file);

    // let body = {
    //     file : formData,
    // }
    console.log(formData);
    return axios.post(url,formData);
}

export const uploadMultiFile = (username) => {
    const url = `${SERVER_URL}/uploadfile/multi?username=${username}`;
    let body = {
        username : username,
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