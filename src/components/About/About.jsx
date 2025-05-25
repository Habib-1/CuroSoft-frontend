import { FaHeartbeat, FaUserMd, FaStethoscope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate=useNavigate();
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-10 animate-fade-in-down">
          About <span className="text-blue-800">CuroSoft</span>
        </h1>

        <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
          <p className="animate-fade-in-up">
            Welcome to <span className="font-semibold text-blue-500">CuroSoft</span> — your smart healthcare assistant!
            We’re here to make healthcare easier and more personalized.
            Whether you're unsure which specialist to see or need faster suggestions, we're just a few clicks away.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <FaHeartbeat className="text-4xl text-blue-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
              <p className="text-gray-600 text-sm">
                We simplify your path to the right doctor using trusted AI-powered tech — no confusion, no delays.
              </p>
            </div>

            <div className="p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <FaUserMd className="text-4xl text-blue-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">How We Help</h2>
              <p className="text-gray-600 text-sm">
                Enter your age, gender, and symptoms — and we’ll match you with the best-suited specialist in seconds.
              </p>
            </div>

            <div className="p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-xl transition duration-300">
              <FaStethoscope className="text-4xl text-blue-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
              <p className="text-gray-600 text-sm">
                We’re building a complete ecosystem — from virtual consultations to home sample collection and beyond.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
             onClick={()=>navigate('/help-desk')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-md transition duration-300">
              Visit Help Desk
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
