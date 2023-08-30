import axios from 'axios';
import { CONTACT_URL } from './api_constants';

const authInstance = (token) => {
    return axios.create({
        baseURL: CONTACT_URL,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
}

export const GetContacts = async (token) => {
    const instance = authInstance(token);
    try{
        const response = await instance.get();    
        return response.data;
    }
    catch(error){
        console.log(error);
        return error.response;
    }
}

export const GetContactsById = async (token, contactId) => {
    const instance = authInstance(token);
    try {
        const response = await instance.get(`${contactId}`);
        return response.data;
    }
    catch(error){
        console.log(error);
        return error.response;
    }
}


export const AddContact = async (token, contactData) => {
    const instance = authInstance(token);
    try {
        const response = await instance.post("", contactData);
        return response;
    } catch(error){
        console.log(error);
        return error.response;
    }
}

export const UpdateContact = async (token, contactId, updateContactData) => {
    const instance = authInstance(token);
    try{
        console.log(updateContactData);
        const response = await instance.put(`${contactId}`, updateContactData);
        return response.data;
    } catch(error) {
        console.log(error);
        return error.response;
    }
}

export const DeleteContact = async (token, contactId) => {
    const instance = authInstance(token);
    try {
        const response = await instance.delete(`${contactId}`);
        return response.data;
    } catch(error){
        console.log(error);
        return error.response;
    }   
}