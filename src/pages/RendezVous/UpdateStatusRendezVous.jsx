// Importez les dépendances nécessaires
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { DataGrid } from "@mui/x-data-grid";
import { Close, Done } from "@mui/icons-material";
import { Typography, IconButton, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import {
  getRendezVousByMedecinID,
  updateStatusRendezVousByID,
  searchRendezVous,
  getRendezVousByPatientID,
} from "../../services/RendezVousServices";

const UpdateStatusRendezVous = () => {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useState({
    etatRendezVous: null,
    dateRendezVous: null,
    patient : null
  });
  const user = JSON.parse(localStorage.getItem("user"))?.user;

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const fetchData = async () => {
    let res ;
    if(user?.authorities[0]?.authority=="USER")
    {
      res = await getRendezVousByPatientID(user?.patient?.id);

    }
    else {
      res = await searchRendezVous(searchParams);
      console.log("rdv " ,   res)
    }
 
	console.log("res", res)
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
	const convertedValue =
		name === "dateRendezVous" ? format(new Date(value), "yyyy-MM-dd") : value;
	console.log("convertedValue", convertedValue)
    setSearchParams((prevParams) => ({ ...prevParams, [name]: convertedValue }));
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

  const columnsP = [
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
 
  ];
  return (
    <div className="rendezVousList" style={{ marginLeft: "5%", marginTop: "2%" }}>
      <Typography component="h1" variant="h5" style={{ marginBottom: "3%" }}>
      {user?.authorities[0]?.authority=="ADMIN" ? "Modification de status des Rendez-Vous" :"Liste rendez-vous" }
      </Typography>
     
    { user?.authorities[0]?.authority=="ADMIN" &&
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

      </div> }
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns= { user?.authorities[0]?.authority=="ADMIN" ?columns :columnsP}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
};

export default UpdateStatusRendezVous;
