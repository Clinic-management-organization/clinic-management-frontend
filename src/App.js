import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar';
import MedecinsList from './pages/Medecins/MedecinList/MedecinsList';
import MedecinAdd from './pages/Medecins/addMedecin/MedecinAdd';
import MedecinUpdate from './pages/Medecins/updateMedecin/MedecinUpdate';
import PatientsList from './pages/Patients/PatientsList/PatientsList';
import PatientAdd from './pages/Patients/addPatient/PatientAdd';
import PatientUpdate from './pages/Patients/updatePatient/PatientUpdate';
<<<<<<< HEAD
import RendezVousList from './pages/RendezVous/RendezVousList'
=======
import MedecinUpdate from './pages/Medecins/updateMedecin/MedecinUpdate';
import RendezVousList from './pages/RendezVous/RendezVousList';
import UpdateStatusRendezVous from './pages/RendezVous/UpdateStatusRendezVous';
import DossierMedicalList from './pages/DossierMedical/DossierMedicalList';

>>>>>>> ba59981d4e51d7293177347f238ca95b4ee0b21d
function App() {

  return (
    <div>
      <Router>
        <Navbar />
        <div className="container">
          <SideBar />
          <Routes>
            <Route path="/patients" element={<PatientsList />} />
            <Route path="/patients/add" element={<PatientAdd />} />
            <Route path="/patients/update/:id" element={<PatientUpdate/>} />
            <Route path="/medecins" element={<MedecinsList />} />
            <Route path="/medecins/add" element={<MedecinAdd />} />
            <Route path="/medecins/update/:id" element={<MedecinUpdate/>} />
            <Route path="/rendez_vous" element={<RendezVousList/>} />
            <Route path="/dossiersMedicaux" element={<DossierMedicalList/>} />


        </Routes>
        </div>
      </Router>
    </div>


  )
}

export default App;
