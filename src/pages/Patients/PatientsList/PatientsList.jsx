import "./index.css";
import { DeleteOutline } from "@mui/icons-material";
import { userRows } from "../../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";

const PatientsList = () => {
const [data, setData] = useState(userRows);
const navigate = useNavigate();

const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
const columns = [
    { field: "id", headerName: "ID", width: 90 },
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
      field: "date naissance",
      headerName: "Date de naissance",
      width: 160,
    },
    {
      field: "tel",
      headerName: "Numéro de téléphone",
      width: 160,
    },
    {
      field: "mail",
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
              <button className="userListEdit" onClick={()=>{navigate(`update/${params?.row?.id}`)}}>Edit</button>
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
        <div className="userList">
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
      </div>
    );
}

export default PatientsList;