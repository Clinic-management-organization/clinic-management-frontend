import "./index.css";
import { DeleteOutline } from "@mui/icons-material";
import { userRows } from "../../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { deletePatientByID, getAllPatients } from "../../../services/PatientsServices";

const PatientsList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllPatients();
      console.log("res", res);
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
            <Link to={"/patients/update/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
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
};

export default PatientsList;
