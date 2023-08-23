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

export const GetAddressById = async(token, contactId, addressId) => {
    const instance = authInstance(token);
    try {
        const response = await instance.get(`${contactId}/contactNumbers/${addressId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return respnnse.error;
    }
}

export const DeleteAddressById = async(token, contactId, addressId) => {
    const instance = authInstance(token);
    try {
        const response = await instance.delete(`${contactId}/contactNumbers/${addressId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return respnnse.error;
    }
}

export const UpdateAddressById = async(token, contactId, addressId, updateAddressData) => {
    const instance = authInstance(token);
    try {
        const response = await instance.put(`${contactId}/contactNumbers/${addressId}`, updateAddressData);
        return response.data;
    } catch (error) {
        console.log(error);
        return respnnse.error;
    }
}

