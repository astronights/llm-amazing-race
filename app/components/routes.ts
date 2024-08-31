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
    const response = await axios.post(`${server}/api/llm/chat`, {
        message: 'Please create a small description for this city',
        data: { city, country }
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

export const getPuzzle = async (city: string, lat: number, lng: number) => {
    const sights = await axios.post(`${server}/api/city/attr`, {
        lat, lng
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const response = await axios.post(`${server}/api/llm/chat`, {
        message: 'Please create a puzzle for this city',
        data: { city, sights }
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
