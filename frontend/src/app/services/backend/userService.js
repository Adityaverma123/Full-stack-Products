import axiosClient from "../clients/axiosClient";

export const getUserInfo = async () => {
    const response = await axiosClient.get('/user');
    return response.data
}