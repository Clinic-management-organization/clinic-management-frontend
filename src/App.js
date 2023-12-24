import './App.css';
import SideBar from './components/SideBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Patients from './pages/Patients';

function App() {
  return (
    <div>
      
      <Router>
      <SideBar />
        <Routes>
        <Route path="/patients" element={<Patients />}/>
       
        <Route path="/medecins"/>
        
        <Route path="/rendez_vous"/>
        
        </Routes>
      </Router>
    </div>

  )
}

export default App;
