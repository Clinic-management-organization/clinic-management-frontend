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
  const user = JSON.parse(localStorage.getItem("user"))?.user;
  console.log("user   ",user?.authorities)
  //ser?.authorities[0]?.authority=="USER" &&
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
      {user?.authorities[0]?.authority=="ADMIN" &&
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
        }
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Menu</h3>
          <ul className="sidebarList">
          {user?.authorities[0]?.authority=="ADMIN" &&
              <Link
                to="/patients"
                className="link"
              >
                <li className="sidebarListItem">
                  <Person4 className="sidebarIcon" />
                  Patients
                </li>
              </Link>
          }

          {user?.authorities[0]?.authority=="ADMIN" &&
              <Link to="/medecins" className="link">
                <li className="sidebarListItem">
                  <Person4 className="sidebarIcon" />
                  Médecins
                </li>
              </Link>
            }
{/* 
              <Link to="/rendez_vous" className="link">
                <li className="sidebarListItem">
                  <Person3 className="sidebarIcon" />
                  Rendez-vous
                </li>
              </Link> */}
              {(user?.authorities[0]?.authority=="ADMIN" || user?.authorities[0]?.authority=="USER") &&
              <Link to="/rendez_vous_list" className="link">
                <li className="sidebarListItem">
                  <BusinessCenter className="sidebarIcon" />
                  Liste Rendez-vous
                </li>
              </Link>
              }

            {(user?.authorities[0]?.authority=="ADMIN" || user?.authorities[0]?.authority=="USER") &&
              <Link to="/dossiersMedicaux" className="link">
                <li className="sidebarListItem">
                <Article className="sidebarIcon" />
                  Dossiers Medicaux
                </li>
              </Link>
            }

             
          </ul>
        </div>
        {user?.authorities[0]?.authority=="ADMIN" &&
        <div className="sidebarMenu">
       
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">

         
                  <Link to="/statistics" className="link">
                    <li className="sidebarListItem">
                      <Timeline className="sidebarIcon" />
                      Statistiques
                    </li>
                  </Link>

          </ul>
        
        </div>
          }
      </div>
    </div>
  );
};

export default SideBar;
