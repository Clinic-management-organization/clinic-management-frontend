import "./SideBar.css";
import {
  LineStyle,
  Timeline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  BusinessCenter,
  EventNote,
  Person3,
  Person4,
  Groups2,
  Article,
  AccountTree,
  School,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import React from "react";

const SideBar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>

          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Dashboard
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Menu</h3>
          <ul className="sidebarList">

              <Link
                to="/patients"
                className="link"
              >
                <li className="sidebarListItem">
                  <BusinessCenter className="sidebarIcon" />
                  Patients
                </li>
              </Link>


              <Link to="/medecins" className="link">
                <li className="sidebarListItem">
                  <BusinessCenter className="sidebarIcon" />
                  Médecins
                </li>
              </Link>


              <Link to="/rendez_vous" className="link">
                <li className="sidebarListItem">
                  <Person3 className="sidebarIcon" />
                  Rendez-vous
                </li>
              </Link>

              <Link to="/rendez_vous_list" className="link">
                <li className="sidebarListItem">
                  <Person3 className="sidebarIcon" />
                  Liste Rendez-vous
                </li>
              </Link>

              <Link to="/dossiersMedicaux" className="link">
                <li className="sidebarListItem">
                  <Person4 className="sidebarIcon" />
                  Dossiers Medicaux
                </li>
              </Link>


              <Link to="/events" className="link">
                <li className="sidebarListItem">
                  <EventNote className="sidebarIcon" />
                  Evénements
                </li>
              </Link>


              <Link to="/clubs" className="link">
                <li className="sidebarListItem">
                  <Groups2 className="sidebarIcon" />
                  Clubs
                </li>
              </Link>



              <Link to="/contracts" className="link">
                <li className="sidebarListItem">
                  <Article className="sidebarIcon" />
                  Contrats
                </li>
              </Link>


            <Link to="/offers" className="link">
              <li className="sidebarListItem">
                <ChatBubbleOutline className="sidebarIcon" />
                Offres
              </li>
            </Link>


              <Link to="/projects" className="link">
                <li className="sidebarListItem">
                  <AccountTree className="sidebarIcon" />
                  Projets
                </li>
              </Link>


              <Link to="/detailsAnnee" className="link">
                <li className="sidebarListItem">
                  <School className="sidebarIcon" />
                  Université
                </li>
              </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">

              <Link to="/accounts" className="link">
                <li className="sidebarListItem">
                  <DynamicFeed className="sidebarIcon" />
                  Invités
                </li>
              </Link>


              <Link to="/AccountsPublic" className="link">
                <li className="sidebarListItem">
                  <DynamicFeed className="sidebarIcon" />
                    Comptes
                </li>
              </Link>


          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">

              <Link to="/manage" className="link">
                <li className="sidebarListItem">
                  <WorkOutline className="sidebarIcon" />
                  Droits d'accès
                </li>
                </Link>


                  <Link to="/statistics" className="link">
                    <li className="sidebarListItem">
                      <Timeline className="sidebarIcon" />
                      Statistiques
                    </li>
                  </Link>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
