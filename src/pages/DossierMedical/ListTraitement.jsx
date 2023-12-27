import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { List, ListItem, Divider, ListItemText } from "@mui/material";

const ListTraitement = ({ open, handleClose, traitements }) => {
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
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>Liste des Traitements</Typography>
        <List>
          {traitements.map((traitement, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                    primary={<Typography variant="body1" style={{ fontWeight: "bold" }}>{`Traitement: ${index + 1}`}</Typography>}
                    secondary={
                    <React.Fragment>
                      <Typography style={{marginLeft:'3%'}} variant="body2" color="textPrimary">{`Médicament: ${traitement.medicament}`}</Typography>
                      <Typography style={{marginLeft:'3%'}} variant="body2" color="textPrimary">{`Dosage: ${traitement.dosage}`}</Typography>
                      <Typography style={{marginLeft:'3%'}} variant="body2" color="textPrimary">{`Instructions: ${traitement.instructions}`}</Typography>
                      <Typography style={{marginLeft:'3%'}} variant="body2" color="textPrimary">{`Début: ${traitement.startDate}`}</Typography>
                      <Typography style={{marginLeft:'3%'}} variant="body2" color="textPrimary">{`Fin: ${traitement.endDate}`}</Typography>
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

export default ListTraitement;
