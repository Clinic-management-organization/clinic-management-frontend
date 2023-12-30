import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import {
  getMedecinByID,
  updateMedecinByID,
} from "../../../services/MedecinServices";
import { Box } from "@mui/material";

const MedecinUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medecin, setMedecin] = useState(null);
  const [selectedSpecialite, setSelectedSpecialite] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMedecinByID(id);
      setMedecin(res);
      setSelectedSpecialite(res?.specialite);
      const dateInput = document.getElementById("date");
      dateInput.value = toDate(res?.dateNaissance);
    };
    fetchData();
  }, [id]);

  const handleOnChange = (event) => {
    console.log("specialite ", event.target.value);
    setSelectedSpecialite(event.target.value);
  };
  const toDate = (date) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const strMonth = month < 10 ? `0${month}` : `${month}`;
    const strDay = day < 10 ? `0${day}` : `${day}`;
    return `${year}-${strMonth}-${strDay}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const info = new FormData(e.currentTarget);
    const data = {
      nom: info.get("nom"),
      prenom: info.get("prenom"),
      dateNaissance: info.get("dateNaissance"),
      sexe: info.get("sexe"),
      adresse: info.get("adresse"),
      tel: info.get("tel"),
      email: info.get("email"),
      specialite: selectedSpecialite,
      rdvs: [],
      horaires: [],
      // Ajoutez d'autres champs selon vos besoins
    };
    if (selectedSpecialite === "")
      toast.error("Vérifier le specialite de l'invité !");
    else {
      try {
        const updatedSpeciialite = {
          specialite: selectedSpecialite,
        };
        updateMedecinByID(medecin.id, data).then(() => {
          navigate("/medecins");
        });
      } catch (e) {
        console.log("error", e);
      }
      console.log("data", data);
    }
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <Toaster />
        <h1 className="userTitle">Modifier profil medecin</h1>
        <button
          onClick={() => {
            navigate("/medecins/add");
          }}
          className="btn-grad"
        >
          Ajouter
        </button>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="/assets/images/patient.jpg"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{`${medecin?.prenom} ${medecin?.nom}`}</span>
              {/* Ajoutez d'autres champs si nécessaire */}
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">medecin</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{`${medecin?.prenom} ${medecin?.nom}`}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{`${toDate(
                medecin?.dateNaissance
              )}`}</span>
            </div>
            <span className="userShowTitle">Contact</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{`${medecin?.tel}`}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{`${medecin?.email} `}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Modifier</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Nom</label>
                <input
                  type="text"
                  name="nom"
                  className="userUpdateInput"
                  defaultValue={medecin?.nom}
                />
              </div>
              <div className="userUpdateItem">
                <label>Date de naissance</label>
                <input
                  id="date"
                  type="date"
                  name="dateNaissance"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Adresse</label>
                <input
                  type="text"
                  name="adresse"
                  defaultValue={medecin?.adresse}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  defaultValue={medecin?.email}
                  className="userUpdateInput"
                />
              </div>

              {/* Ajoutez d'autres champs selon vos besoins */}
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateItem">
                <label>Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  defaultValue={medecin?.prenom}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Sexe</label>
                <input
                  type="text"
                  name="sexe"
                  defaultValue={medecin?.sexe}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Téléphone</label>
                <input
                  type="text"
                  name="tel"
                  defaultValue={medecin?.tel}
                  className="userUpdateInput"
                />
              </div>
              <Box sx={{ minWidth: 120 }} className="userUpdateItem">
                <label>Specialité</label>
                <FormControl fullWidth>
                  <Select value={selectedSpecialite} onChange={handleOnChange}>
                    <MenuItem value={"DERMATOLOGIE"}>DERMATOLOGIE</MenuItem>
                    <MenuItem value={"GYNECOLOGIE"}>GYNECOLOGIE</MenuItem>
                    <MenuItem value={"OPHTALMOLOGIE"}>OPHTALMOLOGIE</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {/* Ajoutez d'autres champs selon vos besoins */}
              <button
                style={{ marginTop: 15 }}
                type="submit"
                className="btn-grad"
              >
                Modifier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MedecinUpdate;
