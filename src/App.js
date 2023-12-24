import './App.css';
import SideBar from './components/SideBar/SideBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import PatientsList from './pages/PatientsList';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="container">
          <SideBar />

          <Routes>
            <Route path="/patients" element={<PatientsList />} />

            <Route path="/medecins" />

            <Route path="/rendez_vous" />

          </Routes>
        </div>
      </Router>
    </div>


  )
}

export default App;
