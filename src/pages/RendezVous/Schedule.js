import * as React from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { addRendezVous, addRendezVousByDossierId, deleteRendezVousByID, updateRendezVousByID } from '../../services/RendezVousServices'
import { useParams } from 'react-router-dom';

const Schedule = ({ rdvs, setRdvs, medecin }) => {
  const { dossierID } = useParams();

  const formattedDataToRdv = (res) => {
    // Reformater les rendezVous avant de les stocker dans la base
    const formattedRdvs = res?.map((rdv) => ({
      id: rdv.Id,
      motif: rdv.Subject || 'Indosponible',
      etatRDV : "CONFIRMEE",
      dateRendezVous: new Date(rdv.StartTime),
      remarques: rdv?.Description,
      patient: rdv.patient || {
        id: 1,
        nom: "Ameni",
        prenom: "Selmi",
        dateNaissance: 1703804400000,
        sexe: "F",
        adresse: "123oued ellil St",
        tel: "123456789",
        email: "john.doe@example.com",
        login: "john.doe",
        motDePasse: "password",
        role: "PATIENT",
        situationFamilliale: "single",
        assuranceMedicale: null
      },
      medecin: rdv.medecin || medecin,
    }));

    return formattedRdvs;
  };


  const handleActionComplete = async (args) => {
    //add a rendez vous
    if (args.requestType === 'eventCreated')  {
      const formattedRdv = formattedDataToRdv(args.data);
      console.log('formattedRdv', formattedRdv[0]); // Ajoutez ce log pour déboguer
      const addedRdv = await addRendezVousByDossierId(dossierID,formattedRdv[0]);
      console.log('addedRdv', addedRdv); // Ajoutez ce log pour déboguer
      // Mise à jour du state avec le rendez-vous ajouté
      setRdvs([...rdvs, formattedRdv[0]]);
    }
    //update a rendez vous
    if (args.requestType === 'eventChanged'){
      const formattedRdv = formattedDataToRdv(args.data);
      console.log('formattedRdv à modifer', formattedRdv[0]);
      const updateRendezVous = await updateRendezVousByID(formattedRdv[0]?.id, formattedRdv[0]);
      const updatedRdvs = rdvs.filter((rdv) => rdv.Id !== formattedRdv[0]?.id);
      console.log('updateRendezVous', updateRendezVous);
      // Mise à jour du state avec le rendez-vous ajouté
      setRdvs([...updatedRdvs, formattedRdv[0]]);
    }
    //delete a rendez vous
    if (args.requestType === 'eventRemoved') {
      const removedRdvId = args.data[0]?.Id;
      console.log('removedRdvId à supprimer', removedRdvId); // Ajoutez ce log pour déboguer
      if (removedRdvId) {
        const updatedRdvs = rdvs.filter((rdv) => rdv.Id !== removedRdvId);
        await deleteRendezVousByID(removedRdvId)
        setRdvs(updatedRdvs);
      }
    }
  };


  const eventSettings = { dataSource: rdvs }

  return (
    <div>
      <ScheduleComponent height='550px' width="90%" selectedDate={new Date()} eventSettings={eventSettings} actionComplete={handleActionComplete}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  )
};

export default Schedule;
