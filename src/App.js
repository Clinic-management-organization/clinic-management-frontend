import './App.css';
import SideBar from './components/SideBar/SideBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import PatientsList from './pages/Patients/PatientsList/PatientsList';
import PatientAdd from './pages/Patients/addPatient/PatientAdd';
import MedecinAdd from './pages/Medecins/addMedecin/MedecinAdd';
import MedecinsList from './pages/Medecins/MedecinList/MedecinsList';
import PatientUpdate from './pages/Patients/updatePatient/PatientUpdate';
import MedecinUpdate from './pages/Medecins/updateMedecin/MedecinUpdate';
import RendezVousList from './pages/RendezVous/RendezVousList';
import UpdateStatusRendezVous from './pages/RendezVous/UpdateStatusRendezVous';

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


        </Routes>
        </div>
      </Router>
    </div>


  )
}

export default App;
