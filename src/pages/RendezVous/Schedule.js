import * as React from 'react';
import { useEffect, useState } from "react";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { getAllRendezVous, addRendezVous } from '../../services/RendezVousServices'

const Schedule = ({ rdvs, setRdvs, medecin }) => {

  // const formattedRdvsToData = (res) => {
  //          // Reformater les données avant de les stocker dans le state
  //          const formattedRdvs = res.map((rdv) => ({
  //            Id: rdv.id,
  //            Subject: rdv.motif || 'Indisponible', // Remplacez 'Default Subject' par une valeur par défaut si motif est null
  //            StartTime: new Date(rdv.dateRendezVous),
  //            EndTime: new Date(new Date(rdv.dateRendezVous).getTime() + 60 * 60 * 1000),
  //          }));
  //          return formattedRdvs
  // }
  const formattedDataToRdv = (res) => {
    // Reformater les rendezVous avant de les stocker dans la base
    const formattedRdvs = res?.map((rdv) => ({
      id: rdv.Id,
      motif: rdv.Subject || 'Indosponible',
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
    if (
      (args.requestType === 'eventCreated' || args.requestType === 'eventChanged') &&
      Array.isArray(args.data) &&
      args.data.length > 0
    ) {
      const formattedRdv = formattedDataToRdv(args.data); // Prenez le premier élément du tableau args.data
      console.log('formattedRdv', formattedRdv); // Ajoutez ce log pour déboguer
      const addedRdv = await addRendezVous(formattedRdv);
      console.log('addedRdv', addedRdv); // Ajoutez ce log pour déboguer
      // Mise à jour du state avec le rendez-vous ajouté
      setRdvs([...rdvs, addedRdv]);
    } else if (args.requestType === 'eventRemoved' && Array.isArray(args.data) && args.data.length > 0) {
      const removedRdvId = args.data[0]?.Id;
      if (removedRdvId) {
        // Filtrer les rendez-vous pour exclure celui qui a été supprimé
        const updatedRdvs = rdvs.filter((rdv) => rdv.Id !== removedRdvId);
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
