import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthContext';
import axios from 'axios';

const AppointmentDetails = () => {
  const navigate = useNavigate();
  const {user,doctor}=useContext(AuthContext);
  const {state}=useLocation();
  const {id,appointment_date,appointment_day,symptoms}=state;
  const token = localStorage.getItem("access_token");
  console.log(id);
  const handlePayment = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/payment/initiate/", {
        appointment_id:id,
      },
      {
      headers:{
            Authorization: `Bearer ${token}`,
           },
      });

      if (response.data && response.data.payment_url) {
        window.location.href = response.data.payment_url; // Redirect to SSLCommerz
      } else {
        alert("Payment link not received.");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Payment failed! Please try again.");
    }
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100 flex justify-center items-center p-6">
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 w-full max-w-4xl relative">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-indigo-600 hover:text-indigo-800 font-medium transition"
        >
          ← Back
        </button>

        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">Appointment Payment</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Doctor Info */}
          <div className="bg-indigo-100/60 border border-indigo-200 p-5 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3 text-indigo-700">Doctor Information</h3>
            <p><span className="font-semibold">Name:</span> {doctor.user.first_name} {doctor.user.last_name}</p>
            <p><span className="font-semibold">Specialty:</span> {doctor.specialization} </p>
            <p><span className="font-semibold">Designation:</span> {doctor.designation} </p>
            <p><span className="font-semibold">Clinic:</span> {doctor.clinic} </p>
            <p><span className="font-semibold">Email:</span> {doctor.user.email} </p>
            <p><span className="font-semibold">Phone:</span> {doctor.phone} </p>
          </div>

          {/* Patient Info */}
          <div className="bg-indigo-100/60 border border-indigo-200 p-5 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3 text-indigo-700">Patient Information</h3>
            <p><span className="font-semibold">Name:</span> {user.first_name}  {user.last_name}</p>
            <p><span className="font-semibold">Email:</span> {user.email} </p>
            <p className='text-mute'>Note: will be added more data here</p>
           
          </div>
        </div>

        {/* Appointment Info */}
        <div className="bg-purple-50 border border-purple-200 p-5 rounded-xl shadow-sm hover:shadow-md transition mb-6">
          <h3 className="text-xl font-semibold mb-3 text-purple-700">Appointment Details</h3>
          <p><span className="font-semibold">Date:</span> {appointment_date} </p>
          <p><span className="font-semibold">Day:</span> {appointment_day} </p>
          <p><span className="font-semibold">Symptoms:</span> {symptoms} </p>
        </div>

        {/* Total Payment */}
        <div className="text-right text-xl font-bold text-indigo-800 mb-6">
          Total Payable: <span className="text-green-600">৳ {doctor.fee} </span>
        </div>

        {/* Payment Button */}
        <div className="flex justify-center">
          <button 
           onClick={handlePayment}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full shadow-lg transition hover:scale-105"
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
