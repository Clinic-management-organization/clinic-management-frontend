import axios from "axios";

const Backend_URL = "http://127.0.0.1:8080/";

export const register = async (user) => {
    const endPoint = `auth/register`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axios.post(url, user, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Register Error:", error);
        return { success: false, message: error.message };
    }
};
export const login = async (user) => {
    const endPoint = `auth/login`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axios.post(url, user, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Login Error :", error);
        return { success: false, message: error.message };
    }
};
