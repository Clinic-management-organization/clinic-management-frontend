import axiosInstance from "./axiosInstance";

const Backend_URL = "http://127.0.0.1:8080/";

export const getAllMedecins = async () => {
    const endPoint = `api/medecins`;
    const url = Backend_URL + endPoint;
    const response = await axiosInstance
      .get(url)
      .then((res) => {

        return  res.data ;
      })
      .catch((err) => {
        console.log("login err auth :", err);
        return { success: false, status: "res.status", message: err };
      });
    return response;
  };

export const deleteMedecinByID = async (medecinID) => {
    const endPoint = `api/medecins/delete/${medecinID}`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axiosInstance.delete(url);
        return response.data;
    } catch (error) {
        console.error("Error deleting medecin:", error);
        return { success: false, message: error.message };
    }
};

export const addMedecin = async (medecin) => {
    const endPoint = `api/medecins`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axiosInstance.post(url, { ...medecin });
        return response.data;
    } catch (error) {
        console.error("Error adding medecin:", error);
        return { success: false, message: error.message };
    }
};

export const updateMedecinByID = async (medecinID, medecinInfo) => {
    const endPoint = `api/medecins/update/${medecinID}`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axiosInstance.put(url, { ...medecinInfo });
        return response.data;
    } catch (error) {
        console.error("Error updating medecin:", error);
        return { success: false, message: error.message };
    }
};

export const getMedecinByID = async (medecinID) => {
    const endPoint = `api/medecins/${medecinID}`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching medecin:", error);
        return { success: false, message: error.message };
    }
};
