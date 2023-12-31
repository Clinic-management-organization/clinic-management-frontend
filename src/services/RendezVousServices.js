import axios from "axios";

const Backend_URL = "http://127.0.0.1:8080/";

export const searchRendezVous = async (searchParams) => {
  const endPoint = `api/rendezvous/search`;
  const url = Backend_URL + endPoint;

  try {
    const response = await axios.get(url, { params: searchParams });
    return response.data;
  } catch (error) {
    console.error("Error fetching rendez-vous:", error);
    return { success: false, message: error.message };
  }
};

export const getAllRendezVous = async () => {
    const endPoint = `api/rendezvous`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching rendez-vous:", error);
        return { success: false, message: error.message };
    }
};

export const getStatRendezVous = async () => {
    const endPoint = `api/rendezvous/count-by-month`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching rendez-vous:", error);
        return { success: false, message: error.message };
    }
}; 

export const deleteRendezVousByID = async (rendezVousID) => {
    const endPoint = `api/rendezvous/delete/${rendezVousID}`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.error("Error deleting rendez-vous:", error);
        return { success: false, message: error.message };
    }
};
export const addRendezVous = async (rendezVous) => {
    const endPoint = `api/rendezvous`;
    const url = Backend_URL + endPoint;
    console.log("rendezVous",rendezVous)

    try {
        const response = await axios.post(url, {...rendezVous} ,
          {headers: {
            'Content-Type': 'application/json',
          },

        });
        return response.data;
    } catch (error) {
        console.error("Error adding rendez-vous:", error);
        return { success: false, message: error.message };
    }
};

export const addRendezVousByDossierId = async (dossierID, rendezVous) => {
    // Ajoute l'état du rendez-vous à "CONFIRMEE"
    rendezVous.etatRendezVous = "CONFIRMEE";

    const endPoint = `api/rendezvous/add-to-dossier/${dossierID}`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axios.post(
            url,
            { ...rendezVous },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error adding rendez-vous:", error);
        return { success: false, message: error.message };
    }
};

export const updateStatusRendezVousByID = async (id, etat) => {
    const endPoint = `api/rendezvous/updateEtat/${id}`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axios.put (url, etat
            ,{headers: {
                'Content-Type': 'application/json',
              },})
            ;
        console.log(response.data); // Log de la réponse
        return response.data;
    } catch (error) {
        console.error("Error updating rendez-vous:", error);
        return { success: false, message: error.message };
    }
};
export const updateRendezVousByID = async (id, rendezVous) => {
    const endPoint = `api/rendezvous/update/${id}`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axios.put(url, { ...rendezVous });
        console.log(response.data); // Log de la réponse
        return response.data;
    } catch (error) {
        console.error("Error updating rendez-vous:", error);
        return { success: false, message: error.message };
    }
};
export const getRendezVousByID = async (rendezVousID) => {
    const endPoint = `api/rendezvous/${rendezVousID}`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching rendez-vous:", error);
        return { success: false, message: error.message };
    }
};
export const getRendezVousByMedecinID = async (medecinId) => {
    const endPoint = `api/rendezvous/medecin/${medecinId}`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching rendez-vous:", error);
        return { success: false, message: error.message };
    }
};
export const getRendezVousByPatientID = async (patientId) => {
    const endPoint = `api/rendezvous/patient/${patientId}`;
    const url = Backend_URL + endPoint;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching rendez-vous:", error);
        return { success: false, message: error.message };
    }
};
