import axiosInstance from "./axiosInstance";

const Backend_URL = "http://127.0.0.1:8080/";

const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = JSON.parse(window.atob(base64));
        return jsonPayload;
    } catch (error) {
        console.error("Error parsing JWT:", error);
        return null;
    }
};

const getRolesFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = parseJwt(token);
        return decodedToken.roles || [];
    }
    return [];
};

const checkUserRole = (allowedRoles, userRoles) => {
    return allowedRoles.some(role => userRoles.includes(role));
};

const makeAuthorizedRequest = async (endpoint, method, data = null, headers = {}) => {
    try {
        const userRoles = getRolesFromToken();
        if (checkUserRole(headers.allowedRoles, userRoles)) {
            const url = Backend_URL + endpoint;
            const response = await axiosInstance({ method, url, data, headers });
            return response.data;
        } else {
            return { success: false, message: "Permission denied" };
        }
    } catch (error) {
        console.error(`Error making ${method} request to ${endpoint}:`, error);
        return { success: false, message: error.message };
    }
};

export const searchPatients = async (searchCriteria) => {
    const endpoint = `api/patients/search`;
    const method = 'get';
    const allowedRoles = ['USER', 'ADMIN'];
    return makeAuthorizedRequest(endpoint, method, null, { allowedRoles, params: searchCriteria });
};

export const getAllPatients = async () => {
    const endpoint = `api/patients`;
    const method = 'get';
    const allowedRoles = ['USER', 'ADMIN'];
    return makeAuthorizedRequest(endpoint, method, null, { allowedRoles });
};

export const deletePatientByID = async (patientID) => {
    const endpoint = `api/patients/delete/${patientID}`;
    const method = 'delete';
    const allowedRoles = ['ADMIN'];
    return makeAuthorizedRequest(endpoint, method, null, { allowedRoles });
};

export const addPatient = async (patient) => {
    const endpoint = `api/patients`;
    const method = 'post';
    const allowedRoles = ['ADMIN'];
    return makeAuthorizedRequest(endpoint, method, { ...patient }, { allowedRoles });
};

export const updatePatientByID = async (patientID, patientInfo) => {
    const endpoint = `api/patients/update/${patientID}`;
    const method = 'put';
    const allowedRoles = ['ADMIN'];
    return makeAuthorizedRequest(endpoint, method, { ...patientInfo }, { allowedRoles });
};

export const getPatientByID = async (patientID) => {
    const endpoint = `api/patients/${patientID}`;
    const method = 'get';
    const allowedRoles = ['USER', 'ADMIN'];
    return makeAuthorizedRequest(endpoint, method, null, { allowedRoles });
};
