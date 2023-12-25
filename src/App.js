import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar';
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
