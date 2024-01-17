import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import "./Welcome.css";
import { Container } from "@mui/material";
//const theme = createTheme();

export default function WelcomePage() {
  return (
    <Container className="container" component="main" style={{ width: "70%" }}>
      <Toaster />
      <CssBaseline />

      <div className="anneeStatusContainer">
        <img src ="https://img.freepik.com/vecteurs-libre/medecins-analyses-prescriptives-personnalisees_335657-1882.jpg?w=996&t=st=1705258337~exp=1705258937~hmac=9a74dd2843da73d6ac9f8c5b6383ce4b86a5ee44d41d8caaa465ba1809f65d06)"className="statusimg"  alt="" />
        <div className="msg">
          <h2 className="text1">
          Bienvenue <span class="en_attente"> Dans Notre Clinique...</span>
          </h2>

          
        </div>
      </div>
    </Container>
  );
}