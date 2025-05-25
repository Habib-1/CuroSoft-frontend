import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../AuthContext/AuthContext";

const TodayAppointment = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [today, setToday] = useState(new Date().toISOString().split("T")[0]);
  const [filterType, setFilterType] = useState("today"); // "today" or "all"

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
    } finally {
      setLoading(false);
    }
  };

  const markAsDone = async (appointmentId) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/appointment/${appointmentId}/`,
        { status: "Completed" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === appointmentId ? { ...item, status: "Completed" } : item
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  useEffect(() => {
    allAppointment();
    const interval = setInterval(() => {
      const currentDate = new Date().toISOString().split("T")[0];
      setToday(currentDate);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredAppointments = appointments.filter((item) => {
    const isDoctor = item?.doctor_details?.user?.id === user?.id;
    if (!isDoctor) return false;

    if (filterType === "today") {
      return item?.appointment_date === today;
    }
    return true; // for "all"
  });

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) return "Invalid Date";

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

const JoinButtonHandle = async (patientEmail) => {
  const token = localStorage.getItem("access_token");
  try {
    const res = await axios.post(
      'http://127.0.0.1:8000/meet/link/',
      { email: patientEmail },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const meetLink = res.data.link;
    window.open(meetLink, '_blank');
  } catch (error) {
    console.error('Error creating meeting link:', error);
    alert("Failed to create meeting link.");
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4 text-center">
          {filterType === "today" ? "Today's Appointments" : "All Appointments"}
        </h2>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setFilterType("today")}
            className={`px-4 py-2 rounded-md font-medium ${
              filterType === "today"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Today Appointment
          </button>
          <button
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 rounded-md font-medium ${
              filterType === "all"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All Appointment
          </button>
        </div>

        {loading ? (
          <div className="text-center text-indigo-600 font-semibold py-10 text-xl">
            Loading appointments...
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center text-gray-500 py-10 text-lg">
            No appointments to display.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-100 text-indigo-800">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">#</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Patient Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Gender</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Age</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Symptoms</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((data, index) => (
                  <tr key={data.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.patient_details?.user?.first_name}{" "}
                      {data.patient_details?.user?.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.patient_details?.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {calculateAge(data.patient_details?.date_of_birth)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data.symptoms}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-xs ${
                          data.status === "Completed"
                            ? "bg-green-600"
                            : data.status === "Cancelled"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {data.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      {data.status !== "Completed" && (
                        <button 
                       onClick={()=>JoinButtonHandle(data.patient_details?.user?.email)}
                       className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm">
                        Join
                      </button>
                      )}
                     
                      <button
                        onClick={() => navigate(`/appointment/${data.id}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Details
                      </button>
                      {data.status !== "Completed" && (
                       <button
                        onClick={() => navigate('/prescription', { state: { appointmentId: data.id } })}
                        className="bg-green-600 hover:bg-sky-700 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Write Prescription
                      </button>
                      )}
                      {data.status !== "Completed" && (
                        <button
                          onClick={() => markAsDone(data.id)}
                          className="bg-red-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Completed
                        </button>
                      )}
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

export default TodayAppointment;
