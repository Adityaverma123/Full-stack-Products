import axiosClient from "../clients/axiosClient";

export const register = async (username, password) => {
    const response = await axiosClient.post('/auth/register', { username, password });
    if(response.data.token) localStorage.setItem('token', response.data.token);
    else throw new Error("Something went wrong")
}
export const login = async (username, password) => {
    const response = await axiosClient.post('/auth/login', { username, password });
    if(response.data.token) localStorage.setItem('token', response.data.token);
    else throw new Error("Something went wrong")
}