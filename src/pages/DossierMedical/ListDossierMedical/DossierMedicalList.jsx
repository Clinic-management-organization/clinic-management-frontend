import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { format } from "date-fns";
import {
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import ListTraitement from "../ListTraitement";
import ListDiagnostic from "../ListDiagnostic";
import { useNavigate } from "react-router-dom";
import { getAllDossiersMedicaux, getDossierMedicalByPatientID } from "../../../services/DossierMedicalServices";

const DossierMedicalList = () => {
  const navigate = useNavigate();
  const [dossiersMedicaux, setDossiersMedicaux] = useState([{}]);
  const [expanded, setExpanded] = useState(false);
  const [openTraitementModal, setOpenTraitementModal] = useState(false);
  const [selectedTraitement, setSelectedTraitement] = useState([]);
  const [openDiagnosticModal, setOpenDiagnosticModal] = useState(false);
  const [selectedDiagnostic, setSelectedDiagnostic] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"))?.user;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Appel du service pour récupérer la liste des dossiers médicaux
        let dossiersMedicauxData;
        if(user?.authorities[0]?.authority=="USER")
        {
           dossiersMedicauxData = await getDossierMedicalByPatientID(user?.patient?.id);

        }
        else {
           dossiersMedicauxData = await getAllDossiersMedicaux();
        }
        console.log("dossiersMedicauxData", dossiersMedicauxData);
        // Vérifier si dossiersMedicauxData est un tableau
        if (Array.isArray(dossiersMedicauxData)) {
         
          //user?.patient?.id
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
  const handleOpenTraitementModal = (traitements) => {
    setSelectedTraitement(traitements);
    setOpenTraitementModal(true);
  };

  const handleCloseTraitementModal = () => {
    setOpenTraitementModal(false);
    setSelectedTraitement([]);
  };

  const handleOpenDiagnosticModal = (diagnostics) => {
    setSelectedDiagnostic(diagnostics);
    setOpenDiagnosticModal(true);
  };

  const handleCloseDiagnosticModal = () => {
    setOpenDiagnosticModal(false);
    setSelectedDiagnostic([]);
  };
  const addConsultation = (dossierId) => {
    console.log(`Éditer le dossier médical avec l'ID : ${dossierId}`);
    // Naviguer vers la page d'édition de consultation
    navigate(`/consultations/add-to-dossier/${dossierId}`);
  };
  const addRDV = (dossierId) => {
    navigate(`/rendez_vous/${dossierId}`);
  };

  return (
    <Container className="container" component="main" style={{ width: "70%" }}>
      <Typography component="h1" variant="h5" style={{ marginBottom: "10%" }}>
        Liste Des Dossiers Médicaux
      </Typography>

      {
        user?.authorities[0]?.authority=="ADMIN" &&
        <div className="head">
        <Button
          className="btn-grad"
          variant="contained"
          onClick={() => {
            navigate(`add`);
          }}
        >
          Ajouter
        </Button>
      </div>
      }
     
      {Array.isArray(dossiersMedicaux) ? (
        dossiersMedicaux?.map((dossier, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index + 1}`}
            onChange={handleChange(`panel${index + 1}`)}
            style={{ marginBottom: "1%" }}
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
                Crée Le {formatDate(dossier.dateCreation)}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Typography>{`Observation: ${dossier?.observation}`}</Typography>
              <Typography>
                {`Modifié Le : ${formatDate(dossier?.dateMiseAJour)}`}
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Consultations :
              </Typography>
              <List style={{ marginLeft: "5%" }}>
                {dossier.consultations?.map((consultation) => (
                  <React.Fragment key={consultation.id}>
                    <ListItem>
                      <ListItemText
                        // primary={`ID: ${consultation.id}`}
                        secondary={
                          <React.Fragment>
                            <Typography
                              variant="body2"
                              color="textPrimary"
                            >{`Prix: ${consultation.prix}`}</Typography>
                            <Typography
                              variant="body2"
                              color="textPrimary"
                            >{`Synthèse: ${consultation.synthese}`}</Typography>
                          </React.Fragment>
                        }
                      />
                      <Button
                        onClick={() =>
                          handleOpenDiagnosticModal(consultation?.diagnostics)
                        }
                      >
                        Diagnostics
                      </Button>
                      <Button
                        onClick={() =>
                          handleOpenTraitementModal(consultation?.traitements)
                        }
                      >
                        Traitements
                      </Button>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>

              {/* Modal pour afficher la liste des traitements */}
              <ListDiagnostic
                open={openDiagnosticModal}
                handleClose={handleCloseDiagnosticModal}
                diagnostics={selectedDiagnostic}
              />
              <ListTraitement
                open={openTraitementModal}
                handleClose={handleCloseTraitementModal}
                traitements={selectedTraitement}
              />
              {/* Bouton Edit en bas à droite */}
              {
        user?.authorities[0]?.authority=="ADMIN" &&
              <Button
                className="btn-g"
                onClick={() => addConsultation(dossier?.id)}
                variant="contained"
                color="primary"
                style={{ marginTop: "auto", alignSelf: "flex-end" }}
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: "rgb(100,149,237)",
                  "&:hover": { backgroundColor: "hsl(18, 100%, 66%)" },
                }}
              >
                Ajouter Consultation
              </Button>
}
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Rendez-vous :
              </Typography>
              <List style={{ marginLeft: "2%" }}>
                {dossier.rdvs?.map((rdv, index) => (
                  <React.Fragment key={rdv.id}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body1"
                            style={{ fontWeight: "bold" }}
                          >{`Rendez-Vous: ${index + 1}`}</Typography>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              style={{ marginLeft: "3%" }}
                              variant="body2"
                              color="textPrimary"
                            >
                              {" "}
                              {`État: ${rdv?.etatRendezVous}`}
                            </Typography>
                            <Typography
                              style={{ marginLeft: "3%" }}
                              variant="body2"
                              color="textPrimary"
                            >{`Date: ${format(
                              new Date(rdv.dateRendezVous),
                              "yyyy-MM-dd"
                            )}`}</Typography>
							<Typography
                              style={{ marginLeft: "3%" }}
                              variant="body2"
                              color="textPrimary"
                            >
                              {`Medecin: ${rdv?.medecin?.nom} ${rdv?.medecin?.prenom}`}
                            </Typography>
							<Typography
                              style={{ marginLeft: "3%" }}
                              variant="body2"
                              color="textPrimary"
                            >
                              {`Specialité: ${rdv?.medecin?.specialite}`}
                            </Typography>
                            <Typography
                              style={{ marginLeft: "3%" }}
                              variant="body2"
                              color="textPrimary"
                            >
                              {`Motif: ${rdv.motif}`}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>

              {user?.authorities[0]?.authority=="ADMIN" &&
              <Button
                className="btn-g"
                onClick={() => addRDV(dossier?.id)}
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: "rgb(100,149,237)",
                  "&:hover": { backgroundColor: "hsl(18, 100%, 66%)" },
                }}
                style={{ marginTop: "auto", alignSelf: "flex-end" }}
              >
                Ajouter Rendez-vous
              </Button>

              }
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
