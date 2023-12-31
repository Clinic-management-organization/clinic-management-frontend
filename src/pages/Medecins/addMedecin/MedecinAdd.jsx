import { PersonAddAlt1 as PersonAddAlt1Icon } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  FormControl,
  Select,
} from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MedecinHoraires from "./MedecinHoraires";
import './index.css'
import { addMedecin } from "../../../services/MedecinServices";
// Ajoutez vos styles CSS personnalisés ici si nécessaire
const theme = {};

const MedecinAdd = () => {
  const navigate = useNavigate();
  const [horaires, setHoraires] = useState([]);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    sexe: "",
    adresse: "",
    tel: "",
    email: "",
    specialite: "",
    horaires: [],
  });
  const specialites = ["DERMATOLOGIE", , "GYNECOLOGIE", "OPHTALMOLOGIE"];

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
    const _formData = { ...formData, horaires };

    console.log("data", _formData);
    addMedecin(_formData).then(() => {
      navigate("/medecins");
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
            Ajouter un médecin
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
                  fullWidth
                  label="Nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
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
              <Grid item xs={12}>
                <FormControl>
                  <Select
                    native
                    label="Spécialité"
                    name="specialite"
                    value={formData.specialite}
                    onChange={handleChange}
                    fullWidth
                    required
                  >
                    {specialites?.map((specialite, index) => (
                      <option key={index} value={specialite}>
                        {specialite}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <MedecinHoraires
                  horaires={horaires}
                  setHoraires={setHoraires}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  className="btn-gr"
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
                  className="btn-gr"
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    navigate("/medecins");
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

export default MedecinAdd;
