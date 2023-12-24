import {
    CalendarToday,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
  } from "@mui/icons-material";
  import { useNavigate, useParams } from "react-router-dom";
 
  import "./index.css";
  
  import React, { useEffect, useState } from 'react';
  import { Toaster, toast } from "react-hot-toast";
  
  
  const PatientUpdate = () => {
    
    const { id } = useParams()
    useEffect( () => {
        const fetchData = async () => {
          
          const dateInput = document.getElementById("date");
    
        }
      fetchData()
      }, [id])
    

    const [patient, setPatient] = useState(null)
   
    const navigate = useNavigate()
  
   
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const info = new FormData(e.currentTarget);
      const data = {
        nom: info.get('nom'),
        prenom: info.get('prenom'),
        dateNaissance: info.get('dateNaissance'),
        sexe: info.get('sexe'),
        adresse: info.get('adresse'),
        tel: info.get('tel'),
        email: info.get('email'),
        situationFamilliale: info.get('situationFamilliale'),
        assuranceMedicale: info.get('assuranceMedicale'),
        // Ajoutez d'autres champs selon vos besoins
      }
  
      console.log("data", data);
    };
  
  
    return (
      <div className="user">
        <div className="userTitleContainer">
          <Toaster />
          <h1 className="userTitle">Modifier profil patient</h1>
          <button onClick={() => { navigate('/patients/add') }} className="userAddButton">Ajouter</button>
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
                <span className="userShowUsername">{`${patient?.prenom} ${patient?.nom}`}</span>
                {/* Ajoutez d'autres champs si nécessaire */}
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Patient</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{`${patient?.prenom} ${patient?.nom}`}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">{`${(patient?.dateNaissance)}`}</span>
              </div>
              <span className="userShowTitle">Contact</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{`${patient?.tel}`}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{`${patient?.email} `}</span>
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
                    defaultValue={patient?.nom}
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
                    defaultValue={patient?.adresse}
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
                    defaultValue={patient?.prenom}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Sexe</label>
                  <input
                    type="text"
                    name="sexe"
                    defaultValue={patient?.sexe}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Téléphone</label>
                  <input
                    type="text"
                    name="tel"
                    defaultValue={patient?.tel}
                    className="userUpdateInput"
                  />
                </div>
                {/* Ajoutez d'autres champs selon vos besoins */}
                <button type="submit" className="userUpdateButton">Modifier</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
  export default PatientUpdate;