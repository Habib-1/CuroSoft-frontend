import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: null,
    phone: "",
    gender: "",
    qualification: "",
    specialization: "",
    designation: "",
    clinic: "",
    fee: "",
    from_day: "",
    to_day: "",
    from_time: "",
    to_time: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const res = await axios.get("http://127.0.0.1:8000/profile/me/doctor/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData((prev) => ({
          ...prev,
          ...res.data,
          image: null, // don't preload file
        }));
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("You must be logged in to update profile.");
      return;
    }

    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/profile/me/doctor/",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Add content type for file uploads
          },
        }
      );
      setSuccess(true);
      console.log("Profile updated successfully:", response.data);
      navigate("/"); // Redirect after successful profile update
    } catch (error) {
      console.error("Profile update failed:", error);
      setError("Profile update failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-blue-400 px-8 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 my-4 rounded-xl shadow-2xl w-full max-w-4xl transition-all duration-300 hover:scale-105"
        encType="multipart/form-data"
      >
        <h2 className="text-4xl font-semibold mb-6 text-center text-indigo-700">
          Doctor Profile
        </h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && (
          <p className="text-green-600 mb-4 font-semibold">
            Profile Updated Successfully!
          </p>
        )}

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 text-lg font-medium">Profile Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full border-2 border-gray-300 p-3 rounded-lg transition duration-200 focus:outline-none focus:border-indigo-500"
            accept="image/*"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 p-3 rounded-lg transition duration-200 focus:outline-none focus:border-indigo-500"
              placeholder="Phone number"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 p-3 rounded-lg transition duration-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Qualification</label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 p-3 rounded-lg transition duration-200 focus:outline-none focus:border-indigo-500"
              placeholder="e.g. MBBS, FCPS"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Specialization</label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 p-3 rounded-lg transition duration-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select Specialization</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 p-3 rounded-lg transition duration-200 focus:outline-none focus:border-indigo-500"
              placeholder="e.g. Consultant, Professor"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Clinic</label>
            <input
              type="text"
              name="clinic"
              value={formData.clinic}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 p-3 rounded-lg transition duration-200 focus:outline-none focus:border-indigo-500"
              placeholder="Clinic Name"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Fee</label>
            <input
              type="number"
              name="fee"
              value={formData.fee}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 p-3 rounded-lg transition duration-200 focus:outline-none focus:border-indigo-500"
              placeholder="Consultation Fee"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Available From Day</label>
            <select
              name="from_day"
              value={formData.from_day}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 p-3 rounded-lg transition duration-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="">From</option>
              <option value="MONDAY">Monday</option>
              <option value="TUESDAY">Tuesday</option>
              <option value="WEDNESDAY">Wednesday</option>
              <option value="THURSDAY">Thursday</option>
              <option value="FRIDAY">Friday</option>
              <option value="SATURDAY">Saturday</option>
              <option value="SUNDAY">Sunday</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Available To Day</label>
            <select
              name="to_day"
              value={formData.to_day}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 p-3 rounded-lg transition duration-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="">To</option>
              <option value="MONDAY">Monday</option>
              <option value="TUESDAY">Tuesday</option>
              <option value="WEDNESDAY">Wednesday</option>
              <option value="THURSDAY">Thursday</option>
              <option value="FRIDAY">Friday</option>
              <option value="SATURDAY">Saturday</option>
              <option value="SUNDAY">Sunday</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Available From Time</label>
            <input
              type="time"
              name="from_time"
              value={formData.from_time}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 p-3 rounded-lg transition duration-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Available To Time</label>
            <input
              type="time"
              name="to_time"
              value={formData.to_time}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 p-3 rounded-lg transition duration-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-3 rounded-lg mt-6 hover:bg-indigo-600 transition duration-200"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default DoctorProfile;
