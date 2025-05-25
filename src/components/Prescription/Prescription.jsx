import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Prescription = () => {
    const navigate=useNavigate();
  const [diagnosis, setDiagnosis] = useState('');
  const [medicines, setMedicines] = useState([{ name: '', dosage: '', duration: '', note: '' }]);
  const [advices, setAdvices] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const token=localStorage.getItem('access_token');
  const location=useLocation();
  const {appointmentId}=location.state;

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const addMedicine = () => setMedicines([...medicines, { name: '', dosage: '', duration: '', note: '' }]);
  const removeMedicine = (index) => setMedicines(medicines.filter((_, i) => i !== index));

  const handleAdviceChange = (index, value) => {
    const updated = [...advices];
    updated[index] = value;
    setAdvices(updated);
  };

  const addAdvice = () => setAdvices([...advices, '']);
  const removeAdvice = (index) => setAdvices(advices.filter((_, i) => i !== index));

  const handleSubmit = async () => {
    if (!appointmentId || !token) {
      alert("Missing appointment ID or token!");
      return;
    }

    const formData = {
      appointment: appointmentId,
      diagnosis,
      medicines,
      advices: advices.map((content) => ({ content })),
    };

    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:8000/prescription/create/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSuccess("✅ Prescription created successfully!");
      setDiagnosis('');
      setMedicines([{ name: '', dosage: '', duration: '', note: '' }]);
      setAdvices(['']);
      navigate(-1);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to submit prescription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-2xl mt-10 mb-5">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">🩺 Prescription Form</h1>

      {success && <p className="text-green-600 text-center mb-4">{success}</p>}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div className="mb-8">
        <label className="block font-semibold mb-2 text-blue-700">Diagnosis</label>
        <textarea
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          className="w-full p-4 border-2 border-blue-300 rounded-xl bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={3}
          placeholder="Enter diagnosis..."
        />
      </div>

      {/* Medicines Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">💊 Medicines</h2>
        {medicines.map((medicine, index) => (
          <div key={index} className="mb-4 p-5 border border-blue-200 rounded-xl bg-white shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            <input
              type="text"
              placeholder="Name"
              value={medicine.name}
              onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Dosage"
              value={medicine.dosage}
              onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Duration"
              value={medicine.duration}
              onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Note"
              value={medicine.note}
              onChange={(e) => handleMedicineChange(index, 'note', e.target.value)}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {medicines.length > 1 && (
              <button
                type="button"
                onClick={() => removeMedicine(index)}
                className="absolute top-2 right-2 text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-red-600 transition"
              >
                ❌
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addMedicine}
          className="px-5 py-2 mt-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ➕ Add Medicine
        </button>
      </div>

      {/* Advices Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">📌 Advices</h2>
        {advices.map((advice, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder={`Advice ${index + 1}`}
              value={advice}
              onChange={(e) => handleAdviceChange(index, e.target.value)}
              className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {advices.length > 1 && (
              <button
                type="button"
                onClick={() => removeAdvice(index)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                ❌
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addAdvice}
          className="px-5 py-2 mt-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          ➕ Add Advice
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-8 py-3 ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white text-lg font-semibold rounded-xl shadow-lg transition`}
        >
          {loading ? 'Submitting...' : '📤 Submit Prescription'}
        </button>
      </div>
    </div>
  );
};

export default Prescription;
