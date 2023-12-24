import { Route, Routes } from "react-router-dom"
import PatientsList from "../pages/Patients/PatientsList/PatientsList";
import PatientAdd from "../pages/Patients/addPatient/PatientAdd";
import PatientUpdate from "../pages/Patients/updatePatient/PatientUpdate";


const PatientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PatientsList />} />
      <Route path="/add" element={<PatientAdd/>} />
      <Route path="/update/:id" element={<PatientUpdate />}/>
      {/* <Route path="/studentDetails/:_id" element={<StudentDetails />} /> */}
    
      
      
    </Routes>
  );
};
export default PatientRoutes;