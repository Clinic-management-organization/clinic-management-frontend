import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Avatar,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { ThemeProvider } from "@mui/system";
import {
  Article,
  PersonAddAlt1 as PersonAddAlt1Icon,
} from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";
import { addConsultation } from "../../services/ConsultationService";

const theme = {};

const ConsultationAdd = () => {
  const navigate = useNavigate();
  const { dossierID } = useParams();

  const [formData, setFormData] = useState({
    prix: "",
    synthese: "",
    traitements: [],
    diagnostics: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddDiagnostic = () => {
    if (
      formData.description &&
      formData.category &&
      formData.maladie &&
      formData.diagnosticConfirme
    ) {
      setFormData((prevData) => ({
        ...prevData,
        diagnostics: [
          ...prevData.diagnostics,
          {
            description: formData.description,
            category: formData.category,
            maladie: formData.maladie,
            diagnosticConfirme: formData.diagnosticConfirme,
          },
        ],
        description: "",
        category: "",
        maladie: "",
        diagnosticConfirme: "",
      }));
    }
  };

  const handleAddTraitement = () => {
    if (
      formData.medicament &&
      formData.dosage &&
      formData.instructions &&
      formData.startDate &&
      formData.endDate
    ) {
      setFormData((prevData) => ({
        ...prevData,
        traitements: [
          ...prevData.traitements,
          {
            medicament: formData.medicament,
            dosage: formData.dosage,
            instructions: formData.instructions,
            startDate: formData.startDate,
            endDate: formData.endDate,
          },
        ],
        medicament: "",
        dosage: "",
        instructions: "",
        startDate: "",
        endDate: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFormData = {
      ...formData,
      diagnostics: [...formData.diagnostics],
      traitements: [...formData.traitements],
    };

    addConsultation(dossierID, newFormData).then(() => {
      toast.success("Consultation est ajoutée avec succès !")
      navigate("/dossiersMedicaux");
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="container" component="main" maxWidth="xs">
        <Toaster />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "rgb(100,149,237)", width: 70, height: 70 }}
          >
            <Article style={{ width: 40, height: 40 }} />
          </Avatar>
          <Typography  component="h1" variant="h5">
            Ajouter une Consultation
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2} style={{ marginBottom: "2%" }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Prix"
                  name="prix"
                  value={formData.prix}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Synthèse"
                  name="synthese"
                  value={formData.synthese}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
            <Typography variant="h6">Ajouter Diagnostics</Typography>
            <Grid container spacing={2} style={{ marginBottom: "2%" }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Diagnostic Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Diagnostic Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginBottom: "2%" }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Diagnostic Maladie"
                  name="maladie"
                  value={formData.maladie}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Diagnostic Confirmé"
                  name="diagnosticConfirme"
                  value={formData.diagnosticConfirme}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
            className="btn-g"
              type="button"
              variant="contained"
              onClick={handleAddDiagnostic}
            >
              Ajouter Diagnostic
            </Button>
            {formData.diagnostics?.length > 0 ? (
              <div>
                <h3>Diagnostics Ajoutés :</h3>
                <ul>
                  {formData.diagnostics?.map((diagnostic, index) => (
                    <li key={index}>
                      <p>
                        <strong>Description:</strong> {diagnostic.description}
                      </p>
                      <p>
                        <strong>Catégorie:</strong> {diagnostic.category}
                      </p>
                      <p>
                        <strong>Maladie:</strong> {diagnostic.maladie}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div></div>
            )}

            <Typography variant="h6">Ajouter Traitements</Typography>
            <Grid container spacing={2} style={{ marginBottom: "2%" }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Traitement Medicament"
                  name="medicament"
                  value={formData.medicament}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Traitement Dosage"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} style={{ marginBottom: "2%" }}>
              <TextField
                label="Traitement Instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
              />
            </Grid>
            <Grid container spacing={2} style={{ marginBottom: "2%" }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="date"
                  label="Date Début"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date Fin"
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Button
            className="btn-g"
              type="button"
              variant="contained"
              onClick={handleAddTraitement}
            >
              Ajouter Traitement
            </Button>
            {formData.traitements?.length > 0 ? (
              <div>
                <h3>Traitements Ajoutés :</h3>
                <ul>
                  {formData.traitements?.map((traitement, index) => (
                    <li key={index}>
                      <p>
                        <strong>Médicaments:</strong> {traitement.medicament}
                      </p>
                      <p>
                        <strong>Dosage:</strong> {traitement.dosage}
                      </p>
                      <p>
                        <strong>Instructions:</strong> {traitement.instructions}
                      </p>
                      <p>
                        <strong>Début:</strong> {traitement.startDate}
                      </p>
                      <p>
                        <strong>Fin:</strong> {traitement.endDate}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div></div>
            )}

            <Grid container spacing={2} style={{ marginBottom: "2%" }}>
              <Grid item xs={12} sm={6}>
                <Button
                  className="btn-g"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: "rgb(131,58,180)",
                    "&:hover": { backgroundColor: "hsl(18, 100%, 66%)" },
                  }}
                >
                  Ajouter
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  className="btn-g"
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    navigate("/dossiersMedicaux");
                  }}
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: "rgb(131,58,180)",
                    "&:hover": { backgroundColor: "hsl(18, 100%, 66%)" },
                  }}
                >
                  Annuler
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ConsultationAdd;
