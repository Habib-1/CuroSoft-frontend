import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HelpDeskForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ age: "", gender: "", symptoms: "" });
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleReset = () => {
    setFormData({ age: "", gender: "", symptoms: "" });
    setResponseData(null);
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/help-desk/smart-diagnose/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResponseData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const variants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 via-blue-100 to-white p-4">
      <div className="max-w-lg w-full p-8 bg-white rounded-2xl shadow-2xl border border-blue-200 transition-all duration-300 hover:shadow-indigo-300/50">
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">🩺 Help Desk</h2>

        {!responseData && (
          <form onSubmit={handleSubmit} className="relative min-h-[220px] space-y-4">
            {step === 1 && (
              <motion.div key="step1" initial="initial" animate="animate" exit="exit" variants={variants}>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gradient-to-r from-white to-blue-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your age"
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial="initial" animate="animate" exit="exit" variants={variants}>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gradient-to-r from-white to-blue-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial="initial" animate="animate" exit="exit" variants={variants}>
                <label className="block text-sm font-medium text-gray-700">Symptoms</label>
                <textarea
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gradient-to-r from-white to-blue-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. I have chest pain and dizziness"
                ></textarea>
              </motion.div>
            )}

            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition"
                >
                  Back
                </button>
              )}
              {step < 3 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition"
                >
                  Next
                </button>
              )}
              {step === 3 && (
                <button
                  type="submit"
                  className="ml-auto px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </form>
        )}

        {responseData && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 bg-gradient-to-br from-white to-blue-100 p-4 rounded-xl border border-gray-200 shadow"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">🩻 Diagnosis Result:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {responseData.diagnosis?.map((d, i) => (
                <li key={i}>
                  <strong>{d.name}</strong> — Probability: {(d.probability * 100).toFixed(1)}%
                </li>
              ))}
            </ul>

            {responseData.specialist?.recommended_specialist && (
              <div className="mt-4 text-gray-800">
                <strong>Recommended Specialist:</strong> {responseData.specialist.recommended_specialist.name}
              </div>
            )}

            <div className="mt-6 flex gap-4">
              <button
                onClick={handleReset}
                className="px-5 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition"
              >
                Reset
              </button>
              <button
                onClick={() => navigate("/doctors")}
                className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition"
              >
                Go to Doctor Page
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HelpDeskForm;
