import axios from 'axios';
import { USER_URL } from './api_constants';

export const authInstance = (token) => {
    return axios.create({
        baseURL: USER_URL,
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-Type" : "application/json",
        }
    });
};


export const GetUserDetails = async (token) => {
    const instance = authInstance(token);

    try {
        const response = await instance.get("");
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}


export const UpdateUserDetails = async (token, updatedUserData ) =>{
    const instance = authInstance(token);
    try{
        const response = await instance.put("", updatedUserData);
        console.log(response.data);
        return response.data;
    } catch(error) {
        console.error(error);
    }
}

export const DeleteUserAccount = async (token) =>{
    const instance = authInstance(token);
    try{
        const response = await instance.delete("");
        console.log(response.data);
        return response.data;
    } catch(error) {
        console.error(error);
    }
}