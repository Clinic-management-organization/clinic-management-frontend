import * as React from 'react';
import { useEffect, useState } from "react";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import {getAllRendezVous, addRendezVous} from '../../services/RendezVousServices'

const Schedule = ({rdvs, setRdvs}) => {

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
      <ScheduleComponent height='550px' width="90%" selectedDate={new Date()} eventSettings={eventSettings} actionComplete={handleActionComplete}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  )
};

export default Schedule ;
