import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AppointmentForm() {
  const navigate=useNavigate();
  const {user,doctor}=useContext(AuthContext)
  console.log(user.id);
  console.log(doctor.id);
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    appointment_date: "",
    appointment_day: "",
    symptoms: "",
  });

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "appointment_date") {
      const date = new Date(value);
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const dayName = days[date.getUTCDay()];

      setFormData((prev) => ({
        ...prev,
        appointment_date: value,
        appointment_day: dayName,
        patient:user?.id,
        doctor:doctor?.id,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
 console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("You must be logged in to update profile.");
      return;
    }
    try{
        const res=await axios.post('http://127.0.0.1:8000/appointment/',formData,
            {
            headers:{
                Authorization:`Bearer ${token}`,
            }
        });
        const data=res.data;
        navigate('/doctor/appointment/details',{state:data});
    }catch(error){
        console.error("Error :", error);
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-200 via-sky-100 to-sky-300 p-4">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-sky-700 mb-6 tracking-wide">
          Book Your Appointment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Appointment Date */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Appointment Date
            </label>
            <input
              type="date"
              name="appointment_date"
              value={formData.appointment_date}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
              required
            />
          </div>

          {/* Appointment Day (Auto-filled) */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Appointment Day
            </label>
            <input
              type="text"
              name="appointment_day"
              value={formData.appointment_day}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 shadow-sm focus:outline-none"
            />
          </div>

          {/* Symptoms */}
          <div>
            <label className="block text-gray-800 font-medium mb-1">
              Symptoms
            </label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
              placeholder="Describe your symptoms..."
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition duration-300"
          >
            Submit Appointment
          </button>
        </form>
      </div>
    </div>
  );
}
