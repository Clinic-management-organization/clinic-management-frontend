import axiosInstance from "./axiosInstance";

const Backend_URL = "http://127.0.0.1:8080/";

export const searchPatients = async (searchCriteria) => {
  const endPoint = `api/patients/search`;
  const url = Backend_URL + endPoint;

  const response = await axiosInstance
    .get(url, { params: searchCriteria })
    .then((res) => {
      console.log("searchPatients from Backend:", res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("searchPatients error:", err);
      return { success: false, status: "res.status", message: err };
    });

  return response;
};

export const getAllPatients = async () => {
    const endPoint = `api/patients`;
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

export const deletePatientByID = async (patientID) => {
    const endPoint = `api/patients/delete/${patientID}`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axiosInstance.delete(url);
        return response.data;
    } catch (error) {
        console.error("Error deleting patient:", error);
        return { success: false, message: error.message };
    }
};

export const addPatient = async (patient) => {
    const endPoint = `api/patients`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axiosInstance.post(url, { ...patient });
        return response.data;
    } catch (error) {
        console.error("Error adding patient:", error);
        return { success: false, message: error.message };
    }
};

export const updatePatientByID = async (patientID, patientInfo) => {
    const endPoint = `api/patients/update/${patientID}`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axiosInstance.put(url, { ...patientInfo });
        console.log(response.data); // Log de la réponse
        return response.data;
    } catch (error) {
        console.error("Error updating patient:", error);
        return { success: false, message: error.message };
    }
};

export const getPatientByID = async (patientID) => {
    const endPoint = `api/patients/${patientID}`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching patient:", error);
        return { success: false, message: error.message };
    }
};
