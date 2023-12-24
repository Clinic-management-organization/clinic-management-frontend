import "./index.css";
import { DeleteOutline } from "@mui/icons-material";
import { userRows } from "../../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMedecinByID, getAllMedecins } from "../../../services/MedecinServices";
const MedecinsList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllMedecins();
      console.log("res", res);
      setData(res);
    };
    fetchData();
  }, []);
const handleDelete = async (id) =>  {
  await deleteMedecinByID(id);

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
        field: "specialite",
        headerName: "Spécialité",
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

export default MedecinsList;