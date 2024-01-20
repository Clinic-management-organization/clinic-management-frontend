import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar';
import MedecinsList from './pages/Medecins/MedecinList/MedecinsList';
import MedecinAdd from './pages/Medecins/addMedecin/MedecinAdd';
import MedecinUpdate from './pages/Medecins/updateMedecin/MedecinUpdate';
import PatientsList from './pages/Patients/PatientsList/PatientsList';
import PatientAdd from './pages/Patients/addPatient/PatientAdd';
import PatientUpdate from './pages/Patients/updatePatient/PatientUpdate';
import RendezVousList from './pages/RendezVous/RendezVousList';
import UpdateStatusRendezVous from './pages/RendezVous/UpdateStatusRendezVous';

import ConsultationAdd from './pages/Consultation/ConsultationAdd';
import DossierMedicalAdd from './pages/DossierMedical/addDossierMedical/DossierMedicalAdd';
import DossierMedicalList from './pages/DossierMedical/ListDossierMedical/DossierMedicalList';
import MonthlyIncomeChart from './pages/stat/MonthlyIncomeChart';
import SignInSide from './pages/SignIn/SignIn';
import WelcomePage from './pages/WelcomePage';


function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user aaaaaaaaaaa",user?.user?.authorities[0]?.authority)
  return (
    <div>
      {user?.jwt ? (
        <Router>
          <Navbar />
          <div className="container">
            <SideBar />
            <Routes>
              <Route path="/patients" element={<PatientsList />} />
              <Route path="/patients/add" element={<PatientAdd />} />
              <Route path="/patients/update/:id" element={<PatientUpdate />} />
              <Route path="/medecins" element={<MedecinsList />} />
              <Route path="/medecins/add" element={<MedecinAdd />} />
              <Route path="/medecins/update/:id" element={<MedecinUpdate />} />
              <Route path="/rendez_vous/:dossierID" element={<RendezVousList />} />
              <Route path="/rendez_vous_list" element={<UpdateStatusRendezVous />} />
              <Route path="/dossiersMedicaux" element={<DossierMedicalList />} />
              <Route path="/dossiersMedicaux/add" element={<DossierMedicalAdd />} />
              <Route path="/consultations/add-to-dossier/:dossierID" element={<ConsultationAdd />} />
              <Route path="/" element={<MonthlyIncomeChart />} />
              <Route path="/statistics" element={<MonthlyIncomeChart />} />
              <Route path="/welcome" element={<WelcomePage />} />

              {user?.user?.authorities[0]?.authority=="ADMIN" ?
              <Route path="*" element={<Navigate to="/" replace />} />
              :
              <Route path="*" element={<Navigate to="/welcome" replace />} />
              }
            </Routes>
          </div>
        </Router>
      ) :
      (
        <Router>
          <Routes>
            <Route path="/login" element={<SignInSide />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>)

      }
    </div>
  )
}

export default App;
