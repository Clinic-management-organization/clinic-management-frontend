import * as React from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { addRendezVous, addRendezVousByDossierId, deleteRendezVousByID, updateRendezVousByID } from '../../services/RendezVousServices'
import { useParams } from 'react-router-dom';

const Schedule = ({ rdvs, setRdvs, medecin, patient }) => {
  const { dossierID } = useParams();
  const user = JSON.parse(localStorage.getItem("user"))?.user;

  const formattedDataToRdv = (res) => {
    // Reformater les rendezVous avant de les stocker dans la base
    const formattedRdvs = res?.map((rdv) => ({
      id: rdv.Id,
      motif: rdv.Subject || 'Indosponible',
      etatRDV : "CONFIRMEE",
      dateRendezVous: new Date(rdv.StartTime),
      remarques: rdv?.Description,
      patient: patient || user?.patient,
      medecin: medecin,
    }));

    return formattedRdvs;
  };


  const handleActionComplete = async (args) => {
    //add a rendez vous
    if (args.requestType === 'eventCreated')  {
      const formattedRdv = formattedDataToRdv(args.data);
      const addedRdv = await addRendezVousByDossierId(dossierID,formattedRdv[0]);
      // Mise à jour du state avec le rendez-vous ajouté
      setRdvs([...rdvs, formattedRdv[0]]);
    }
    //update a rendez vous
    if (args.requestType === 'eventChanged'){
      const formattedRdv = formattedDataToRdv(args.data);
      const updateRendezVous = await updateRendezVousByID(formattedRdv[0]?.id, formattedRdv[0]);
      const updatedRdvs = rdvs.filter((rdv) => rdv.Id !== formattedRdv[0]?.id);
      // Mise à jour du state avec le rendez-vous ajouté
      setRdvs([...updatedRdvs, formattedRdv[0]]);
    }
    //delete a rendez vous
    if (args.requestType === 'eventRemoved') {
      const removedRdvId = args.data[0]?.Id;
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
