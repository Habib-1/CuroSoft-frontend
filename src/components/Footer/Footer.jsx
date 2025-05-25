import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-sky-800 text-white py-10 ">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/service/doctor-suggestion" className="hover:text-red-400 transition">Doctor Suggestion</Link></li>
              <li><Link to="/service/online-appointment" className="hover:text-red-400 transition">Online Appointment</Link></li>
              <li><Link to="/service/offline-booking" className="hover:text-red-400 transition">Offline Serial Booking</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-red-400 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-red-400 transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-red-400 transition">Contact</Link></li>
              <li><Link to="/doctors" className="hover:text-red-400 transition">Doctors</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Important Information</h3>
            <ul className="space-y-2">
              <li>Email: <span className="text-red-400">curosoft.helpdesk@gmail.com</span></li>
              <li>Phone: <span className="text-red-400">019XXXXXXXX</span></li>
              <li>Location: <span className="text-red-400">Ashian City, Dakkhinkhan, Dhaka</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-400">
          <p>&copy; 2025 CuroSoft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
