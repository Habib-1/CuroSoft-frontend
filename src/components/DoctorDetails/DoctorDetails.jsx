import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext";

const DoctorDetails = () => {
    const {fetchDoctor,doctor,user}=useContext(AuthContext);
    const {id}=useParams();
    const navigate=useNavigate();
    
    useEffect(() => {
      
        fetchDoctor(id);
      }, [id]);
    
      if (!doctor) return <div className="text-center py-10">Loading...</div>;

    const handleAppointmentClick = () => {
        if (user) {
          navigate('/doctor/appointment/form');
        } else {
          navigate('/login');
        }
      };
    return (
        <div>
  <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-16 px-6">
  <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
    
    {/* Header */}
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
      <h1 className="text-3xl font-bold">Dr. {doctor.user.first_name} {doctor.user.last_name}</h1>
      <p className="text-sm mt-1">Specialist in {doctor.specialization}</p>
    </div>

    {/* Body */}
    <div className="p-6 md:flex items-start gap-10">
      
      {/* Image */}
      <div className="flex justify-center md:justify-start">
        <img
          src={doctor.image}
          alt="Doctor"
          className="w-40 h-40 rounded-full border-4 border-purple-500 shadow-md object-cover"
        />
      </div>

      {/* Details */}
      <div className="mt-6 md:mt-0 flex-1 space-y-3 text-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <p><span className="font-semibold">📍 Clinic:</span>{doctor.clinic} </p>
          <p><span className="font-semibold">🎓 Qualification:</span> {doctor.qualification} </p>
          <p><span className="font-semibold">🏅 Designation:</span> {doctor.designation}</p>
          <p><span className="font-semibold">📞 Phone:</span> {doctor.phone} </p>
          <p><span className="font-semibold">💰 Fee:</span> {doctor.fee} </p>
          <p><span className="font-semibold">👤 Gender:</span> {doctor.gender}</p>
          <p><span className="font-semibold">🗓️ Days:</span> {doctor.from_day} to {doctor.to_day} </p>
          <p><span className="font-semibold">⏰ Time:</span> {doctor.from_time} to {doctor.to_time}</p>
          <p><span className="font-semibold">📧 Email:</span> {doctor.user.email}</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap gap-4">
          <button onClick={handleAppointmentClick} className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-2 rounded-lg shadow hover:shadow-lg transition-all">
            Book Appointment
          </button>
          <button onClick={()=>navigate(-1)} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg border hover:bg-gray-200 transition">
            Back to List
          </button>
        </div>
      </div>
    </div>
  </div>
</div>



</div>
    );
};

export default DoctorDetails;