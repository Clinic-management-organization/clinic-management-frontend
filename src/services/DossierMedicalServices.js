import axios from "axios";

const Backend_URL = "http://127.0.0.1:8080/";

export const getAllDossiersMedicaux = async () => {
    const endPoint = `api/dossiersMedicaux`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axios.get(url);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching dossiers medicaux:", error);
        return { success: false, message: error.message };
    }
};

export const deleteDossierMedicalByID = async (dossierMedicalID) => {
    const endPoint = `api/dossiersMedicaux/delete/${dossierMedicalID}`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.error("Error deleting dossier medical:", error);
        return { success: false, message: error.message };
    }
};

export const addDossierMedical = async (dossierMedical) => {
    const endPoint = `api/dossiersMedicaux`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axios.post(url, { ...dossierMedical });
        return response.data;
    } catch (error) {
        console.error("Error adding dossier medical:", error);
        return { success: false, message: error.message };
    }
};

export const updateDossierMedicalByID = async (dossierMedicalID, dossierMedicalInfo) => {
    const endPoint = `api/dossiersMedicaux/update/${dossierMedicalID}`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axios.put(url, { ...dossierMedicalInfo });
        return response.data;
    } catch (error) {
        console.error("Error updating dossier medical:", error);
        return { success: false, message: error.message };
    }
};

export const getDossierMedicalByID = async (dossierMedicalID) => {
    const endPoint = `api/dossiersMedicaux/${dossierMedicalID}`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching dossier medical:", error);
        return { success: false, message: error.message };
    }
};

