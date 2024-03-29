import React, { useState, useEffect } from "react";
import { Container, FormControl, Select, Typography } from "@mui/material";

import Schedule from "./Schedule";
import { getRendezVousByMedecinID } from "../../services/RendezVousServices";
import { getAllMedecins } from "../../services/MedecinServices";
import { getAllPatients } from "../../services/PatientsServices";

const RendezVousList = () => {
  // State pour stocker les données de spécialités, médecins et disponibilité
  const specialites = ["DERMATOLOGIE", , "GYNECOLOGIE", "OPHTALMOLOGIE"];
  const [medecins, setMedecins] = useState([]);
  const [selectedSpecialite, setSelectedSpecialite] = useState("");
  const [selectedMedecin, setSelectedMedecin] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"))?.user;

  const [rdvs, setRdvs] = useState([]);
  const [patients, setPatients] = useState([])
  const formattedRdvsToData = (res) => {
    // Reformater les données avant de les stocker dans le state
    const formattedRdvs = res.map((rdv) => ({
      Id: rdv.id,
      Subject: rdv.motif || "Indisponible", // Remplacez 'Default Subject' par une valeur par défaut si motif est null
      Description : rdv?.remarques,
	  StartTime: new Date(rdv.dateRendezVous),
      EndTime: new Date(
        new Date(rdv.dateRendezVous).getTime() + 60 * 60 * 1000
      ),
    }));
    return formattedRdvs;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
		  
        // Appel à votre API pour récupérer les rendez-vous
        if (selectedMedecin) {
          const res = await getRendezVousByMedecinID(selectedMedecin.id);
          // getRendezVousByPatientID
          // Mettre à jour le state avec les données formatées
          setRdvs(formattedRdvsToData(res));
		            console.log("hani lenaaa", selectedMedecin);

//		  const formattedAppointments = formattedRdvsToData(medecin.harraire);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous", error);
      }
    };
    fetchData();
  }, [selectedMedecin]);

  useEffect(() => {
    // Code pour récupérer les données initiales depuis le backend
    const fetchMedecins = async () => {
		if(user?.authorities[0]?.authority=="ADMIN"){
			const pats = await getAllPatients();
			setPatients(pats);
		}
      const res = await getAllMedecins();
      // If a specialty is selected, filter the doctors based on the specialty
      const filteredMedecins = selectedSpecialite
        ? res.filter((medecin) => medecin.specialite === selectedSpecialite)
        : res;
      setMedecins(filteredMedecins);
    };
    fetchMedecins();
  }, [selectedSpecialite]);

  const handleSpecialiteChange = (event) => {
    setSelectedSpecialite(event.target.value);
    setSelectedMedecin(null); // Reset the selected doctor when changing the specialty
  };

  const handleMedecinChange = async (event) => {
    const selectedMedecinId = event.target.value;
    const medecin = medecins.find(
      (medecin) => medecin.id == selectedMedecinId
    );
    setSelectedMedecin(medecin);
  };
  const handlePatientChange = async (event) => {
    const selectedPatientId = event.target.value;
    const patient = patients.find(
      (patient) => patient.id == selectedPatientId
    );
    setSelectedPatient(patient);
  };

  return (
    <Container className="container" component="main" style={{ width: "70%" }}>
      <Typography component="h1" variant="h5" style={{ marginBottom: "3%" }}>
        Planification des Rendez-Vous
      </Typography>
      <div style={{ display: "flex", gap: "10%", marginBottom: "25px" }}>
        <FormControl>
          <Select
            native
            label="Spécialité"
            onChange={handleSpecialiteChange}
            value={selectedSpecialite}
          >
            <option value="">Toutes les spécialités</option>
            {specialites?.map((specialite, index) => (
              <option key={index} value={specialite}>
                {specialite}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <Select
            native
            label="Médecin"
            onChange={handleMedecinChange}
            value={selectedMedecin ? selectedMedecin.id : ""}
          >
            <option value="">Tous les médecins</option>
            {medecins?.map((medecin, index) => (
              <option key={index} value={medecin.id}>
                {`${medecin.nom} ${medecin.prenom}`}
              </option>
            ))}
          </Select>
        </FormControl>
		{user?.authorities[0]?.authority=="ADMIN" && 
		<FormControl>
          <Select
            native
            label="¨Patients"
            onChange={handlePatientChange}
            value={selectedPatient ? selectedPatient.id : ""}
          >
            <option value="">Tous les patients</option>
            {patients?.map((medecin, index) => (
              <option key={index} value={medecin.id}>
                {`${medecin.nom} ${medecin.prenom}`}
              </option>
            ))}
          </Select>
        </FormControl>
		}
      </div>
      <Schedule rdvs={rdvs} setRdvs={setRdvs} medecin={selectedMedecin} patient={selectedPatient} />
    </Container>
  );
};

export default RendezVousList;
