import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const fetchSpecialties = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/profile/specialty/");
      setSpecialty(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/profile/doctors/");
      setDoctors(res.data);
      setFilteredDoctors(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filterBySpecialty = (specialtyName) => {
    if (specialtyName === "All") {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter((doc) => doc.specialization === specialtyName);
      setFilteredDoctors(filtered);
    }
  };

  useEffect(() => {
    fetchSpecialties();
    fetchDoctors();
  }, []);

  return (
    <section className="min-h-screen py-16 px-6 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar Filter */}
        <div className="bg-white p-6 rounded-3xl shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">🔍 Filter by Specialty</h2>
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => filterBySpecialty("All")}
                className="w-full text-left px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-gray-700 font-medium transition"
              >
                All
              </button>
            </li>
            {specialty &&
              specialty.map((spec) => (
                <li key={spec.id}>
                  <button
                    onClick={() => filterBySpecialty(spec.name)}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-200 bg-white text-gray-700 border border-gray-200 shadow-sm transition font-medium"
                  >
                    {spec.name}
                  </button>
                </li>
              ))}
          </ul>
        </div>

        {/* Doctor Cards */}
        <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors &&
            filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition duration-300 border-t-4 border-blue-400"
              >
                <div className="p-6 flex flex-col items-center text-center space-y-3">
                  <img
                    src={doc.image}
                    alt="Doctor"
                    className="w-28 h-28 rounded-full object-cover border-4 border-blue-300 shadow-md"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">
                    Dr. {doc.user.first_name} {doc.user.last_name}
                  </h3>
                  <p className="text-blue-600 font-medium">{doc.specialization}</p>
                  <p className="text-gray-600 text-sm">{doc.designation}</p>
                  <p className="text-gray-500 text-sm">{doc.clinic}</p>
                  <div className="text-sm text-gray-600">
                    {doc.from_day} - {doc.to_day} <br />
                    <span className="text-gray-500">
                      ({doc.from_time} - {doc.to_time})
                    </span>
                  </div>
                  <p className="text-green-600 font-bold">৳ {doc.fee}</p>
                  <button
                    onClick={() => navigate(`/doctor/details/${doc.id}`)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition shadow-md"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
