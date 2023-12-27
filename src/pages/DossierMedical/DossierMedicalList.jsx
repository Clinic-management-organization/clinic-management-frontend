import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getAllDossiersMedicaux } from "../../services/DossierMedicalServices";
import {
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { format } from "date-fns";
import ListTraitement from "./ListTraitement";
import ListDiagnostic from "./ListDiagnostic";
import { useNavigate } from "react-router-dom";

const DossierMedicalList = () => {
  const navigate = useNavigate();
  const [dossiersMedicaux, setDossiersMedicaux] = useState([{}]);
  const [expanded, setExpanded] = useState(false);
  const [openTraitementModal, setOpenTraitementModal] = useState(false);
  const [selectedTraitement, setSelectedTraitement] = useState([]);
  const [openDiagnosticModal, setOpenDiagnosticModal] = useState(false);
  const [selectedDiagnostic, setSelectedDiagnostic] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Appel du service pour récupérer la liste des dossiers médicaux
        const dossiersMedicauxData = await getAllDossiersMedicaux();
        console.log("dossiersMedicauxData", dossiersMedicauxData);
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
  const handleEdit = (dossierId) => {
    console.log(`Éditer le dossier médical avec l'ID : ${dossierId}`);
    // Naviguer vers la page d'édition de consultation
    navigate(`/consultations/add/${dossierId}`);
  };

  return (
    <Container className="container" component="main" style={{ width: "70%" }}>
      <Typography component="h1" variant="h5" style={{ marginBottom: "10%" }}>
        Les Dossiers Médicaux
      </Typography>
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
                {dossier?.dateCreation}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Typography>
                {`Date de Mise à Jour: ${dossier?.dateMiseAJour}`}
              </Typography>
              <Typography>{`Observation: ${dossier?.observation}`}</Typography>

              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Consultations :
              </Typography>
              <List style={{ marginLeft: "5%" }}>
                {dossier.consultations?.map((consultation) => (
                  <React.Fragment key={consultation.id}>
                    <ListItem>
                      <ListItemText
                        primary={`ID: ${consultation.id}`}
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
               <Button
                onClick={() => handleEdit(dossier?.id)}
                variant="contained"
                color="primary"
                style={{ marginTop: "auto", alignSelf: "flex-end" }}
              >
                Ajouter Consultation
              </Button>

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
                              {`État: ${rdv.etatRendezVous}`}
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
