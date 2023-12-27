import { DeleteOutline } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePatientByID, getAllPatients } from "../../../services/PatientsServices";
import "./index.css";
import {Button} from "@mui/material";
const PatientsList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllPatients();
      setData(res);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deletePatientByID(id);
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    { field: "nom", headerName: "Nom", width: 100 },
    {
      field: "prenom",
      headerName: "Prénom",
      width: 100,
    },
    {
      field: "sexe",
      headerName: "Sexe",
      width: 100,
    },
    {
      field: "dateNaissance",
      headerName: "Date de naissance",
      width: 160,
      valueFormatter: (params) => {
        // Assuming 'dateNaissance' is a valid Date object
        const date = new Date(params.value);
        const formattedDate = date.toLocaleDateString("fr-FR"); // Adjust the locale as needed
        return formattedDate;
      },
    },
    {
      field: "tel",
      headerName: "Numéro de téléphone",
      width: 160,
    },
    {
      field: "email",
      headerName: "E-mail",
      width: 160,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>

              <button className="userListEdit"
                onClick={() => {
                  navigate(`update/${params.row.id}`);
                }}>Edit</button>

            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
      <div className="main">
       <div className="head">
         <Button
           id="add"
           variant="outlined"
           onClick={() => {
             navigate(`add`);
           }}
         >
           Ajouter
         </Button>
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

export default PatientsList;
