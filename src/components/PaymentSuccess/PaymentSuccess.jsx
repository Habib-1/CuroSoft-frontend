import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 flex flex-col justify-center items-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
        <CheckCircle className="text-green-600 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Thank you! Your appointment has been confirmed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
