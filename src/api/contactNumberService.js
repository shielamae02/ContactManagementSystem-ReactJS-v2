import axios from 'axios';
import { CONTACT_URL } from './api_constants';

export const authInstance = (token) => {
    return axios.create({
        baseURL: CONTACT_URL,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type" : "application/json"
        }
    })
}

export const AddContactNumber = async (token, contactId, contactNumberData) => {
    const instance = authInstance(token);
    try {
        const response = await instance.post(`${contactId}/contactNumbers`, contactId, contactNumberData);
        return response.data;
    } catch(error){
        console.log(error);
        return error.response;
    }
}

export const GetContactNumberById = async(token, contactId, contactNumberId) => {
    const instance = authInstance(token);
    try {
        const response = await instance.get(`${contactId}/contactNumbers/${contactNumberId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return respnnse.error;
    }
}

export const DeleteContactNumberById = async(token, contactId, contactNumberId) => {
    const instance = authInstance(token);
    try {
        const response = await instance.delete(`${contactId}/contactNumbers/${contactNumberId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return respnnse.error;
    }
}

export const UpdateContactNumberById = async(token, contactId, contactNumberId, updateContactData) => {
    const instance = authInstance(token);
    try {
        const response = await instance.put(`${contactId}/contactNumbers/${contactNumberId}`, updateContactData);
        return response.data;
    } catch (error) {
        console.log(error);
        return respnnse.error;
    }
}

