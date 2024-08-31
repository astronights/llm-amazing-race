import axios from 'axios';

const server = process.env.FLASK_SERVER

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

export const getCityDetails = async (name: string) => {
    const response = await axios.get(`${server}/cities/${name}`);
    return response.data;
};
