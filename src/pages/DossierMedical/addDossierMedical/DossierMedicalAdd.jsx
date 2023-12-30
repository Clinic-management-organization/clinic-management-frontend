import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Description as DescriptionIcon } from "@mui/icons-material";
import { Toaster } from "react-hot-toast";
import { addDossierMedical } from "../../../services/DossierMedicalServices";
import './index.css'

// Ajoutez vos styles CSS personnalisés ici si nécessaire
const theme = {};

const DossierMedicalAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dateCreation: "",
    dateMiseAJour: "",
    observation: "",
    consultation: [],
    rdvs: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDossierMedical(formData).then(() => {});
    navigate("/dossiersMedicaux");
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
            <DescriptionIcon style={{ width: 40, height: 40 }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ajouter un dossier médical
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Date de création"
                  name="dateCreation"
                  type="datetime-local"
                  value={formData.dateCreation}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Date de mise à jour"
                  name="dateMiseAJour"
                  type="datetime-local"
                  value={formData.dateMiseAJour}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Observation"
                  name="observation"
                  value={formData.observation}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
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

export default DossierMedicalAdd;
