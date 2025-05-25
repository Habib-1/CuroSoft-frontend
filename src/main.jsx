import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './components/Root/Root.jsx';
import About from './components/About/About.jsx';
import Contact from './components/Contact/Contact.jsx';
import Doctors from './components/Doctors/Doctors.jsx';
import Homepage from './components/Homepage/Homepage.jsx';
import Login from './components/Login/Login.jsx';
import PatientRegister from './components/PatientRegister/PatientRegister.jsx';
import Register from './components/Register/Register.jsx';
import DoctorProfile from './components/DoctorProfile/DoctorProfile.jsx';
import DoctorDetails from './components/DoctorDetails/DoctorDetails.jsx';
import AppointmentForm from './components/AppointmentForm/AppointmentForm.jsx';
import AppointmentDetails from './components/AppointmentDetails/AppointmentDetails.jsx';
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess.jsx';
import PatientAppointment from './components/PatientAppointment/PatientAppointment.jsx';
import PatientAppointmentDetails from './components/PatientAppointmentDetails/PatientAppointmentDetails.jsx';
import TodayAppointment from './components/TodayAppointment/TodayAppointment.jsx';
import Prescription from './components/Prescription/Prescription.jsx';
import HelpDeskForm from './components/HelpDeskForm/HelpDeskForm.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element:<Root></Root>,
    children: [
      {
        index:true,
        element: <Homepage></Homepage>
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/doctors",
        element: <Doctors></Doctors>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path:"/register",
        element: <Register></Register>
      },
      {
        path:"/register/patient",
        element: <PatientRegister></PatientRegister>
      },
      {
        path: "/profile/doctor",
        element: <DoctorProfile></DoctorProfile>,
      },
      {
        path: "/doctor/details/:id",
        element: <DoctorDetails></DoctorDetails>,
      },
      {
        path : '/doctor/appointment/form',
        element : <AppointmentForm></AppointmentForm>

      },
      {
        path : '/doctor/appointment/details',
        element : <AppointmentDetails></AppointmentDetails>

      },
      {
        path : '/payment/success',
        element : <PaymentSuccess></PaymentSuccess>

      },
      {
        path : '/patient/appointment',
        element : <PatientAppointment></PatientAppointment>

      },
       {
        path : '/appointment/:id',
        element :<PatientAppointmentDetails></PatientAppointmentDetails>

      },
      {
        path : '/today/appointment',
        element : <TodayAppointment></TodayAppointment>
      },
       {
        path : '/prescription',
        element : <Prescription></Prescription>
      },
         {
        path : '/help-desk',
        element : <HelpDeskForm></HelpDeskForm>
      },
    
    
    
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
