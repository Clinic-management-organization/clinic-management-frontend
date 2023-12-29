// Importez les dépendances nécessaires
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Close, Done } from "@mui/icons-material";
import { Typography, IconButton, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import {
  getRendezVousByMedecinID,
  updateStatusRendezVousByID,
  searchRendezVous,
} from "../../services/RendezVousServices";

const UpdateStatusRendezVous = () => {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useState({
    etatRendezVous: null,
    dateRendezVous: null,
  });

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const fetchData = async () => {
    const res = await searchRendezVous(searchParams);
    setData(res);
  };

  const handleEdit = async (id, status) => {
    try {
      await updateStatusRendezVousByID(id, status);
      // Update the data without refreshing the whole page
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, etatRendezVous: status } : item
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({ ...prevParams, [name]: value }));
  };

  const columns = [
    {
      field: "dateRendezVous",
      headerName: "Date du rendez-vous",
      width: 200,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const formattedDate = date.toLocaleDateString("fr-FR");
        return formattedDate;
      },
    },
    { field: "remarques", headerName: "Remarques", width: 250 },
    { field: "motif", headerName: "Motif", width: 100 },
    { field: "etatRendezVous", headerName: "État du rendez-vous", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row.id, "CONFIRMEE")}>
            <Done />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row.id, "ANNULEE")}>
            <Close />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div className="rendezVousList" style={{ marginLeft: "5%", marginTop: "2%" }}>
      <Typography component="h1" variant="h5" style={{ marginBottom: "3%" }}>
        Modification de status des Rendez-Vous
      </Typography>
      <div>
        <FormControl sx={{width: '30%', mr: 5}}>
          <InputLabel htmlFor="etatRendezVous">État du Rendez-Vous</InputLabel>
          <Select
            name="etatRendezVous"
            value={searchParams.etatRendezVous || ""}
            onChange={handleChange}
          >
            <MenuItem value={null}>Tous</MenuItem>
            <MenuItem value="CONFIRMEE">Confirmée</MenuItem>
            <MenuItem value="ANNULEE">Annulée</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="date"
          name="dateRendezVous"
          value={searchParams.dateRendezVous || ""}
          onChange={handleChange}
        />
      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
};

export default UpdateStatusRendezVous;
