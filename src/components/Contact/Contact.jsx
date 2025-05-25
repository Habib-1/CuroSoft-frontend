import axios from "axios";
import { useState } from "react";
import { FaEnvelope, FaPaperPlane, FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/contact/", formData)
      .then((res) => {
        toast.success("Message sent successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        toast.error("Something went wrong. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Error Submitting form", error);
      });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
            Get In Touch
          </h1>
          <p className="text-gray-600 text-lg">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <div className="flex items-center border rounded-xl px-4 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full py-3 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <div className="flex items-center border rounded-xl px-4 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full py-3 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block  text-gray-700 font-semibold mb-2">Message</label>
            <textarea
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
            ></textarea>
          </div>

          <div className="text-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-3 rounded-full flex items-center justify-center gap-2 shadow-md transition"
            >
              <FaPaperPlane />
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </section>
  );
};

export default Contact;
