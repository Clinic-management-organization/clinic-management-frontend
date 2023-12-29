import { DeleteOutline } from "@mui/icons-material";
import { Button,
        TextField,
        FormControl,
        InputLabel,
        Select,
        MenuItem,
       } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePatientByID, getAllPatients, searchPatients } from "../../../services/PatientsServices";
import "./index.css";
const PatientsList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  const [searchCriteria, setSearchCriteria] = useState({
      nom: "",
      prenom: "",
      tel: "",
      sexe: "",
    });


  const fetchData = async () => {
    const res = searchCriteria.nom || searchCriteria.prenom || searchCriteria.tel || searchCriteria.sexe
      ? await searchPatients(searchCriteria)
      : await getAllPatients();
    setData(res);
  };

  useEffect(() => {
      fetchData();
    }, []);

    /*
    //real time get data
      useEffect(() => {
        fetchData();
      }, [searchCriteria]);*/


    const handleSearch = () => {
      fetchData();
    };


  const handleDelete = async (id) => {
    await deletePatientByID(id);
    setData(data.filter((item) => item.id !== id));
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
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
         <div style={{display: 'flex', gap: "1%"}}>
           <TextField
              name="nom"
              label="Nom"
              variant="outlined"
              value={searchCriteria.nom}
              onChange={handleInputChange}
            />
            <TextField
              name="prenom"
              label="Prénom"
              variant="outlined"
              value={searchCriteria.prenom}
              onChange={handleInputChange}
            />
            <TextField
              name="tel"
              label="Numéro de téléphone"
              variant="outlined"
              value={searchCriteria.tel}
              onChange={handleInputChange}
            />
            <FormControl variant="outlined" sx={{width: '10%'}}>
              <InputLabel id="sexe-label">Sexe</InputLabel>
              <Select
                fullWidth
                name="sexe"
                label="Sexe"
                value={searchCriteria.sexe}
                onChange={handleInputChange}
              >
                <MenuItem value="F">Female</MenuItem>
                <MenuItem value="H">Male</MenuItem>
              </Select>
            </FormControl>
            <Button
              id="search"
              variant="outlined"
              onClick={handleSearch}
            >
              Rechercher
            </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => {
              navigate(`add`);
            }}
          >
            Ajouter
          </Button>
         </div>
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
