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
import { PersonAddAlt1 as PersonAddAlt1Icon } from "@mui/icons-material";
import { Toaster,toast  } from "react-hot-toast";
import { addPatient } from "../../../services/PatientsServices";
import { register } from "../../../services/AuthenticationService";

import './index.css'
// Ajoutez vos styles CSS personnalisés ici si nécessaire
const theme = {};

const PatientAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    sexe: "",
    adresse: "",
    tel: "",
    email: "",
    situationFamilliale: "",
    assuranceMedicale: "",
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
    const info = new FormData(e.currentTarget);
    console.log("data", formData);
    addPatient(formData).then(() => {

      const user={
        username : formData.email,
        password:formData.tel,
        patient:formData

      }
      register(user).then((res)=>console.log(res));
      toast.success("Le patient est ajouté avec succès");
      navigate("/patients");
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
            <PersonAddAlt1Icon style={{ width: 40, height: 40 }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ajouter un patient
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* Ajoutez les champs de formulaire avec les noms correspondants */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Prénom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date de naissance"
                  name="dateNaissance"
                  type="date"
                  value={formData.dateNaissance}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Sexe"
                  name="sexe"
                  value={formData.sexe}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Adresse"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Téléphone"
                  name="tel"
                  value={formData.tel}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Situation Familiale"
                  name="situationFamilliale"
                  value={formData.situationFamilliale}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Assurance Médicale"
                  name="assuranceMedicale"
                  value={formData.assuranceMedicale}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  className="btn-gradd"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: "rgb(100,149,237)",
                    "&:hover": { backgroundColor: "hsl(18, 100%, 66%)" },
                  }}
                >
                  Ajouter
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                   className="btn-gradd"
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    navigate("/patients");
                  }}
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: "rgb(100,149,237)",
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

export default PatientAdd;
