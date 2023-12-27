import axios from "axios";

const Backend_URL = "http://127.0.0.1:8080/";

export const getAllConsultation = async () => {
    const endPoint = `api/consultations`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axios.get(url);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching consultations:", error);
        return { success: false, message: error.message };
    }
};

export const deleteConsultation = async (dossierMedicalID) => {
    const endPoint = `api/consultations/delete/${dossierMedicalID}`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.error("Error deleting consultation:", error);
        return { success: false, message: error.message };
    }
};

export const addConsultation = async (dossierID,consultation) => {
    const endPoint = `api/consultations/add-to-dossier/${dossierID}`;
    const url = Backend_URL + endPoint;
    console.log(consultation);

    try {
        const response = await axios.post(url, { ...consultation }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error("Error adding consultation:", error);
        return { success: false, message: error.message };
    }
};

export const updateConsultationByID = async (consultationID, consultationInfo) => {
    const endPoint = `api/consultations/update/${consultationID}`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axios.put(url, { ...consultationInfo });
        return response.data;
    } catch (error) {
        console.error("Error updating consultations:", error);
        return { success: false, message: error.message };
    }
};

export const getConsultationByID = async (consultationID) => {
    const endPoint = `api/consultations/${consultationID}`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching consultation", error);
        return { success: false, message: error.message };
    }
};
export const addTraitement = async (traitement) => {
    const endPoint = `api/traitements`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axios.post(url, { ...traitement });
        return response.data;
    } catch (error) {
        console.error("Error adding Traitement:", error);
        return { success: false, message: error.message };
    }
};
export const addDiagnostic = async (diagnostic) => {
    const endPoint = `api/diagnostics`;
    const url = Backend_URL + endPoint;
    console.log(diagnostic)
    try {
        const response = await axios.post(url, { ...diagnostic });
        return response.data;
    } catch (error) {
        console.error("Error adding diagnostic:", error);
        return { success: false, message: error.message };
    }
};
