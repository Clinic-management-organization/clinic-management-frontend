import React, { useState, useEffect } from 'react';
import {
    FormControl,
   
    Select,
    Typography,
  
} from '@mui/material';

import Schedule from './Schedule';
import {getRendezVousByMedecinID} from '../../services/RendezVousServices'
import {getAllMedecins} from '../../services/MedecinServices'

const RendezVousList = () => {
    // State pour stocker les données de spécialités, médecins et disponibilité
    const specialites = [ 'DERMATOLOGIE', , 'GYNECOLOGIE', 'OPHTALMOLOGIE'];
    const [medecins, setMedecins] = useState([]);
    const [selectedSpecialite, setSelectedSpecialite] = useState('');
    const [selectedMedecin, setSelectedMedecin] = useState(null);

    const [rdvs, setRdvs] = useState([])

    const formattedRdvsToData = (res) => {
             // Reformater les données avant de les stocker dans le state
             const formattedRdvs = res.map((rdv) => ({
               Id: rdv.id,
               Subject: rdv.motif || 'Indisponible', // Remplacez 'Default Subject' par une valeur par défaut si motif est null
               StartTime: new Date(rdv.dateRendezVous),
               EndTime: new Date(new Date(rdv.dateRendezVous).getTime() + 60 * 60 * 1000),
             }));
             return formattedRdvs
    }

    useEffect(() => {
      const fetchData = async () => {
          try {
           // Appel à votre API pour récupérer les rendez-vous
           if (selectedMedecin) {
              const res = await getRendezVousByMedecinID(selectedMedecin.id);
              // Mettre à jour le state avec les données formatées
              setRdvs(formattedRdvsToData(res));
              console.log("hani lenaaa", selectedMedecin)
            }
         } catch (error) {
           console.error('Erreur lors de la récupération des rendez-vous', error);
         }
        };
        fetchData();
      }, [selectedMedecin]);

    useEffect(() => {
        // Code pour récupérer les données initiales depuis le backend
        const fetchMedecins = async () => {
          const res = await getAllMedecins();
          // If a specialty is selected, filter the doctors based on the specialty
           const filteredMedecins = selectedSpecialite
             ? res.filter(medecin => medecin.specialite === selectedSpecialite)
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
      const medecin = medecins.find(medecin => medecin.id == selectedMedecinId);
      console.log("le9it medecin", medecin)
      setSelectedMedecin(medecin);
    };

    return (

        <div style={{ marginLeft: '10%' ,marginTop: '3%' }}>
             <Typography component="h1" variant="h5" style={{ marginBottom: '3%' }}>
            Planification des Rendez-Vous
          </Typography>
          <div style={{display: "flex", gap:"10%", marginBottom: "25px"}}>
              <FormControl >
              <Select native label="Spécialité"
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

              <FormControl >
                  <Select native label="Médecin"
                  onChange={handleMedecinChange}
                  value={selectedMedecin ? selectedMedecin.id : ''}
                  >
                  <option value="">Tous les médecins</option>
                  {medecins?.map((medecin, index) => (
                      <option key={index} value={medecin.id}>
                      {`${medecin.nom} ${medecin.prenom}` }
                      </option>
                  ))}
                  </Select>
              </FormControl>
          </div>
            <Schedule rdvs={rdvs} setRdvs={setRdvs} />
        </div>

    );
};

export default RendezVousList;
