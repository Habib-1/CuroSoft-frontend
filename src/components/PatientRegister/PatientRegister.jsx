import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profile_image: null,
    phone: "",
    gender: "",
    date_of_birth: "",
    blood_group: "",
    address: "",
    emergency_contact: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const res = await axios.get("http://127.0.0.1:8000/profile/me/patient/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData((prev) => ({
          ...prev,
          ...res.data,
          profile_image: null,
        }));
      } catch (err) {
        console.error("Error loading profile:", err);
        toast.error("Failed to load profile.");
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
      profile_image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("You must be logged in to register.");
      return;
    }

    const formDataToSend = new FormData();

    for (const key in formData) {
      if (key !== "profile_image") {
        formDataToSend.append(key, formData[key]);
      }
    }

    if (formData.profile_image) {
      formDataToSend.append("profile_image", formData.profile_image);
    }

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/profile/me/patient/",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Profile updated successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-green-300 px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl"
      >
        <h2 className="text-4xl font-extrabold mb-8 text-center text-green-600">
          Patient Profile
        </h2>

        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Profile Image</label>
          <input
            type="file"
            name="profile_image"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Phone number"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Blood Group</label>
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your address"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Emergency Contact</label>
            <input
              type="text"
              name="emergency_contact"
              value={formData.emergency_contact}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter emergency contact"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg mt-8 hover:bg-green-600 transition duration-200 shadow-md hover:shadow-lg"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default PatientRegister;
