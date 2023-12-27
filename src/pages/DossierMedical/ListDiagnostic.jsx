import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { List, ListItem, Divider, ListItemText } from "@mui/material";

const ListDiagnostic = ({ open, handleClose, diagnostics }) => {
    console.log('diagnostics',diagnostics)
  return (
    <Modal
      open={open}
      onClose={handleClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "5px",
          width: "40%" // Set the width to 40% of the page
        }}
      >
        <Typography variant="h6">Liste des Diagnostics</Typography>
        <List>
          {diagnostics?.map((diagnostic, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={<Typography variant="body1" style={{ fontWeight: "bold" }}>{`Diagnostic: ${index + 1}`}</Typography>}
                  secondary={
                    <React.Fragment >
                      <Typography style={{marginLeft:'3%'}}variant="body2" color="textPrimary">{`Description: ${diagnostic.description}`}</Typography>
                      <Typography style={{marginLeft:'3%'}} variant="body2" color="textPrimary">{`Category: ${diagnostic.category}`}</Typography>
                      <Typography style={{marginLeft:'3%'}} variant="body2" color="textPrimary">{`Maladie: ${diagnostic.maladie}`}</Typography>
                      {/* Add additional fields as needed */}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </div>
    </Modal>
  );
};

export default ListDiagnostic;
