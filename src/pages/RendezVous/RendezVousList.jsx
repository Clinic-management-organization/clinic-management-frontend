import React, { useState, useEffect } from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    Typography,
    Grid,
    TextField,
    Container
} from '@mui/material';
import Appointment from './Appointment';
import Schedule from './Schedule';
const RendezVousList = () => {
    // State pour stocker les données de spécialités, médecins et disponibilité
    const [specialites, setSpecialites] = useState(["specialite1", "specialite2"]);
    const [medecins, setMedecins] = useState([]);
    const [calendrier, setCalendrier] = useState([]);
    const [heuresDisponibles,setHeuresDisponibles] =useState([]);
    const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const heuresTravail = Array.from({ length: 10 }, (_, i) => `${i + 8}:00`);

    // Effet pour charger les données initiales
    useEffect(() => {
        // Code pour récupérer les données initiales depuis le backend
        // Remplacez ces appels factices par des appels réels à votre API
        const fetchSpecialites = async () => {
            // Code pour récupérer les spécialités
            setSpecialites(['Cardiologue', 'Dermatologue', 'Généraliste']);
        };

        const fetchMedecins = async () => {
            // Code pour récupérer les médecins
            setMedecins(['Médecin 1', 'Médecin 2', 'Médecin 3']);
        };

        const fetchCalendrier = async () => {
            // Code pour récupérer la disponibilité
            // Cette partie dépend de la logique de votre backend
            setCalendrier(/* données du calendrier */);
        };

        fetchSpecialites();
        fetchMedecins();
        fetchCalendrier();
    }, []);

    return (

        <div style={{ marginLeft: '5%' ,marginTop: '3%' }}>
             <Typography component="h1" variant="h5" style={{ marginBottom: '3%' }}>
            Planification des Rendez-Vous
          </Typography>
          <Schedule />
     <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>

     <div style={{ marginRight: '30px'}}>
         <FormControl fullWidth margin="normal" style={{ marginRight: '16px', width: '100%' ,marginBottom:'8%'}}>
        <InputLabel htmlFor="specialite">Spécialité :</InputLabel>
        <Select
        native
        label="Spécialité"
        inputProps={{
            name: 'specialite',
            id: 'specialite',
        }}
        >
        {specialites?.map((specialite, index) => (
            <option key={index} value={specialite}>
            {specialite}
            </option>
        ))}
        </Select>
            </FormControl>

    <FormControl fullWidth margin="normal" style={{ marginRight: '16px', width: '100%' ,marginBottom:'10%'}}>
        <InputLabel htmlFor="medecin">Médecin :</InputLabel>
        <Select
        native
        label="Médecin"
        inputProps={{
            name: 'medecin',
            id: 'medecin',
        }}
        >
        {medecins?.map((medecin, index) => (
            <option key={index} value={medecin}>
            {medecin}
            </option>
        ))}
        </Select>
    </FormControl>
                <Grid item xs={12} sm={6} style={{ marginRight: '16px', width: '100%' ,marginBottom:'8%'}}>
                  <TextField
                    label="semaine rendez_vous"
                    name="dateNaissance"
                    type="date"


                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                    </Grid>
        </div>
        <div>

     <Appointment/>
        </div>
        </div>
        </div>

    );
};

export default RendezVousList;
