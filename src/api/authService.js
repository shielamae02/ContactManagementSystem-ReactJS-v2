import axios from 'axios';
import { AUTH_URL } from './api_constants';


const authInstance = axios.create({
    baseURL: AUTH_URL,
    headers: {
        "Content-Type": "application/json",
    },
});;

export const SignUpService = async ( userData ) => {
    try {
        const response = await authInstance.post(AUTH_URL + 'register', userData);
        console.log(response);
        return response;
    }
    catch (error){
        return error.response;
    }
}

export const LoginService = async ( userData ) => {
    try {
        const response = await authInstance.post(AUTH_URL + 'login', userData);
        console.log(response);
        return response;
    }
    catch (error){
        console.log(error.response);
        return error.response;
    }
}
