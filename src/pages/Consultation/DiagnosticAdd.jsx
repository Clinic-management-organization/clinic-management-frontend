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
import { Healing as HealingIcon } from "@mui/icons-material";
import { Toaster } from "react-hot-toast";
import { addDiagnostic } from "../../services/ConsultationService";


const theme = {};

const DiagnosticAdd = (consultation) => {
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      description: "",
      category: "",
      maladie: "",
      consultation : consultation
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
      addDiagnostic(formData).then(() => {
        //navigate('/diagnostics');
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
              <HealingIcon style={{ width: 40, height: 40 }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Ajouter un diagnostic
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
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Catégorie"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Maladie"
                    name="maladie"
                    value={formData.maladie}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                {/* Add more fields as needed */}
              </Grid>
  
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
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
                    variant="outlined"
                    fullWidth
                    onClick={() => {
                      navigate("/diagnostics");
                    }}
                    sx={{
                      mt: 3,
                      mb: 2,
                      borderColor: "rgb(131,58,180);",
                      color: "rgb(131,58,180);",
                      "&:hover": {
                        borderColor: "hsl(18, 100%, 66%)",
                        color: "hsl(18, 100%, 66%)",
                        backgroundColor: "#ffff",
                      },
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
  
  export default DiagnosticAdd;
  