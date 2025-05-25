import React, { useContext, useEffect, useState } from "react";
import { FileDown, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../AuthContext/AuthContext";

const PatientAppointment = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("access_token");

  const allAppointment = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/appointment/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch appointments", err);
      setError("Could not load appointments.");
    } finally {
      setLoading(false);
    }
  };
const PrescriptionHandle = async (appointmentId) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/prescription/download/${appointmentId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // 👈 important for binary data
      }
    );

    // Create a blob from the PDF stream
    const file = new Blob([res.data], { type: 'application/pdf' });

    // Create a link element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(file);
    link.download = `prescription_${appointmentId}.pdf`;
    document.body.appendChild(link);
    link.click();

    // Clean up
    link.remove();
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};
  useEffect(() => {
    allAppointment();
  }, []);

  const filteredAppointments = appointments.filter(
    (item) => item?.patient_details?.user?.id === user?.id
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl p-8">
        <button onClick={() => navigate(-1)} className="mb-4 text-indigo-600 hover:underline">
          ← Back
        </button>
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Appointment History
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading appointments...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredAppointments.length === 0 ? (
          <p className="text-center text-gray-600">No appointments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-200 to-purple-200 text-gray-900">
                  <th className="py-4 px-6 text-left">Date</th>
                  <th className="py-4 px-6 text-left">Doctor</th>
                  <th className="py-4 px-6 text-left">Specialization</th>
                  <th className="py-4 px-6 text-left">Status</th>
                  <th className="py-4 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((data) => (
                  <tr
                    key={data.id}
                    className="border-b hover:bg-indigo-50 transition duration-200"
                  >
                    <td className="py-4 px-6">{data.appointment_date}</td>
                    <td className="py-4 px-6">
                      Dr. {data.doctor_details?.user?.first_name}
                    </td>
                    <td className="py-4 px-6">{data.doctor_details?.specialization}</td>
                    <td className="py-4 px-6">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                        {data.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 flex gap-3">
                      <button
                        onClick={() => navigate(`/appointment/${data.id}`)}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition duration-150"
                      >
                        <Eye size={16} />
                        Details
                      </button>
                      <button 
                      
                        // onClick={() => navigate(`/prescription/pdf/${data.id}`)}
                        onClick={() => PrescriptionHandle(data.id)}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition duration-150"
                        
                      >
                        <FileDown size={16} />
                        Prescription
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientAppointment;
