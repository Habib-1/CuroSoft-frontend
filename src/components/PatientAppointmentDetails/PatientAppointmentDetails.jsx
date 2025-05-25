import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../AuthContext/AuthContext";

const PatientAppointmentDetails = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/appointment/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointment(res.data);
      } catch (error) {
        console.error("Failed to fetch appointment:", error);
      }
    };

    fetchAppointment();
  }, [id]);

  if (!appointment) return <div className="text-center mt-10">Loading...</div>;

  const doctor = appointment.doctor_details;
  const patient = appointment.patient_details;

  const renderDoctorInfo = () => (
    <div className="border p-4 rounded-lg shadow-md bg-indigo-50">
      <h3 className="text-xl font-semibold mb-2 text-indigo-600">Doctor Information</h3>
      {doctor?.image ? (
        <img
          src={doctor.image}
          alt="Doctor"
          className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200 mb-4"
        />
      ) : (
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
          No Image
        </div>
      )}
      <p><strong>Name:</strong> Dr. {doctor?.user?.first_name} {doctor?.user?.last_name}</p>
      <p><strong>Email:</strong> {doctor?.user?.email}</p>
      <p><strong>Phone:</strong> {doctor?.phone}</p>
      <p><strong>Gender:</strong> {doctor?.gender}</p>
      <p><strong>Specialization:</strong> {doctor?.specialization}</p>
      <p><strong>Qualification:</strong> {doctor?.qualification}</p>
      <p><strong>Designation:</strong> {doctor?.designation}</p>
      <p><strong>Clinic:</strong> {doctor?.clinic}</p>
      <p><strong>Available:</strong> {doctor?.from_day} {doctor?.from_time} - {doctor?.to_day} {doctor?.to_time}</p>
      <p><strong>Fee:</strong> ৳{doctor?.fee}</p>
    </div>
  );

  const renderPatientInfo = () => (
    <div className="border p-4 rounded-lg shadow-md bg-green-50">
      <h3 className="text-xl font-semibold mb-2 text-green-600">Patient Information</h3>
      {patient?.profile_image ? (
        <img
          src={`http://127.0.0.1:8000${patient.profile_image}`}
          alt="Patient"
          className="w-32 h-32 rounded-full object-cover border-4 border-green-200 mb-4"
        />
      ) : (
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
          No Image
        </div>
      )}
      <p><strong>Name:</strong> {patient?.user?.first_name} {patient?.user?.last_name}</p>
      <p><strong>Email:</strong> {patient?.user?.email}</p>
      <p><strong>Phone:</strong> {patient?.phone}</p>
      <p><strong>Gender:</strong> {patient?.gender}</p>
      <p><strong>Address:</strong> {patient?.address}</p>
      <p><strong>Blood Group:</strong> {patient?.blood_group}</p>
      <p><strong>Date of Birth:</strong> {patient?.date_of_birth}</p>
      <p><strong>Emergency Contact:</strong> {patient?.emergency_contact}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 hover:underline mb-6 inline-block"
        >
          ← Back
        </button>

        <h2 className="text-4xl font-bold mb-6 text-center text-indigo-700">
          Appointment Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Conditionally render based on role */}
          {user?.role === "DOCTOR" ? renderPatientInfo() : renderDoctorInfo()}

          {/* Appointment Info */}
          <div className="border p-4 rounded-lg shadow-md bg-purple-50">
            <h3 className="text-xl font-semibold mb-2 text-purple-600">Appointment Info</h3>
            <p><strong>Appointment Date:</strong> {appointment.appointment_date}</p>
            <p><strong>Day:</strong> {appointment.appointment_day}</p>
            <p><strong>Status:</strong>
              <span className={`ml-2 px-2 py-1 rounded-full text-white text-sm ${
                appointment.status === 'Pending' ? 'bg-yellow-500' : 'bg-green-600'
              }`}>
                {appointment.status}
              </span>
            </p>
            <p><strong>Symptoms:</strong> {appointment.symptoms}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientAppointmentDetails;
