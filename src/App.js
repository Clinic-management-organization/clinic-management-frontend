import './App.css';
import SideBar from './components/SideBar/SideBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import PatientsList from './pages/Patients/PatientsList/PatientsList';
import PatientAdd from './pages/Patients/addPatient/PatientAdd';
import MedecinAdd from './pages/Medecins/addMedecin/MedecinAdd';
import MedecinsList from './pages/Medecins/MedecinList/MedecinsList';
import PatientRoutes from './routes/PatientRoutes';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="container">
          <SideBar />

          <Routes>
            <Route path="/patients" element={<PatientRoutes />} />

            <Route path="/medecins" element={<MedecinsList />} />

            <Route path="/rendez_vous" />

          </Routes>
        </div>
      </Router>
    </div>


  )
}

export default App;
