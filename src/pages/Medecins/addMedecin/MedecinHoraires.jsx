// MedecinHoraires.js

import React from 'react';
import HoraireForm from './HoraireForm'; // Assurez-vous d'importer correctement le composant

const MedecinHoraires = ({horaires, setHoraires}) => {

  const addHoraire = (horaire) => {
    // Vous pouvez effectuer ici une validation supplémentaire si nécessaire
    setHoraires([...horaires, horaire]);
    console.log("horaire", horaires);
  };

  return (
    <div>
      <h2>Ajouter Horaires de Travail</h2>
      <HoraireForm onClick={addHoraire} />
      <div>
        <h3>Horaires Ajoutés :</h3>
        <ul>
          {horaires?.map((horaire, index) => (
            <li key={index}>
              Jour: {horaire.dayOfWeek}, Début: {horaire.startTime}, Fin: {horaire.endTime}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MedecinHoraires;
