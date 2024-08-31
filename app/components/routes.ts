import axios from 'axios';

const server = process.env.FLASK_SERVER

export const getAllCities = async () => {
    const response = await axios.get(`${server}/api/city/all`);
    return response.data;
};

export const getCitiesWithinRadius = async (lat: number, lng: number, radius: number) => {
    const response = await axios.post(`${server}/api/city/nearby`, {
        lat, lng, radius
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

export const getDescription = async (city: string, country: string) => {
    const response = await axios.post(`${server}/api/city/desc`, {
        city, country
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};


export const getCityDetails = async (name: string) => {
    const response = await axios.get(`${server}/cities/${name}`);
    return response.data;
};
