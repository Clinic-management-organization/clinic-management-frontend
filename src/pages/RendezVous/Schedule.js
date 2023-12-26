import * as React from 'react';
import { useEffect, useState } from "react";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import {getAllRendezVous, addRendezVous} from '../../services/RendezVousServices'

const Schedule = () => {
  const [rdvs, setRdvs] = useState([])

    const formattedRdvsToData = (res) => {
             // Reformater les données avant de les stocker dans le state
             const formattedRdvs = res.map((rdv) => ({
               Id: rdv.id,
               Subject: rdv.motif || 'Indosponible', // Remplacez 'Default Subject' par une valeur par défaut si motif est null
               StartTime: new Date(rdv.dateRendezVous),
               EndTime: new Date(new Date(rdv.dateRendezVous).getTime() + 60 * 60 * 1000),
             }));
             return formattedRdvs
    }
    const formattedDataToRdv = (res) => {
             // Reformater les rendezVous avant de les stocker dans la base
             const formattedRdvs = res?.map((rdv) => ({
               id: rdv.Id,
               motif: rdv.Subject || 'Indosponible',
               dateRendezVous: new Date(rdv.StartTime),
               remarques: rdv?.Description
             }));
             return formattedRdvs
    }
  useEffect(() => {
    const fetchData = async () => {
      try {
       // Appel à votre API pour récupérer les rendez-vous
       const res = await getAllRendezVous();

       // Mettre à jour le state avec les données formatées
       setRdvs(formattedRdvsToData(res));
     } catch (error) {
       console.error('Erreur lors de la récupération des rendez-vous', error);
     }
    };
    fetchData();
  }, []);

  const handleActionComplete = async (args) => {
     if (args.requestType === 'eventCreated' || args.requestType === 'eventChanged') {
       const formattedRdv = formattedDataToRdv(args.data); // changed/ created new data are stocked in args.data
       await addRendezVous(formattedRdv)
       const formattedDatas = formattedDataToRdv(rdvs) ; // all the rendez vous
       console.log("formattedDatas", formattedDatas) ;
   }else if (args.requestType === 'eventRemoved') {
     const updatedRdvs = rdvs.filter(rdv => rdv.Id !== args.data[0].Id);
     setRdvs(updatedRdvs);
     const saveAllRdvs = formattedDataToRdv(rdvs)
     console.log("rdvs",saveAllRdvs)
    }
    };
  const eventSettings = { dataSource: rdvs }

  return(
    <div>
      <ScheduleComponent height='550px' selectedDate={new Date()} eventSettings={eventSettings} actionComplete={handleActionComplete}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  )
};

export default Schedule ;
