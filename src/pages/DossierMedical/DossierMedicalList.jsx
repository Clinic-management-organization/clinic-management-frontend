import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getAllDossiersMedicaux } from "../../services/DossierMedicalServices";
import { Container } from "@mui/material";
const DossierMedicalList = () => {
  const [dossiersMedicaux, setDossiersMedicaux] = useState([{}]);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Appel du service pour récupérer la liste des dossiers médicaux
        const dossiersMedicauxData = await getAllDossiersMedicaux();

        // Vérifier si dossiersMedicauxData est un tableau
        if (Array.isArray(dossiersMedicauxData)) {
          setDossiersMedicaux(dossiersMedicauxData);
        } else {
          console.error(
            "La réponse du service n'est pas un tableau :",
            dossiersMedicauxData
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des dossiers médicaux :",
          error
        );
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="container" component="main" maxWidth="xs">
         <Typography component="h1" variant="h5" style={{ marginBottom: '10%' }}>
            Les Dossiers Médicaux
          </Typography>
      {Array.isArray(dossiersMedicaux) ? (
        dossiersMedicaux.map((dossier, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index + 1}`}
            onChange={handleChange(`panel${index + 1}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}bh-content`}
              id={`panel${index + 1}bh-header`}
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Dossier Médical {index + 1}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {dossier.dateCreation}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {`Date de Mise à Jour: ${dossier.dateMiseAJour}`}
              </Typography>
              <Typography>{`Observation: ${dossier.observation}`}</Typography>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <p>Les données des dossiers médicaux ne sont pas valides.</p>
      )}
    </Container>
  );
};
export default DossierMedicalList;
