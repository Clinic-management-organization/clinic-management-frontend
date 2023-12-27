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
} from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { PersonAddAlt1 as PersonAddAlt1Icon } from "@mui/icons-material";
import { Toaster } from "react-hot-toast";
import { addTraitement } from "../../services/ConsultationService";

const theme = {};

const TraitementAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    medicament: "",
    dosage: "",
    instructions: "",
    startDate: "",
    endDate: "",
    consultation: null,
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
    addTraitement(formData).then(() => {
      navigate("/traitement");
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
            sx={{ m: 1, bgcolor: "rgb(131,58,180)", width: 70, height: 70 }}
          >
            <PersonAddAlt1Icon style={{ width: 40, height: 40 }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ajouter un Traitement
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* ... (previous code) */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Médicament"
                  name="medicament"
                  value={formData.medicament}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Dosage"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Instructions"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date de début"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
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
                  label="Date de fin"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
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
                  label="Consultation"
                  name="consultation"
                  value={formData.consultation}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default TraitementAdd;
