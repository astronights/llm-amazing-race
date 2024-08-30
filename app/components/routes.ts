import axios from 'axios';
import { server } from '../variables';

export const getAllCities = async () => {
    const response = await axios.get(`${server}/api/city/all`);
    return response.data;
};

export const getCitiesWithinRadius = async (lat: number, lng: number, radius: number) => {
    const response = await axios.get(`${server}/cities/within-radius`, {
        params: { lat, lng, radius }
    });
    return response.data;
};

// Get cities by country
export const getCitiesByCountry = async (country: string) => {
    const response = await axios.get(`${server}/cities/by-country`, {
        params: { country }
    });
    return response.data;
};

// Get city details
export const getCityDetails = async (name: string) => {
    const response = await axios.get(`${server}/cities/${name}`);
    return response.data;
};
