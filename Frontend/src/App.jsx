import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ChooseCity from "./pages/ChooseCity"
import FindHospitals from "./pages/FindHospitals"
import FindHotels from "./pages/FindHotels"
import FindRooms from "./pages/FindRooms"
import BookAmbulance from "./pages/BookAmbulance"
import EmergencyServices from "./pages/EmergencyServices"
import HomeCareServices from "./pages/HomeCareServices"
import PatientSwipeForm from "./components/PatientFormOnline"
import DoctorConsultation from "./pages/DoctorConsultation"
import LabTest from "./pages/LabTest"

import OfflineConsultation from "./forms/OfflineConsultation"
import OnlineConsultation from "./forms/OnlineConsultation"
import HomeLabTestForm from "./forms/HomeLabTestForm"
import CenterLabTestForm from "./forms/CenterLabTestForm"
import AddPatient from "./pages/AddPatient"

import Login from "./pages/Login"
import Register from "./pages/Register"

import Footer from './components/Footer'
import ForgotPassword from './pages/ForgotPassword'
function App() {
// localStorage.removeItem("preloaderShown")
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/choose-city/:service" element={<ChooseCity />} />
                <Route path="/find-hospitals/:city" element={<FindHospitals />} />
                <Route path="/find-hotels/:city" element={<FindHotels />} />
                <Route path="/find-rooms/:city" element={<FindRooms />} />
                <Route path="/find-ambulance/:city" element={<BookAmbulance />} />
                <Route path="/find-services/:city" element={<EmergencyServices />} />
                <Route path="/find-home-care/:city" element={<HomeCareServices />} />


                <Route path="/consultation" element={<DoctorConsultation />} />
                <Route path="/test" element={<LabTest />} />


                <Route path="/consultation/offline" element={<OfflineConsultation />} />
                <Route path="/consultation/online" element={<OnlineConsultation />} />
                <Route path="/test/home" element={<HomeLabTestForm />} />
                <Route path="/test/center" element={<CenterLabTestForm />} />
                <Route path="/patient/add" element={<AddPatient />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
            <Footer/>
        </>
    )
}

export default App