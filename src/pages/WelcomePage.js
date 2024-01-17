import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import "./Welcome.css";
//const theme = createTheme();

export default function WelcomePage() {
  return (
    <div >
      <Toaster />
      <CssBaseline />

      <div className="anneeStatusContainer">
        <img className="statusimg"  alt="" />
        <div className="msg">
          <h2 className="text1">
          Welcome <span class="en_attente">Clinique...</span>
          </h2>

          
        </div>
      </div>
    </div>
  );
}