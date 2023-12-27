// Importez les dépendances nécessaires
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Close, Done } from "@mui/icons-material";
import { Typography, IconButton } from "@mui/material";
import { getRendezVousByMedecinID, updateStatusRendezVousByID } from "../../services/RendezVousServices";

const UpdateStatusRendezVous = () => {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
    const res = await getRendezVousByMedecinID(2);
    setData(res);
    console.log(res);
    };
    fetchData();
  }, []);


  const toDate = (date) =>{
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const strMonth = month <10 ? `0${month}` : `${month}`
    const strDay = day <10 ? `0${day}` : `${day}`
    return `${year}-${strMonth}-${strDay}`;

  }
  const handleEdit = async (id , rdv , status) => {

    const res = await updateStatusRendezVousByID(id, status)
  };

  const columns = [
    { field: "dateRendezVous",
      headerName: "Date du rendez-vous",
      width: 200,
      valueFormatter: (params) => {
        // Assuming 'dateNaissance' is a valid Date object
        const date = new Date(params.value);
        const formattedDate = date.toLocaleDateString("fr-FR"); // Adjust the locale as needed
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
        <IconButton
          onClick={() => {
              handleEdit(params.row.id , params.row , "CONFIRMEE").then(()=>{
                window.location.reload();

              })
          }}
          >
        <Done/>
        </IconButton>
        <IconButton
          onClick={() => {
              handleEdit(params.row.id , params.row ,"ANNULEE").then(()=>{
                window.location.reload();

              })
            }}
            >
            <Close/>
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div className="rendezVousList" style={{marginLeft:'5%', marginTop:'2%'}}>
           <Typography component="h1" variant="h5" style={{ marginBottom: '3%' }}>
            Modification de status des Rendez-Vous
          </Typography>
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
