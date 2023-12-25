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



        </Routes>
        </div>
      </Router>
    </div>


  )
}

export default App;
